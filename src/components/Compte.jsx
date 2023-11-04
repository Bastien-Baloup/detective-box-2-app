// EXPLICATION : Ce composant permet de rendre le dropdown menu.
// EXPLICATION : Ce dropdown permet d'activer ou de désactiver la musique d'ambiance
// EXPLICATION : + d'envoyer les joueurs sur la page paramètre pour changer mot de passe et nom d'utilisateur
// EXPLICATION : + de renvoyer vers la page des mentions légales de app1 (un boilerplate d'une page mention légale est disponible dans les composants de cette app au besoin)
// EXPLICATION : + de renvoyer vers la page crédit
// EXPLICATION : + de déconnecter l'utilisateur
// EXPLICATION : Ce composant est utilisé dans le header

import { useState } from "react";
import PropTypes from "prop-types";
import IconAccount from "../assets/icons/Icon_Account.svg";
import { Link } from "react-router-dom";
import { AuthContext, AmbianceContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";

const Compte = () => {
	const [active, setActive] = useState(false);
	const { logout } = useContext(AuthContext);
	const { fetchNappeMute, nappeMute } = useContext(AmbianceContext);

	const activeDrop = () => {
		setActive(!active);
	};

	// EXPLICATION : Cette fonction permet de récupérer l'état de la musique d'ambiance et d'activer son état inverse.
	const handleNappe = () => {
		fetchNappeMute(!nappeMute);
		activeDrop();
	};

	// EXPLICATION : Cette fonction permet de déconnecter l'utilisateur (logique dans Context)
	const hangleLogout = () => {
		logout();
		activeDrop();
	};

	// EXPLICATION : Cette fonction permet d'ouvrir la page des politiques de confidentialité de l'app 1'
	const openWebsite = () => {
		window.open("https://app1.detectivebox.fr/politique-de-confidentialite.html", "_blank");
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
				<Link className="dropdown__child" to="/parametres">
					Paramètres
				</Link>
				<button className="dropdown__child" onClick={openWebsite}>
					Mentions Légales
				</button>
				<Link className="dropdown__child" to="/credits">
					Crédits
				</Link>
				<button className="dropdown__child" onClick={hangleLogout}>
					Déconnexion
				</button>
			</div>
		</div>
	);
};

Compte.propTypes = {
	handleNappe: PropTypes.func,
};

export default Compte;
