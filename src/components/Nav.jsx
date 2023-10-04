import { useState } from "react";
import Home from "../assets/icons/Icon_Home.svg";
import Help from "../assets/icons/Icon_Help.svg";
import Clue from "../assets/icons/Icon_Clue.svg";

const Nav = () => {
	const [isActive, setIsActive] = useState("Home");

	const handleActiveHome = () => {
		setIsActive("home");
	};

	const handleActiveClue = () => {
		setIsActive("clue");
	};

	const handleActiveHelp = () => {
		setIsActive("help");
	};

	return (
		<nav className="nav">
			<div className={"nav__container" + (isActive == "home" ? " nav--active" : "")} onClick={handleActiveHome}>
				<div className="nav__icon__container">
					<img src={Home} className="nav__icon" />
				</div>
				<div className="nav__title">Accueil </div>
			</div>
			<div className={"nav__container" + (isActive == "clue" ? " nav--active" : "")} onClick={handleActiveClue}>
				<div className="nav__icon__container">
					<img src={Clue} className="nav__icon" />
				</div>
				<div className="nav__title">Historique </div>
			</div>
			<div className={"nav__container" + (isActive == "help" ? " nav--active" : "")} onClick={handleActiveHelp}>
				<div className="nav__icon__container">
					<img src={Help} className="nav__icon" />
				</div>
				<div className="nav__title">Demander du renfort </div>
			</div>
		</nav>
	);
};

export default Nav;
