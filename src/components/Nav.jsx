import Home from "../assets/icons/Icon_Home.svg";
import Help from "../assets/icons/Icon_Help.svg";
import Clue from "../assets/icons/Icon_Clue.svg";
import { NavLink } from "react-router-dom";

const Nav = () => {
	// const [isActive, setIsActive] = useState("home");

	// const handleActiveHome = () => {
	// 	setIsActive("home");
	// };

	// const handleActiveClue = () => {
	// 	setIsActive("clue");
	// };

	// const handleActiveHelp = () => {
	// 	setIsActive("help");
	// };

	return (
		<nav className="nav">
			<NavLink className={"nav__container"} to="/home">
				<div className="nav__icon__container">
					<img src={Home} className="nav__icon" />
				</div>
				<div className="nav__title">Accueil </div>
			</NavLink>
			<NavLink className={"nav__container"} to="/history">
				<div className="nav__icon__container">
					<img src={Clue} className="nav__icon" />
				</div>
				<div className="nav__title">Historique </div>
			</NavLink>
			<NavLink className={"nav__container"} to="/help">
				<div className="nav__icon__container">
					<img src={Help} className="nav__icon" />
				</div>
				<div className="nav__title">Demander du renfort </div>
			</NavLink>
		</nav>
	);
};

export default Nav;
