// EXPLICATION : Ce composant permet de rendre le footer qui contient les objectifs

import Paper from "../assets/img/Paper.png";
import Objectif from "./Objectif";
import { dataObjectif } from "../utils/const/dataObjectif.js";
import { BoxContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";

const Footer = () => {
	// EXPLICATION : CurrentBox est utilisé pour fetcher uniquement les objectifs de la boite en cours.
	const { currentBox } = useContext(BoxContext);

	return (
		<footer>
			<div className="footer__topSection">
				<div className="footer__paper--container">
					<img className="footer__paper" src={Paper} />
				</div>
				<div className="footer__title--container">
					<p className="footer__title">Vos objectifs</p>
				</div>
			</div>
			<div className="footer__bottomSection">
				<div className="objectif__wrapper">
					{dataObjectif[currentBox].map((objectif, index) => (
						<Objectif data={objectif} key={`objectifKey-${index}`} />
					))}
				</div>
			</div>
		</footer>
	);
};
export default Footer;
