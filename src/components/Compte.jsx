import { useState } from "react";
import PropTypes from "prop-types";
import IconAccount from "../assets/icons/Icon_Account.svg";
import { Link } from "react-router-dom";

// Rajouter une fonction pour la déconnexion !!

const Compte = ({ handleNappe }) => {
	const [active, setActive] = useState(false);

	const activeDrop = () => {
		setActive(!active);
	};

	const openWebsite = () => {
		window.open("https://app.detectivebox.fr/politique-de-confidentialite.html", "_blank");
	};

	return (
		<div className="dropdown">
			<button className="dropdown__icon-container" onClick={activeDrop}>
				<img className="dropdown__icon" src={IconAccount} />
			</button>
			<div className={"dropdown__childs" + (active ? "--active" : "")}>
				<button className="dropdown__child" onClick={handleNappe}>
					Nappe d&apos;ambiance
				</button>
				<Link className="dropdown__child" to="/legales">
					Paramètres
				</Link>
				<button className="dropdown__child" onClick={openWebsite}>
					Mentions Légales
				</button>
				<Link className="dropdown__child" to="/credits">
					Crédits
				</Link>
				<button className="dropdown__child">Déconnexion</button>
			</div>
		</div>
	);
};

Compte.propTypes = {
	handleNappe: PropTypes.func,
};

export default Compte;
