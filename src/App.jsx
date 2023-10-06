import { useEffect, useState, useRef } from "react";
import Api from "./api.js";

import Audio from "./components/Audio.jsx";
import Card from "./components/Card.jsx";
import Document from "./components/Document.jsx";
import Loader from "./components/Loader.jsx";
import Nappe from "./components/Nappe.jsx";
import Nav from "./components/Nav.jsx";
import Objectif from "./components/Objectif.js";
import Preuve from "./components/Preuve.js";
import Progression from "./components/Progression.jsx";
import Quizz from "./components/Quizz.js";
import Slider from "./components/Slider.js";
import Tutoriel from "./components/Tutoriel.js";
import Video from "./components/Video.jsx";
import Input from "./components/Input.jsx";
import Filter from "./components/Filter.js";
import Compte from "./components/Compte.jsx";
import Boxchoice from "./components/Boxchoice.jsx";

//Here are assets used to test components
import Ambiance from "./assets/media/Musiques DB S2 - Thème Tueur.wav";
import Image from "./assets/img/LAUREN_DARK.png";
import Saison1 from "./assets/img/Facing-episode1.png";
import Saison2 from "./assets/img/Facing-episode2.png";
import Saison3 from "./assets/img/Facing-episode3.png";
import News from "./assets/media/DB_S02_203_v4_2-test.mp4";
import IconLauren from "./assets/icons/Logo_Lauren.svg";

const api = new Api();

