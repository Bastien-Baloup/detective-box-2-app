import { Link } from "react-router-dom";
function Legales() {
	return (
		<main className="legales">
			<Link className="legales__link" to="/home">
				&lt; Retour à l&apos;enquête
			</Link>
			<h1 className="legales__title">Mention Légales</h1>
			<p className="legales__subtitle">Pour l&apos;instant, rien à afficher</p>
		</main>
	);
}
export default Legales;
