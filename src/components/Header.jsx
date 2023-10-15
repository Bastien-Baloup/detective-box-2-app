import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png";
import Progression from "../components/Progression.jsx";
import Compte from "../components/Compte.jsx";
import Nav from "../components/Nav.jsx";
import Nappe from "../components/Nappe.jsx";
import Quizz from "../components/Quizz.jsx";
import Ambiance from "../assets/media/Musiques DB S2 - Thème Tueur.wav";
import { dataQuizzTest } from "../utils/const/dataQuizz";
import News from "../assets/media/DB_S02_203_v4_2-test.mp4";
import Video from "../components/Video.jsx";
import { Link } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
// Put Timer end box 3 here
// Ne mettre le quizz que si box 2 ou 3

const Header = () => {
	const [nappeMute, setNappeMute] = useState(true);
	// const [ispreviouslyMuted, setIsPreviouslyMuted] = useState(true);
	const [tutorialModalIsActive, setTutorialModalIsActive] = useState(true);
	const [tutorialIsActive, setTutorialIsActive] = useState(false);
	const [quizzIsActive, setQuizzIsActive] = useState(false);
	const [nappeModalIsActive, setNappeModalIsActive] = useState(false);

	const audioElem = useRef();

	useEffect(() => {
		if (nappeMute) {
			audioElem.current.pause();
			// audioElem.current.currentTime = 0;
		} else {
			audioElem.current.play();
		}
	}, [nappeMute]);

	const activateNappe = () => {
		setNappeMute(false);
		setNappeModalIsActive(false);
	};

	const desactivateNappe = () => {
		setNappeMute(true);
		setNappeModalIsActive(false);
	};

	const handleCloseQuizz = () => {
		setQuizzIsActive(false);
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

	return (
		<header>
			{tutorialModalIsActive ? displayTutorial() : <></>}
			{tutorialIsActive ? (
				<Video title="Vidéo du tutoriel" srcVideo={News} handleModalVideo={handleCloseTutorial} />
			) : (
				<></>
			)}
			{quizzIsActive ? <Quizz data={dataQuizzTest} handleEndQuizz={handleCloseQuizz} /> : <></>}
			{nappeModalIsActive ? <Nappe activateNappe={activateNappe} desactivateNappe={desactivateNappe} /> : <></>}
			<audio loop preload="auto" ref={audioElem}>
				<source src={Ambiance} type="audio/wav" />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className="header__topSection">
				<Link className="header__logo--container" to="/home">
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
}
export default Header;
