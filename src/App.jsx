import { useEffect, useState, useRef } from "react";
import Api from "./api.js";

import Audio from "./components/Audio.jsx";
import Card from "./components/Card.jsx";
import Document from "./components/Document.jsx";
import Loader from "./components/Loader.jsx";
import Nappe from "./components/Nappe.jsx";
import Nav from "./components/Nav.jsx";
import Objectif from "./components/Objectif.jsx";
import Preuve from "./components/Preuve.jsx";
import Progression from "./components/Progression.jsx";
import Quizz from "./components/Quizz.jsx";
import Slider from "./components/Slider.jsx";
import Video from "./components/Video.jsx";
import Input from "./components/Input.jsx";
import Filter from "./components/Filter.jsx";
import Compte from "./components/Compte.jsx";
import Boxchoice from "./components/Boxchoice.jsx";
import Timer from "./components/Timer.jsx";

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
	const dataBoxChoiceTest = [
		{
			boxNumber: 1,
			cover: Saison1,
			state: "done",
		},
		{
			boxNumber: 2,
			cover: Saison2,
			state: "open",
		},
		{
			boxNumber: 3,
			cover: Saison3,
			state: "closed",
		},
	];

	const displayBoxChoice = () => {
		return (
			<div className="boxchoice__wrapper">
				{dataBoxChoiceTest.map((box, index) => (
					<Boxchoice data={box} key={`boxChoiceKey-${index}`} />
				))}
			</div>
		);
	};

	// These are the functions to test and display Document modal
	const handleModalDocument = () => {
		setShowComponent(false);
	};

	// These are the functions to test and display Video modal
	const handleModalVideo = () => {
		if (ispreviouslyMuted) {
			setShowComponent(false);
		} else {
			setAmbianceMute(false);
			setShowComponent(false);
		}
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
						Oh non ! <br></br> Quelque chose est arrivée à Lauren. Rendez-vous à l&apos;agence !
					</p>
					<button className="modal-boxdone__button button--red" onClick={specificCardAction}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	//These are the functions to test and display Objectif component
	const dataObjectifTest = [
		{
			title: "Remonter la piste trouvée par Lauren",
			subtitle: "Où le tueur avait emmené Annina ?",
			detail: "",
			state: "done",
		},
		{
			title: "Remonter la piste trouvée par Lauren",
			subtitle: "Où le tueur avait emmené Annina ?",
			detail: "Voici le détail de l'objectif, il va donner plus d'informations aux joueurs sur ce qu'il faut faire",
			state: "open",
		},
		{
			title: "Remonter la piste trouvée par Lauren",
			subtitle: "Où le tueur avait emmené Annina ?",
			detail: "",
			state: "closed",
		},
	];

	const displayObjectif = () => {
		return (
			<div className="objectif__wrapper">
				{dataObjectifTest.map((objectif, index) => (
					<Objectif data={objectif} key={`objectifKey-${index}`} />
				))}
			</div>
		);
	};

	//These are the functions to test and display Preuve component
	const dataPreuveTest = [
		{
			title: "Poème de Garraud",
			category: "Archive",
			detail: "Ceci est une description pour voir à quoi ressemblerai cet élément",
			poster: Saison1,
		},
		{
			title: "Poème de Garraud",
			category: "Document",
			detail: "Ceci est une description pour voir à quoi ressemblerai cet élément",
			poster: Saison1,
		},
		{
			title: "Poème de Garraud",
			category: "Vidéo",
			detail: "Ceci est une description pour voir à quoi ressemblerai cet élément",
			poster: Saison1,
		},
		{
			title: "Poème de Garraud",
			category: "Interrogatoire",
			detail: "Ceci est une description pour voir à quoi ressemblerai cet élément",
			poster: Saison1,
		},
		{
			title: "Poème de Garraud",
			category: "Lieu",
			detail: "Ceci est une description pour voir à quoi ressemblerai cet élément",
			poster: Saison1,
		},
	];

	const displayPreuve = () => {
		return (
			<div className="clue__wrapper">
				{dataPreuveTest.map((clue, index) => (
					<Preuve data={clue} key={`clueKey-${index}`} />
				))}
			</div>
		);
	};

	//These are the functions to test and display Filter component
	const filtersType = ["Archives", "Document", "Vidéo", "Interrogatoire", "Lieu"];
	const filterBox = ["Box 1", "Box 2", "Box 3"];
	const [selectedFilters, setSelectedFilters] = useState([]);

	const handleFilter = (selectedCategory) => {
		if (selectedFilters.includes(selectedCategory)) {
			let filters = selectedFilters.filter((element) => element !== selectedCategory);
			setSelectedFilters(filters);
		} else {
			setSelectedFilters([...selectedFilters, selectedCategory]);
		}
	};

	const displayFilter = () => {
		return (
			<>
				<div className="filter__container">
					<div className="filter--type__container">
						{filtersType.map((category, index) => (
							<Filter category={category} key={`filterType-${index}`} handleSearch={() => handleFilter(category)} />
						))}
					</div>
					<div className="filter--box__container">
						{filterBox.map((category, index) => (
							<Filter category={category} key={`filterBox-${index}`} handleSearch={() => handleFilter(category)} />
						))}
					</div>
				</div>
			</>
		);
	};

	//These are the functions to test and display Slider component
	const dataSliderTest = [
		{ title: "item1", detail: "detail1", image: Saison1 },
		{ title: "item2", detail: "detail2", image: Saison1 },
		{ title: "item3", detail: "detail3", image: null },
	];
	const handleCloseSlider = () => {
		alert("Vous fermez le slider");
	};

	const displaySlider = () => {
		return <Slider data={dataSliderTest} handleModal={handleCloseSlider} />;
	};

	//These are the functions to test and display Quizz component
	const dataQuizzTest = {
		questions: [
			{
				id: 1,
				question: "Quelle est la réponse à cette première question ?",
				choices: ["answer", "choix 2", "mauvais choix"],
				image: Saison1,
			},
			{
				id: 2,
				question: "Quelle est la réponse à cette seconde question ?",
				choices: ["answer", "choix 2", "mauvais choix"],
				image: null,
			},
		],
		answers: [
			{
				id: 1,
				answer: "answer",
				explanation: "Voici l'explication de la première question",
				image: Saison1,
			},
			{
				id: 2,
				answer: "answer",
				explanation: "Voici l'explication de la seconde question",
				image: null,
			},
		],
	};

	const displayQuizz = () => {
		return <Quizz data={dataQuizzTest} handleEndQuizz={handleCloseQuizz} />;
	};

	const handleCloseQuizz = () => {
		setShowComponent(false);
	};

	//These are the functions to test and display Timer component
	const handleTimer = () => {
		console.log("time is up");
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
				<button
					onClick={() => {
						setPreviousStateAmbiance();
						setShowComponent("video");
					}}
				>
					Video
				</button>
				<button onClick={() => setShowComponent("input")}>Input</button>
				<button onClick={() => setShowComponent("filter")}>Filter</button>
				<button onClick={() => setShowComponent("timer")}>Timer</button>
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
				{showComponent == "objectif" ? displayObjectif() : null}
				{showComponent == "preuve" ? displayPreuve() : null}
				{showComponent == "progression" ? <Progression /> : null}
				{showComponent == "quizz" ? displayQuizz() : null}
				{showComponent == "slider" ? displaySlider() : null}
				{showComponent == "video" ? (
					<Video title="Video Breaking News" srcVideo={News} handleModalVideo={handleModalVideo} />
				) : null}
				{showComponent == "input" ? displayInputForm() : null}
				{showComponent == "filter" ? displayFilter() : null}
				{showComponent == "timer" ? <Timer initialMinute={0} initialSecond={15} timerEndedFunction={handleTimer} /> : null}
			</main>
		</>
	);
}

export default App;
