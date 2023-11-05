// EXPLICATION : Ce composant permet de rendre le header de l'application.
// EXPLICATION : Le header comprend le logo / le composant Progression / le composant Compte / le composant Nav
// EXPLICATION : Il contient aussi le timer de fin de 30 minutes
// EXPLICATION : Il contient aussi les modales Tutoriel / Quizz / Nappe d'ambiance

import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png";
import Progression from "../components/Progression.jsx";
import Compte from "../components/Compte.jsx";
import Nav from "../components/Nav.jsx";
import Nappe from "../components/Nappe.jsx";
import Quizz from "../components/Quizz.jsx";
import Timer from "./Timer.jsx";
// import { dataQuizz } from "../utils/const/dataQuizz";
import Video from "../components/Video.jsx";
import { Link } from "react-router-dom";
import { urlApi } from "../utils/const/urlApi";
import { AmbianceContext, BoxContext, AuthContext, DataContext } from "../utils/context/fetchContext.jsx";
import { useEffect, useState, useRef, useContext } from "react";
import { getQuizzByBox, getEventByBox, updateEvent, updateQuizz } from "../utils/hooks/useApi.js";
// REDUIRE LA TAILLE DU LOGO //

const Header = () => {
	const { fetchNappeMute, nappeMute } = useContext(AmbianceContext);
	const { currentBox } = useContext(BoxContext);
	const { token } = useContext(AuthContext);
	const { actionToggleDataEvent, toggleDataEvent } = useContext(DataContext);

	const [tutorialModalIsActive, setTutorialModalIsActive] = useState(true);
	const [tutorialIsActive, setTutorialIsActive] = useState(false);
	const [quizzIsActive, setQuizzIsActive] = useState(false);
	const [nappeModalIsActive, setNappeModalIsActive] = useState(false);

	const audioElem = useRef();

	// EXPLICATION : Cette fonction récupère l'état de la musique d'ambiance avec Context. Si nappemute, alors la musique d'ambiance est en pause, sinon elle se joue.
	useEffect(() => {
		if (nappeMute) {
			audioElem.current.pause();
		} else {
			audioElem.current.play();
		}
	}, [nappeMute]);

		// EXPLICATION : Cette fonction récupère du quizz (il ne se joue qu'une fois par box)

	useEffect(() => {
		const fetchData = async () => {
			if (currentBox != 1) {
				const quizz = await getQuizzByBox(token, currentBox);
				console.log(quizz);
				setDataQuizz(quizz);
			}
		};
		fetchData();
	}, [token, currentBox]);

	useEffect(() => {
		const fetchData = async () => {
			const events = await getEventByBox(token, currentBox);
			// setDataEvent(events.data);
			if (currentBox == 1) {
				const event11 = events.data.find((event) => event.id == 11);
				setEvent11(event11.status);
			}
			if (currentBox == 2) {
				const event21 = events.data.find((event) => event.id == 21);
				setEvent21(event21.status);
			}
			if (currentBox == 3) {
				const event31 = events.data.find((event) => event.id == 31);
				setEvent31(event31.status);
				const event33 = events.data.find((event) => event.id == 33);
				setEvent33(event33.status);
			}
		};
		fetchData();
	}, [token, currentBox, toggleDataEvent]);

	const [dataQuizz, setDataQuizz] = useState("");
	// const [dataEvent, setDataEvent] = useState("");
	const [event11, setEvent11] = useState("");
	const [event21, setEvent21] = useState("");
	const [event31, setEvent31] = useState("");
	const [event33, setEvent33] = useState("");

	// EXPLICATION : Le joueur choisi d'activer la musique d'ambiance > son état se met à jour dans le context > ferme la modale > affiche la video de briefing en fonction de la box.
	const activateNappe = () => {
		fetchNappeMute(false);
		setNappeModalIsActive(false);
		playBriefingVideo();
	};

	// EXPLICATION : L'affichage de la video se fait via le Composant Objectif via un event (la video ne se joue qu'une fois donc si l'évent est "done", alors la video ne se joue pas)
	const playBriefingVideo = async () => {
		if (currentBox == 1 && event11 == "closed") {
			await updateEvent(token, 1, 11, "open");
			actionToggleDataEvent();
		}
		if (currentBox == 2 && event21 == "closed") {
			await updateEvent(token, 2, 21, "open");
			actionToggleDataEvent();
		}
		if (currentBox == 3 && event31 == "closed") {
			await updateEvent(token, 3, 31, "open");
			actionToggleDataEvent();
		}
	};

	// EXPLICATION : Le joueur choisi de désactiver la musique d'ambiance > son état se met à jour dans le context > ferme la modale > affiche la video de briefing en fonction de la box.
	const desactivateNappe = () => {
		fetchNappeMute(true);
		setNappeModalIsActive(false);
		playBriefingVideo();
	};

	// EXPLICATION : On affiche le Quizz en fonction de la box. Box 1 pas de quizz !
	const displayQuizz = () => {
		if (currentBox == 1) {
			handleCloseQuizz();
			return <></>;
		}
		if (currentBox == 2 || currentBox == 3) {
			if (dataQuizz[currentBox].status == true) {
				handleCloseQuizz();
				return <></>;
			}
			if (dataQuizz[currentBox].status == false) {
				return <Quizz data={dataQuizz[currentBox]} handleEndQuizz={handleCloseQuizz} url={urlApi.apiRemi()} />;
			}
		}
	};

	// EXPLICATION : On ferme le quizz et on affiche la modale pour choisir si active ou desactive la nappe d'ambiance
	const handleCloseQuizz = async () => {
		await updateQuizz(token, currentBox);
		setQuizzIsActive(false);
		setNappeModalIsActive(true);
	};

	// EXPLICATION : On affiche une modale qui propose aux joueurs d'afficher le tutoriel ou non
	const displayTutorial = () => {
		return (
			<div className="tutorial__background">
				<div className="tutorial">
					<p className="tutorial__text">Voulez vous voir le tutoriel ?</p>
					<div className="tutorial__buttons">
						<button className="tutorial__button button--red" onClick={handleOpenTutorial}>
							Oui
						</button>
						<button className="tutorial__button button--white" onClick={handleCloseModalTutorial}>
							Non
						</button>
					</div>
				</div>
			</div>
		);
	};

	// EXPLICATION : On affiche le tutorial en video et on ferme la modale de choix d'affichage du tutorial
	const handleOpenTutorial = () => {
		setTutorialIsActive(true);
		setTutorialModalIsActive(false);
	};

	// EXPLICATION : On ferme la modale de choix d'affichage du tutorial et on affiche le quizz
	const handleCloseModalTutorial = () => {
		setTutorialModalIsActive(false);
		setQuizzIsActive(true);
	};

	// EXPLICATION : On ferme la video du tutorial et on affiche le quizz
	const handleCloseTutorial = () => {
		setTutorialIsActive(false);
		setQuizzIsActive(true);
	};

	// EXPLICATION : Audio pour les nappes d'ambiance en fonction de la box (une box = une musique d'ambiance)
	const displayAudio = () => {
		if (currentBox == 1) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-1.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == 2) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-2.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == 3) {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-3.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
	};

	// EXPLICATION : Le timer de fin s'affiche lors de la dernière étape du jeu. Il est en overlay sur le header pour que le joueur ne puisse pas cliquer sur les autres composants
	const displayTimer = () => {
		if (event33 && event33 == "open") {
			fetchNappeMute(false);
			return (
				<>
					<div className="final__timer">
						<Timer initialMinute={30} initialSecond={0} timerEndedFunction={tooLate} />;
					</div>
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/305-commentaires-pendant-timer.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
				</>
			);
		}
	};

	const tooLate = async () => {
		await updateEvent(token, 3, 33, "done");
		await updateEvent(token, 3, 35, "open");
		actionToggleDataEvent();
	};

	// Il manque ici la vidéo du TUTORIEL !! //

	// EXPLICATION : Dans l'ordre : Modale Tutoriel > Si oui > affichage tutoriel video / si non > fermeture modale tutoriel
	// EXPLICATION : PUIS affichage du quizz si box 2 ou box 3
	// EXPLICATION : PUIS affichage de la modale de choix de l'activation de la musique d'ambiance
	// EXPLICATION : PUIS affichage de la video de brief si l'event correspondant est initialement "closed".
	return (
		<header>
			{tutorialModalIsActive ? displayTutorial() : <></>}
			{tutorialIsActive ? (
				<Video title="Vidéo du tutoriel" srcVideo={null} handleModalVideo={handleCloseTutorial} />
			) : (
				<></>
			)}
			{quizzIsActive ? displayQuizz() : <></>}
			{nappeModalIsActive ? <Nappe activateNappe={activateNappe} desactivateNappe={desactivateNappe} /> : <></>}
			{displayAudio()}
			{displayTimer()}
			<div className="header__topSection">
				<Link className="header__logo--container" to="/">
					<img className="header__logo" src={Logo} />
				</Link>
				<Progression />
				<Compte />
			</div>
			<div className="header__bottomSection">
				<Nav />
			</div>
		</header>
	);
};
export default Header;
