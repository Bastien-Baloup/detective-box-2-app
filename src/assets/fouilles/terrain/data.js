const openDoor = async () => {
  const fouilleElement = document.getElementById("fouille");
  const videoContainerElement = document.getElementById("video-container");
  const videoElement = document.getElementById("video");

  const commentAudio = document.getElementById("comment");
  if (commentAudio) {
    commentAudio.pause();
  }
  const arrivalAudio = document.getElementById("arrival");
  if (arrivalAudio) {
    arrivalAudio.pause();
  }

  fouilleElement.style.display = "none";
  videoContainerElement.style.display = "block";
  videoElement.play();

  let token = localStorage.getItem("token");
  if (!token || token === "null") {
    token = new URLSearchParams(window.location.search).get("token");
    if (!token || token === "null") {
      alert("Erreur de communication avec l'app détectivebox : Token vide");
      return;
    }
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      "https://api2.detectivebox.fr/history/1?id=box1video2",
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: true }),
      }
    );

    const response2 = await fetch(
      "https://api2.detectivebox.fr/history/1?id=box1document2",
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: true }),
      }
    );

    const response3 = await fetch(
      "https://api2.detectivebox.fr/history/1?id=box1document7",
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: true }),
      }
    );

    if (!response.ok) {
      alert(
        `Erreur de communication avec le serveur: ${response.status} - ${
          response.statusText || "Unknown"
        }`
      );
    } else if (!response2.ok) {
      alert(
        `Erreur de communication avec le serveur: ${response2.status} - ${
          response2.statusText || "Unknown"
        }`
      );
    } else if (!response3.ok) {
      alert(
        `Erreur de communication avec le serveur: ${response3.status} - ${
          response3.statusText || "Unknown"
        }`
      );
    } else {
      // alert('Rendez-vous sur l\'application pour la suite de l\'enquête');
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// You can call the openDoor function as needed

var APP_DATA = {
  scenes: [
    {
      id: "0-102_terrain_1",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -2.322112325255267,
        pitch: 0.30507434317111937,
        fov: 1.3181347489192914,
      },
      linkHotspots: [
        {
          yaw: -3.1086103423943214,
          pitch: 0.044234614058861865,
          rotation: 0,
          target: "1-102_terrain_2",
        },
      ],
      infoHotspots: [
        {
          yaw: 1.991108715597049,
          pitch: 0.18450934886123527,
          title: "<span id='see1' class='watch'>Voir plus près</span>",
          text: "",
        },
      ],
    },
    {
      id: "1-102_terrain_2",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -0.877317557677447,
        pitch: 0.20931909239678426,
        fov: 1.3181347489192914,
      },
      linkHotspots: [
        {
          yaw: -1.2286730977999305,
          pitch: 0.13612304059854807,
          rotation: 0,
          target: "2-102_terrain_3",
        },
        {
          yaw: 1.0385522021887184,
          pitch: 0.1462300594245427,
          rotation: 0,
          target: "0-102_terrain_1",
        },
      ],
      infoHotspots: [],
    },
    {
      id: "2-102_terrain_3",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -1.2429998697760816,
        pitch: 0.09177740255827516,
        fov: 1.3181347489192914,
      },
      linkHotspots: [
        {
          yaw: -1.6514464316409434,
          pitch: 0.12681790040523389,
          rotation: 0,
          target: "3-102_terrain_4",
        },
        {
          yaw: 1.448119106958492,
          pitch: 0.12743771383234304,
          rotation: 0,
          target: "1-102_terrain_2",
        },
      ],
      infoHotspots: [],
    },
    {
      id: "3-102_terrain_4",
      name: "Avancer",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 512,
      initialViewParameters: {
        yaw: -1.8878545935650912,
        pitch: 0.1277234693843159,
        fov: 1.3181347489192914,
      },
      linkHotspots: [
        {
          yaw: 1.7790099669942832,
          pitch: 0.11168274609911855,
          rotation: 0,
          target: "2-102_terrain_3",
        },
      ],
      infoHotspots: [
        {
          yaw: -2.524421954506195,
          pitch: -0.05765499545532293,
          title: "<a href='#' onclick='openDoor()'>Ouvrir la porte</a>",
          text: "",
        },

        {
          yaw: 3.305252819708938,
          pitch: 0.1653041750790578,
          title: "<span id='see2' class='watch'>Voir plus près</span>",
          text: "",
        },
      ],
    },
  ],
  name: "Project Title",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: false,
    viewControlButtons: false,
  },
};
