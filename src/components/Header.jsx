import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png";
import Progression from "../components/Progression.jsx";
import Compte from "../components/Compte.jsx";
import Nav from "../components/Nav.jsx";
import Nappe from "../components/Nappe.jsx";
import Quizz from "../components/Quizz.jsx";
import { dataQuizz } from "../utils/const/dataQuizz";
import Video from "../components/Video.jsx";
import { Link } from "react-router-dom";
import { urlApi } from "../utils/const/urlApi";
import { AmbianceContext, BoxContext } from "../utils/context/fetchContext.jsx";
import { useEffect, useState, useRef, useContext } from "react";
// PUT TIMER END BOX 3 HERE //

const Header = () => {
	const { fetchNappeMute, nappeMute } = useContext(AmbianceContext);
	const { currentBox } = useContext(BoxContext);
	const [tutorialModalIsActive, setTutorialModalIsActive] = useState(true);
	const [tutorialIsActive, setTutorialIsActive] = useState(false);
	const [quizzIsActive, setQuizzIsActive] = useState(false);
	const [nappeModalIsActive, setNappeModalIsActive] = useState(false);

	const audioElem = useRef();

	useEffect(() => {
		if (nappeMute) {
			audioElem.current.pause();
		} else {
			audioElem.current.play();
		}
	}, [nappeMute]);

	const activateNappe = () => {
		fetchNappeMute(false);
		setNappeModalIsActive(false);
	};

	const desactivateNappe = () => {
		fetchNappeMute(true);
		setNappeModalIsActive(false);
	};

	const displayQuizz = () => {
		if (currentBox == "box1") {
			handleCloseQuizz();
			return <></>;
		}
		if (currentBox == "box2" || currentBox == "box3") {
			if (dataQuizz[currentBox].status == true) {
				handleCloseQuizz();
				return <></>;
			}
			if (dataQuizz[currentBox].status == false) {
				return <Quizz data={dataQuizz[currentBox]} handleEndQuizz={handleCloseQuizz} url={urlApi.apiRemi()} />;
			}
		}
	};

	const handleCloseQuizz = () => {
		setQuizzIsActive(false);
		// API PUT METHOD TO UPDATE dataQuizz[currentBox].status = true //
		setNappeModalIsActive(true);
	};

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

	const handleOpenTutorial = () => {
		setTutorialIsActive(true);
		setTutorialModalIsActive(false);
	};

	const handleCloseModalTutorial = () => {
		setTutorialModalIsActive(false);
		setQuizzIsActive(true);
	};

	const handleCloseTutorial = () => {
		setTutorialIsActive(false);
		setQuizzIsActive(true);
	};

	const displayAudio = () => {
		if (currentBox == "box1") {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-1.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == "box2") {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-2.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
		if (currentBox == "box3") {
			return (
				<audio loop preload="auto" ref={audioElem}>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-nappe-3.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
			);
		}
	};

	// Il manque ici la vidéo du TUTORIEL !! //

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