function App() {
	const [status, setStatus] = useState("KO");
	//added this line to avoid having an error
	console.log(status);

	useEffect(() => {
		api.getStatus().then((res) => {
			setStatus(res.status);
		});
	}, []);

	// These are the const for the buttons to display or hide the components for test
	const [showComponent, setShowComponent] = useState(false);

	// These are the functions to test the Input component
	const [valueInputTexte, setValueInputTexte] = useState("");
	const [valueInputRadio, setValueInputRadio] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setValueInputTexte("");
		alert(valueInputTexte + " et " + valueInputRadio);
	};

	const displayInputForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<Input
					type="texte"
					name="essai"
					label="votre réponse"
					placeholder="Ecrivez votre réponse ici"
					value={valueInputTexte}
					setValue={setValueInputTexte}
				/>
				<Input type="radio" name="essai" label="choix 1" setValue={setValueInputRadio} />
				<Input type="radio" name="essai" label="choix 2" setValue={setValueInputRadio} />
				<button type="submit">Afficher la réponse</button>
			</form>
		);
	};

	// These are the functions to test the Nappe modale component
	const [ambianceMute, setAmbianceMute] = useState(true);
	const [ispreviouslyMuted, setIsPreviouslyMuted] = useState(true);
	const audioElem = useRef();

	useEffect(() => {
		if (ambianceMute) {
			audioElem.current.pause();
			// audioElem.current.currentTime = 0;
		} else {
			audioElem.current.play();
		}
	}, [ambianceMute]);

	const activateNappe = () => {
		setAmbianceMute(false);
		setShowComponent(false);
	};

	const desactivateNappe = () => {
		setAmbianceMute(true);
		setShowComponent(false);
	};

	// These are the functions to test the modal Audio component
	const handleModalAudio = () => {
		if (ispreviouslyMuted) {
			setShowComponent(false);
		} else {
			setAmbianceMute(false);
			setShowComponent(false);
		}
	};

	const setPreviousStateAmbiance = () => {
		if (ambianceMute) {
			setIsPreviouslyMuted(true);
		} else {
			setIsPreviouslyMuted(false);
		}
		setAmbianceMute(true);
		console.log(ambianceMute, ispreviouslyMuted);
	};

	//These are the functions to test and display Boxchoice component
	const displayBoxChoice = () => {
		return (
			<div className="boxchoice__wrapper">
				<Boxchoice boxNumber="1" cover={Saison1} state="done" />
				<Boxchoice boxNumber="2" cover={Saison2} state="open" />
				<Boxchoice boxNumber="3" cover={Saison3} state="closed" />
			</div>
		);
	};

	// These are the functions to test and display Document modal
	const handleModalDocument = () => {
		setShowComponent(false);
	};

	// These are the functions to test and display Video modal
	const handleModalVideo = () => {
		setShowComponent(false);
	};

	//These are the functions to test and display Card component
	const displayCard = () => {
		return (
			<div className="card__wrapper">
				<Card
					srcImg={Image}
					srcIcon={IconLauren}
					name="Lauren Fraser"
					contentButton="Faire un interrogatoire"
					actionButton={normalCardAction}
					state=""
				/>
				<Card
					srcImg={Image}
					srcIcon={IconLauren}
					name="Lauren Fraser"
					contentButton="Faire un interrogatoire"
					actionButton={normalCardAction}
					state=""
				/>
				<Card
					srcImg={Image}
					srcIcon={IconLauren}
					name="Lauren Fraser"
					contentButton="Faire un interrogatoire"
					actionButton={specificCardAction}
					state="unavailable"
				/>
			</div>
		);
	};

	const normalCardAction = () => {
		alert("vous vous rendez sur la page du membre");
	};

	const [modalCard, setModal] = useState(false);

	const specificCardAction = () => {
		console.log("ça marche");
		setModal(!modalCard);
	};

	const displayModalCard = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<p className="modal-boxdone__text">
						Oh non ! <br></br> Quelque chose est arrivée à Lauren. Rendez-vous à l'agence !
					</p>
					<button className="modal-boxdone__button button--red" onClick={specificCardAction}>
						Continuer l'enquête
					</button>
				</div>
			</div>
		);
	};

	return (
		<>
			<header>
				<button
					onClick={() => {
						setPreviousStateAmbiance();
						setShowComponent("audio");
					}}
				>
					Audio
				</button>
				<button onClick={() => setShowComponent("compte")}>Compte</button>
				<button onClick={() => setShowComponent("boxchoice")}>Box Choice</button>
				<button onClick={() => setShowComponent("card")}>Card</button>
				<button onClick={() => setShowComponent("document")}>Document</button>
				<button onClick={() => setShowComponent("loader")}>Loader</button>
				<button onClick={() => setShowComponent("nappe")}>Nappe</button>
				<button onClick={() => setShowComponent("nav")}>Nav</button>
				<button onClick={() => setShowComponent("objectif")}>Objectif</button>
				<button onClick={() => setShowComponent("preuve")}>Preuve</button>
				<button onClick={() => setShowComponent("progression")}>Progression</button>
				<button onClick={() => setShowComponent("quizz")}>Quizz</button>
				<button onClick={() => setShowComponent("slider")}>Slider</button>
				<button onClick={() => setShowComponent("tutoriel")}>Tutoriel</button>
				<button onClick={() => setShowComponent("video")}>Video</button>
				<button onClick={() => setShowComponent("input")}>Input</button>
				<button onClick={() => setShowComponent("filter")}>Filter</button>
				{/* ceci est l'audio pour la musique d'ambiance qui doit s'afficher sur toutes les pages*/}
				<audio loop preload="auto" ref={audioElem}>
					<source src={Ambiance} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			</header>
			<main>
				{modalCard ? displayModalCard() : null}
				{showComponent == "audio" ? (
					<Audio
						title="Interrogatoire de Machin et Bidule"
						srcImg1={Image}
						srcImg2={Image}
						srcTranscription={Image}
						handleModalAudio={handleModalAudio}
						srcAudio={Ambiance}
					/>
				) : null}
				{showComponent == "card" ? displayCard() : null}
				{showComponent == "document" ? (
					<Document title="Document machin truc" srcElement={Image} handleModalDocument={handleModalDocument} />
				) : null}
				{showComponent == "loader" ? <Loader /> : null}
				{showComponent == "nappe" ? (
					<Nappe src={Ambiance} activateNappe={activateNappe} desactivateNappe={desactivateNappe} />
				) : null}
				{showComponent == "compte" ? <Compte /> : null}
				{showComponent == "boxchoice" ? displayBoxChoice() : null}
				{showComponent == "nav" ? <Nav /> : null}
				{showComponent == "objectif" ? <Objectif /> : null}
				{showComponent == "preuve" ? <Preuve /> : null}
				{showComponent == "progression" ? <Progression /> : null}
				{showComponent == "quizz" ? <Quizz /> : null}
				{showComponent == "slider" ? <Slider /> : null}
				{showComponent == "tutoriel" ? <Tutoriel /> : null}
				{showComponent == "video" ? (
					<Video title="Video Breaking News" srcVideo={News} handleModalVideo={handleModalVideo} />
				) : null}
				{showComponent == "input" ? displayInputForm() : null}
				{showComponent == "filter" ? <Filter /> : null}
			</main>
		</>
	);
}

export default App;
