import { useState } from "react";
import IconAccount from "../assets/icons/Icon_Account.svg";

const Compte = () => {
	const [active, setActive] = useState(false);

	const activeDrop = () => {
		setActive(!active);
	};

	return (
		<div className="dropdown">
			<button className="dropdown__icon-container" onClick={activeDrop}>
				<img className="dropdown__icon" src={IconAccount} />
			</button>
			<div className={"dropdown__childs" + (active ? "--active" : "")}>
				<a className="dropdown__child" href="#">
					Paramètres
				</a>
				<a className="dropdown__child" href="#">
					Mentions Légales
				</a>
				<a className="dropdown__child" href="#">
					Crédits
				</a>
				<a className="dropdown__child" href="#">
					Déconnexion
				</a>
			</div>
		</div>
	);
};

export default Compte;
