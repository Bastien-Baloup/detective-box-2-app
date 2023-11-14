// EXPLICATION : Ce composant permet de rendre le footer qui contient les objectifs

import Paper from "../assets/img/Paper.png";
import Objectif from "./Objectif";
// import { dataObjectif } from "../utils/const/dataObjectif.js";
import { BoxContext, DataContext } from "../utils/context/fetchContext.jsx";
import { useContext, useEffect, useState } from "react";
import { getObjectivesByBox } from "../utils/hooks/useApi.js";

const Footer = () => {
	const { currentBox } = useContext(BoxContext);
	const token = localStorage.getItem("token");
	const { toggleDataObjectif } = useContext(DataContext);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getObjectivesByBox(token, currentBox);
			console.log(result.data);
			setDataObjectif(result.data);
		};
		fetchData();
	}, [toggleDataObjectif]);

	// EXPLICATION : CurrentBox est utilisé pour fetcher uniquement les objectifs de la boite en cours.

	const [dataObjectif, setDataObjectif] = useState(null);

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
					{dataObjectif?.map((objectif, index) => (
						<Objectif data={objectif} key={`objectifKey-${index}`} />
					))}
				</div>
			</div>
		</footer>
	);
};
export default Footer;
