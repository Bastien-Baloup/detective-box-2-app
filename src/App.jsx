import { useEffect, useState } from "react";
import "./App.css";
import Api from "./api.js";

import Audio from "./components/Audio.js";
import Card from "./components/Card.js";
import Document from "./components/Document.js";
import Loader from "./components/Loader.js";
import Nappe from "./components/Nappe.js";
import Nav from "./components/Nav.js";
import Objectif from "./components/Objectif";
import Preuve from "./components/Preuve.js";
import Progression from "./components/Progression.js";
import Quizz from "./components/Quizz";
import Slider from "./components/Slider.js";
import Tutoriel from "./components/Tutoriel.js";
import Video from "./components/Video.js";
import Input from "./components/Input";
import Filter from "./components/Filter";

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
			</header>
			{showComponent == "audio" ? <Audio /> : null}
			{showComponent == "card" ? <Card /> : null}
			{showComponent == "document" ? <Document /> : null}
			{showComponent == "loader" ? <Loader /> : null}
			{showComponent == "nappe" ? <Nappe /> : null}
			{showComponent == "nav" ? <Nav /> : null}
			{showComponent == "objectif" ? <Objectif /> : null}
			{showComponent == "preuve" ? <Preuve /> : null}
			{showComponent == "progression" ? <Progression /> : null}
			{showComponent == "quizz" ? <Quizz /> : null}
			{showComponent == "slider" ? <Slider /> : null}
			{showComponent == "tutoriel" ? <Tutoriel /> : null}
			{showComponent == "video" ? <Video /> : null}
			{showComponent == "input" ? <Input /> : null}
			{showComponent == "filter" ? <Filter /> : null}
		</>
	);
}

export default App;
