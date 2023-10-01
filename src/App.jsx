import { useEffect, useState, useRef } from "react";
import Api from "./api.js";

import Audio from "./components/Audio.js";
import Card from "./components/Card.js";
import Document from "./components/Document.js";
import Loader from "./components/Loader.jsx";
import Nappe from "./components/Nappe.jsx";
import Nav from "./components/Nav.js";
import Objectif from "./components/Objectif.js";
import Preuve from "./components/Preuve.js";
import Progression from "./components/Progression.jsx";
import Quizz from "./components/Quizz.js";
import Slider from "./components/Slider.js";
import Tutoriel from "./components/Tutoriel.js";
import Video from "./components/Video.js";
import Input from "./components/Input.jsx";
import Filter from "./components/Filter.js";

import Ambiance from "./assets/media/Musiques DB S2 - Thème Tueur.wav";

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

	// These are the const for the button to display or hide the components
	const [showComponent, setShowComponent] = useState(false);

	// functions to test the Input component
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

	// functions to test the Nappe modale component
	// la nappe est différente en fonction des boîtes
	const [isMuted, setIsMuted] = useState(true);
	const audioElem = useRef();

	useEffect(() => {
		if (isMuted) {
			audioElem.current.pause();
			audioElem.current.fastSeek(0);
		} else {
			audioElem.current.play();
		}
	}, [isMuted]);

	const activateNappe = () => {
		setIsMuted(false);
		setShowComponent(false);
	};

	const desactivateNappe = () => {
		setIsMuted(true);
		setShowComponent(false);
	};
	console.log(isMuted);

	return (
		<>
			<header>
				<button onClick={() => setShowComponent("audio")}>Audio</button>
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
			{showComponent == "audio" ? <Audio /> : null}
			{showComponent == "card" ? <Card /> : null}
			{showComponent == "document" ? <Document /> : null}
			{showComponent == "loader" ? <Loader /> : null}
			{showComponent == "nappe" ? (
				<Nappe src={Ambiance} activateNappe={activateNappe} desactivateNappe={desactivateNappe} />
			) : null}
			{showComponent == "nav" ? <Nav /> : null}
			{showComponent == "objectif" ? <Objectif /> : null}
			{showComponent == "preuve" ? <Preuve /> : null}
			{showComponent == "progression" ? <Progression /> : null}
			{showComponent == "quizz" ? <Quizz /> : null}
			{showComponent == "slider" ? <Slider /> : null}
			{showComponent == "tutoriel" ? <Tutoriel /> : null}
			{showComponent == "video" ? <Video /> : null}
			{showComponent == "input" ? displayInputForm() : null}
			{showComponent == "filter" ? <Filter /> : null}
		</>
	);
}

export default App;
