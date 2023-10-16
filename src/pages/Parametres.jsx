//Ici c'est la page paramètre du compte, disponible via l'application pour :
// Mute la nappe d'ambiance ou pas
// Changer son mot de passe
// etc ?

import { Link } from "react-router-dom";
function Parametres() {
	return (
		<main className="parametres">
			<Link className="parametres__link" to="/home">
				&lt; Retour à l&apos;enquête
			</Link>
			<h1 className="parametres__title">Mention Légales</h1>
			<p className="parametres__subtitle">Pour l&apos;instant, rien à afficher</p>
		</main>
	);
}
export default Parametres;
