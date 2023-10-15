import Paper from "../assets/img/Paper.png";
import Objectif from "./Objectif";
import { dataObjectifTest } from "../utils/const/datatObjectif.js";

function Footer() {
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
					{dataObjectifTest.box1.map((objectif, index) => (
						<Objectif data={objectif} key={`objectifKey-${index}`} />
					))}
				</div>
			</div>
		</footer>
	);
}
export default Footer;
