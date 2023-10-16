import Saison1 from "../assets/img/encart_saison1.jpg";
import Saison2 from "../assets/img/encart_saison2.jpg";
import Paper from "../assets/img/DB-papier-froisse.jpg";
import { Link } from "react-router-dom";

function Scenario() {
	// const openApp1 = () => {
	// 	window.open("https://app.detectivebox.fr/connexion", "_blank");
	// };
	const openWebsite = () => {
		window.open("https://detectivebox.fr/", "_blank");
	};

	return (
		<main className="scenarios">
			<h1 className="scenarios__title">Choisissez votre scénario</h1>
			<div className="scenarios__choice">
				<a href="https://app.detectivebox.fr/connexion" target="_blank" rel="noopener noreferrer">
					<article className="scenario">
						<div className="scenario__poster__container">
							<img className="scenario__poster" src={Saison1} />
						</div>
						<div className="scenario__title__container">
							<p className="scenario__title">Woodlock</p>
						</div>
					</article>
				</a>

				<Link to="/sign-in">
					<article className="scenario">
						<div className="scenario__poster__container">
							<img className="scenario__poster" src={Saison2} />
						</div>
						<div className="scenario__title__container">
							<p className="scenario__title">Le tueur au tarot</p>
						</div>
					</article>
				</Link>

				<a href="https://detectivebox.fr/" target="_blank" rel="noopener noreferrer">
					<article className="scenario" onClick={openWebsite}>
						<div className="scenario__poster__container">
							<img className="scenario__poster" src={Paper} />
						</div>
						<div className="scenario__title__container">
							<p className="scenario__title">Prochainement</p>
						</div>
					</article>
				</a>
			</div>
		</main>
	);
}
export default Scenario;
