import Marzipano from "marzipano";
import screenfull from "screenfull";
import bowser from "bowser";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../assets/fouilles/chantier/style.css";
import data from "../../assets/fouilles/chantier/data";

function ChantierModal({ onClose }) {
  const MarzipanoInit = () => {
    // Grab elements from DOM.
    var panoElement = document.querySelector("#pano");
    var sceneNameElement = document.querySelector("#titleBar .sceneName");
    var sceneListElement = document.querySelector("#sceneList");
    var sceneElements = document.querySelectorAll("#sceneList .scene");
    var sceneListToggleElement = document.querySelector("#sceneListToggle");
    var autorotateToggleElement = document.querySelector("#autorotateToggle");
    var fullscreenToggleElement = document.querySelector("#fullscreenToggle");

    const panoContainer = document.getElementById("chantier-modal-viewer");

    // Detect desktop or mobile mode.
    if (window.matchMedia) {
      var setMode = function () {
        panoContainer.classList.add("desktop");
      };
      var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
      setMode();
      mql.addListener(setMode);
    } else {
      panoContainer.classList.add("desktop");
    }

    // Detect whether we are on a touch device.
    panoContainer.classList.add("no-touch");
    window.addEventListener("touchstart", function () {
      panoContainer.classList.remove("no-touch");
      panoContainer.classList.add("touch");
    });

    // Use tooltip fallback mode on IE < 11.
    if (bowser.msie && parseFloat(bowser.version) < 11) {
      panoContainer.classList.add("tooltip-fallback");
    }

    // Viewer options.
    var viewerOpts = {
      controls: {
        mouseViewMode: data.settings.mouseViewMode,
      },
    };

    // Initialize viewer.
    var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    // Create scenes.
    var scenes = data.scenes.map(function (data) {
      var urlPrefix = import.meta.env.BASE_URL + 'fouilles/chantier/tiles';
      var source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
        {
          cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg",
        }
      );
      var geometry = new Marzipano.CubeGeometry(data.levels);

      var limiter = Marzipano.RectilinearView.limit.traditional(
        data.faceSize,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180
      );
      var view = new Marzipano.RectilinearView(
        data.initialViewParameters,
        limiter
      );

      var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });

      // Create link hotspots.
      data.linkHotspots.forEach(function (hotspot) {
        var element = createLinkHotspotElement(hotspot);
        scene.hotspotContainer().createHotspot(element, {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });

      // Create info hotspots.
      data.infoHotspots.forEach(function (hotspot) {
        var element = createInfoHotspotElement(hotspot);
        scene.hotspotContainer().createHotspot(element, {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });

      return {
        data: data,
        scene: scene,
        view: view,
      };
    });

    // Set up autorotate, if enabled.
    var autorotate = Marzipano.autorotate({
      yawSpeed: 0.03,
      targetPitch: 0,
      targetFov: Math.PI / 2,
    });
    if (data.settings.autorotateEnabled) {
      autorotateToggleElement.classList.add("enabled");
    }

    // Set handler for autorotate toggle.
    autorotateToggleElement.addEventListener("click", toggleAutorotate);

    // Set up fullscreen mode, if supported.
    if (screenfull.enabled && data.settings.fullscreenButton) {
      panoContainer.classList.add("fullscreen-enabled");
      fullscreenToggleElement.addEventListener("click", function () {
        screenfull.toggle();
      });
      screenfull.on("change", function () {
        if (screenfull.isFullscreen) {
          fullscreenToggleElement.classList.add("enabled");
        } else {
          fullscreenToggleElement.classList.remove("enabled");
        }
      });
    } else {
      panoContainer.classList.add("fullscreen-disabled");
    }

    // Set handler for scene list toggle.
    sceneListToggleElement.addEventListener("click", toggleSceneList);

    // Start with the scene list open on desktop.
    if (!panoContainer.classList.contains("mobile")) {
      showSceneList();
    }

    // Set handler for scene switch.
    scenes.forEach(function (scene) {
      var el = document.querySelector(
        '#sceneList .scene[data-id="' + scene.data.id + '"]'
      );
      el.addEventListener("click", function () {
        switchScene(scene);
        // On mobile, hide scene list after selecting a scene.
        if (panoContainer.classList.contains("mobile")) {
          hideSceneList();
        }
      });
    });

    // DOM elements for view controls.
    var viewUpElement = document.querySelector("#viewUp");
    var viewDownElement = document.querySelector("#viewDown");
    var viewLeftElement = document.querySelector("#viewLeft");
    var viewRightElement = document.querySelector("#viewRight");
    var viewInElement = document.querySelector("#viewIn");
    var viewOutElement = document.querySelector("#viewOut");

    // Dynamic parameters for controls.
    var velocity = 0.7;
    var friction = 3;

    // Associate view controls with elements.
    var controls = viewer.controls();
    controls.registerMethod(
      "upElement",
      new Marzipano.ElementPressControlMethod(
        viewUpElement,
        "y",
        -velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "downElement",
      new Marzipano.ElementPressControlMethod(
        viewDownElement,
        "y",
        velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "leftElement",
      new Marzipano.ElementPressControlMethod(
        viewLeftElement,
        "x",
        -velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "rightElement",
      new Marzipano.ElementPressControlMethod(
        viewRightElement,
        "x",
        velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "inElement",
      new Marzipano.ElementPressControlMethod(
        viewInElement,
        "zoom",
        -velocity,
        friction
      ),
      true
    );
    controls.registerMethod(
      "outElement",
      new Marzipano.ElementPressControlMethod(
        viewOutElement,
        "zoom",
        velocity,
        friction
      ),
      true
    );

    function sanitize(s) {
      return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }

    function switchScene(scene) {
      stopAutorotate();
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
      startAutorotate();
      updateSceneName(scene);
      updateSceneList(scene);
    }

    function updateSceneName(scene) {
      sceneNameElement.innerHTML = sanitize(scene.data.name);
    }

    function updateSceneList(scene) {
      for (var i = 0; i < sceneElements.length; i++) {
        var el = sceneElements[i];
        if (el.getAttribute("data-id") === scene.data.id) {
          el.classList.add("current");
        } else {
          el.classList.remove("current");
        }
      }
    }

    function showSceneList() {
      sceneListElement.classList.add("enabled");
      sceneListToggleElement.classList.add("enabled");
    }

    function hideSceneList() {
      sceneListElement.classList.remove("enabled");
      sceneListToggleElement.classList.remove("enabled");
    }

    function toggleSceneList() {
      sceneListElement.classList.toggle("enabled");
      sceneListToggleElement.classList.toggle("enabled");
    }

    function startAutorotate() {
      if (!autorotateToggleElement.classList.contains("enabled")) {
        return;
      }
      viewer.startMovement(autorotate);
      viewer.setIdleMovement(3000, autorotate);
    }

    function stopAutorotate() {
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    }

    function toggleAutorotate() {
      if (autorotateToggleElement.classList.contains("enabled")) {
        autorotateToggleElement.classList.remove("enabled");
        stopAutorotate();
      } else {
        autorotateToggleElement.classList.add("enabled");
        startAutorotate();
      }
    }

    function createLinkHotspotElement(hotspot) {
      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement("div");
      wrapper.classList.add("hotspot");
      wrapper.classList.add("link-hotspot");

      // Create image element.
      var icon = document.createElement("img");
      icon.src = "../../assets/fouilles/chantier/img/link.png";
      icon.classList.add("link-hotspot-icon");

      // Set rotation transform.
      var transformProperties = [
        "-ms-transform",
        "-webkit-transform",
        "transform",
      ];
      for (var i = 0; i < transformProperties.length; i++) {
        var property = transformProperties[i];
        icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
      }

      // Add click event handler.
      wrapper.addEventListener("click", function () {
        switchScene(findSceneById(hotspot.target));
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      var tooltip = document.createElement("div");
      tooltip.classList.add("hotspot-tooltip");
      tooltip.classList.add("link-hotspot-tooltip");
      tooltip.innerHTML = findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    }

    function createInfoHotspotElement(hotspot) {
      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement("div");
      wrapper.classList.add("hotspot");
      wrapper.classList.add("info-hotspot");

      // Create hotspot/tooltip header.
      var header = document.createElement("div");
      header.classList.add("info-hotspot-header");

      // Create image element.
      var iconWrapper = document.createElement("div");
      iconWrapper.classList.add("info-hotspot-icon-wrapper");
      var icon = document.createElement("img");
      icon.src = "../../assets/fouilles/chantier/img/info.png";
      icon.classList.add("info-hotspot-icon");
      iconWrapper.appendChild(icon);

      // Create title element.
      var titleWrapper = document.createElement("div");
      titleWrapper.classList.add("info-hotspot-title-wrapper");
      var title = document.createElement("div");
      title.classList.add("info-hotspot-title");
      title.innerHTML = hotspot.title;
      titleWrapper.appendChild(title);

      // Create close element.
      var closeWrapper = document.createElement("div");
      closeWrapper.classList.add("info-hotspot-close-wrapper");
      var closeIcon = document.createElement("img");
      closeIcon.src = "../../assets/fouilles/chantier/img/close.png";
      closeIcon.classList.add("info-hotspot-close-icon");
      closeWrapper.appendChild(closeIcon);

      // Construct header element.
      header.appendChild(iconWrapper);
      header.appendChild(titleWrapper);
      header.appendChild(closeWrapper);

      // Create text element.
      var text = document.createElement("div");
      text.classList.add("info-hotspot-text");
      text.innerHTML = hotspot.text;

      // Place header and text into wrapper element.
      wrapper.appendChild(header);
      wrapper.appendChild(text);

      // Create a modal for the hotspot content to appear on mobile mode.
      var modal = document.createElement("div");
      modal.innerHTML = wrapper.innerHTML;
      modal.classList.add("info-hotspot-modal");
      panoContainer.appendChild(modal);

      var toggle = function () {
        wrapper.classList.toggle("visible");
        modal.classList.toggle("visible");
      };

      // Show content when hotspot is clicked.
      wrapper
        .querySelector(".info-hotspot-header")
        .addEventListener("click", toggle);

      // Hide content when close icon is clicked.
      modal
        .querySelector(".info-hotspot-close-wrapper")
        .addEventListener("click", toggle);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      return wrapper;
    }

    // Prevent touch and scroll events from reaching the parent element.
    function stopTouchAndScrollEventPropagation(element, eventList) {
      eventList = [
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
        "wheel",
        "mousewheel",
      ];
      for (var i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function (event) {
          event.stopPropagation();
        });
      }
    }

    function findSceneById(id) {
      for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
          return scenes[i];
        }
      }
      return null;
    }

    function findSceneDataById(id) {
      for (var i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    }

    // Display the initial scene.
    switchScene(scenes[0]);
  };

  const isSongPlaying = useRef(false);
  const isArrivalPlaying = useRef(false);
  const arrivalChantier = useRef(sessionStorage.getItem("arrival_chantier"));

  const songStarter = () => {
    if (!arrivalChantier.current) {
      if (!isArrivalPlaying) {
        setTimeout(() => document.getElementById("arrival").play(), 3000);
        isArrivalPlaying.current = true;
      }
    }
    if (!isSongPlaying) {
      document.getElementById("song").play();
      document.getElementById("song").volume = 0.1;
      isSongPlaying.current = true;
    }
  };

  const chantierInit = () => {
    const closeImgs = document.querySelectorAll(".close-img");
    closeImgs.forEach(function (closeImg) {
      closeImg.addEventListener("click", function () {
        document.querySelectorAll(".img").forEach(function (img) {
          img.style.display = "none";
        });
      });
    });

    const watchElements = document.querySelectorAll(".watch");
    watchElements.forEach(function (watch) {
      watch.addEventListener("click", function () {
        document.querySelectorAll(".img").forEach(function (img) {
          img.style.display = "none";
        });
        const id = watch.id;
        document.getElementById("img-" + id).style.opacity = 1;
        document.getElementById("img-" + id).style.visibility = "visible";
      });
    });

    const linkHotspots = document.querySelectorAll(".link-hotspot");
    linkHotspots.forEach(function (linkHotspot) {
      linkHotspot.addEventListener("click", function () {
        var location = document
          .querySelector(".current")
          .getAttribute("data-id");
        console.log(location);

        const songElement = document.getElementById("song");

        if (location === "0-101---chantier1") {
          document.getElementById("chantier").volume = 0;
          songElement.play();
          songElement.volume = 0.1;
        } else if (location === "1-101---chantier2") {
          songElement.volume = 0.3;
        } else if (location === "3-101---chantier4") {
          songElement.volume = 0.2;
        } else if (location === "2-101---chantier3") {
          songElement.volume = 0.8;
        }
      });
    });

    const lienMalle = document.getElementById("lien-malle");
    lienMalle.addEventListener("click", function (event) {
      event.preventDefault();

      document.getElementById("song").volume = 0;
      document.getElementById("arrival").pause();
      document.getElementById("fouille").style.display = "none";
      document.getElementById("malle-container").style.display = "block";
      document.getElementById("malle-mp3").play();
    });

    const items = document.querySelectorAll(".item");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        document.querySelectorAll(".interupted").forEach(function (element) {
          element.pause(); // Stop playing
          element.currentTime = 0; // Reset time
        });

        item.style.backgroundColor = "darkred";
        setTimeout(() => {
          item.style.backgroundColor = "rgba(0,0,0,0.5)";
        }, 200);

        const inputElement = document.getElementById("input");
        const inputValue = inputElement.value;

        if (item.id === "reset") {
          inputElement.value = "";
          document.getElementById("reset-sound").play();
        } else {
          document.getElementById("click").play();
          inputElement.value = inputValue + item.id;

          if (
            inputElement.value === "uprightdownrightdown" ||
            inputElement.value ===
              "upupupuprightrightdowndownrightrightrightdowndown"
          ) {
            document.getElementById("malle-mp3").pause();
            document.getElementById("open-malle").play();
            document
              .getElementById("open-malle")
              .addEventListener("ended", function () {
                document.getElementById("malle-mp3").volume = 0;
                items.forEach(function (item) {
                  item.style.display = "none";
                });
                document.getElementById("malle-container").style.display =
                  "none";
                document.getElementById("open-malle-container").style.display =
                  "block";
                document.getElementById("malle-opened").play();
              });
          }
        }
      });
    });

    const malleOpened = document.getElementById("malle-opened");
    malleOpened.addEventListener("ended", function () {
      endHandle();
    });

    const endHandle = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Erreur de communication avec l'app détectivebox : Token vide");
        return;
      }
      const response = await fetch(
        "https://api2.detectivebox.fr/history/1?id=box1document1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: true }),
        }
      );
      console.table(response);
      if (!response.ok) {
        alert(
          "Erreur de communication avec le serveur: " +
            response.status +
            (response.statusText !== "" ? " - " + response.statusText : "")
        );
      } else {
        alert("Rendez-vous sur l'application pour la suite de l'enquête");
      }
    };
    sessionStorage.setItem("arrival_chantier", "1");
  };

  useEffect(MarzipanoInit, []);
  useEffect(chantierInit, []);
  useEffect(songStarter, []);

  return (
    <div className="modal-objectif__background">
      <div id="chantier-modal" className="modal-objectif__box">
        <div id="chantier-modal-viewer">
          <div id="fouille" className="multiple-scenes">
            <div id="pano"></div>

            <div id="sceneList">
              <ul className="scenes">
                <a href="#" className="scene" data-id="0-101---chantier1">
                  <li className="text">101 - Chantier1</li>
                </a>

                <a href="#" className="scene" data-id="1-101---chantier2">
                  <li className="text">101 - Chantier2</li>
                </a>

                <a href="#" className="scene" data-id="2-101---chantier3">
                  <li className="text">101 - Chantier3</li>
                </a>

                <a href="#" className="scene" data-id="3-101---chantier4">
                  <li className="text">101 - Chantier4</li>
                </a>
              </ul>
            </div>

            <div id="titleBar">
              <h1 className="sceneName"></h1>
            </div>

            <a href="#" id="autorotateToggle">
              <img
                className="icon off"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/play.png`}
              />
              <img
                className="icon on"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/pause.png`}
              />
            </a>

            <a href="#" id="fullscreenToggle">
              <img
                className="icon off"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/fullscreen.png`}
              />
              <img
                className="icon on"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/windowed.png`}
              />
            </a>

            <a href="#" id="sceneListToggle">
              <img
                className="icon off"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/expand.png`}
              />
              <img
                className="icon on"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/collapse.png`}
              />
            </a>

            <a
              href="#"
              id="viewUp"
              className="viewControlButton viewControlButton-1"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/up.png`}
              />
            </a>
            <a
              href="#"
              id="viewDown"
              className="viewControlButton viewControlButton-2"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/down.png`}
              />
            </a>
            <a
              href="#"
              id="viewLeft"
              className="viewControlButton viewControlButton-3"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/left.png`}
              />
            </a>
            <a
              href="#"
              id="viewRight"
              className="viewControlButton viewControlButton-4"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/right.png`}
              />
            </a>
            <a
              href="#"
              id="viewIn"
              className="viewControlButton viewControlButton-5"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/plus.png`}
              />
            </a>

            <div className="img" id="img-see1" style={{ display: 'none' }}>
              <span className="close-img">X</span>
              <img
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/malle-2.jpg`}
                className="img-see"
              />
            </div>

            <a
              href="#"
              id="viewOut"
              className="viewControlButton viewControlButton-6"
            >
              <img
                className="icon"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/img/minus.png`}
              />
            </a>
            <audio id="arrival" controls style={{ display: 'none' }}>
              <source
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/arrival.mp3`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>

            <audio id="song" controls loop style={{ display: 'none' }}>
              <source
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/music.mp3`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div id="malle-container" style={{ display: 'none' }}>
            <input id="input" type="text" style={{ display: 'none' }} />
            <div style={{ position: 'relative' }}>
              <img
                id="malle"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/malle-2.jpg`}
                style={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                }}
              />
              <div
                id="right"
                className="item"
                style={{
                  top: '75%',
                  left: '53%',
                  width: '3%',
                  height: '6%',
                }}
              ></div>
              <div
                id="left"
                className="item"
                style={{
                  top: '75%',
                  left: '44%',
                  width: '3%',
                  height: '6%',
                }}
              ></div>

              <div
                id="up"
                className="item"
                style={{
                  top: '67%',
                  left: '48.5%',
                  width: '3%',
                  height: '6%',
                }}
              ></div>

              <div
                id="down"
                className="item"
                style={{
                  top: '82%',
                  left: '48.5%',
                  width: '3%',
                  height: '6%',
                }}
              ></div>

              <div
                id="reset"
                className="item"
                style={{
                  top: '75%',
                  left: '48.5%',
                  width: '3%',
                  height: '6%',
                }}
              ></div>
            </div>

            <div style={{ display: 'none' }}>
              <audio
                id="click"
                className="interupted"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/click.wav`}
                type="audio/wav"
              ></audio>
              <audio
                id="reset-sound"
                className="interupted"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/reset.wav`}
                type="audio/wav"
              ></audio>
              <audio
                id="malle-opened"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/comment-2.mp3`}
                type="audio/mpeg"
              ></audio>
              <audio
                id="malle-mp3"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/comment-1.mp3`}
                type="audio/mpeg"
              ></audio>
              <audio
                id="open-malle"
                className="interupted"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/open-malle.mp3`}
                type="audio/mpeg"
              ></audio>
            </div>
          </div>
          <div id="open-malle-container" style={{ display: 'none' }}>
            <input id="input" type="text" style={{ display: 'none' }} />
            <div style={{ position: 'relative' }}>
              <img
                id="malle"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/opened-malle.jpg`}
                style={{ width: '100%' }}
              />
            </div>
            <a
              id="labo"
              className="btn-red"
              style={{
                display: 'none',
                fontSize: '1.5em',
                position: 'fixed',
                top: '10px',
                right: '10px',
              }}
              href="#"
            >
              Continuer l’enquête sur l’interface
            </a>

            <div style={{ display: 'none' }}>
              <audio
                id="malle-opened"
                src={`${import.meta.env.BASE_URL}fouilles/chantier/assets/comment-2.mp3`}
                type="audio/mpeg"
              ></audio>
            </div>
          </div>
        </div>
        <div id="chantier-modal-buttons">
          <button
            className="modal-objectif__button button--red"
            onClick={onClose}
          >
            fermer
          </button>
        </div>
      </div>
    </div>
  );
}

ChantierModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChantierModal;
