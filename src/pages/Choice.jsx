// EXPLICATION : Page pour afficher les cartes de choix des boxs + le bouton reset pour recommencer le jeu depuis 0
// EXPLICATION : Attention, dans la BDD, une box "Generic" a été créé (utilise pour les requêtes personnages qui sont multi-boxs). Ne pas l'afficher ici !

// Récupérer dans la BDD quelle box a son état OUVERTE = TRUE (OUVERTE / FERMEE / RESOLUE)
// Changer le Context avec la box sélectionnée
import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDetectiveBlanc.png";
import Boxchoice from "../components/Boxchoice.jsx";
import { dataBox } from "../utils/const/dataBox";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

// ICI METTRE UN CALL API POUR RECUPERER STATE DES BOXS ? ou juste avec url ? //
// ICI METTRE UN CALL API POUR RESET TOUT LES STATES DE TOUTES LES CONST EN FALSE //

function Choice() {
	const { loggedIn } = useContext(AuthContext);
	const [modalReset1, setModalReset1] = useState(false);
	const [modalReset2, setModalReset2] = useState(false);

	// EXPLICATION : Si le joueur n'est pas connecté, retour à la page sign in
	if (!loggedIn) {
		return <Navigate to="/sign-in" />;
	}

	const displayBoxChoice = () => {
		return (
			<div className="boxchoice__wrapper">
				{dataBox.map((box, index) => (
					<Boxchoice data={box} key={`boxChoiceKey-${index}`} />
				))}
			</div>
		);
	};

	const nextStepReset = () => {
		setModalReset2(true);
		setModalReset1(false);
	};

	// EXPLICATION : Modale de vérification pour reste tout l'avancement
	const displayModalReset1 = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<p className="modal-boxdone__text">
						Voulez-vous recommencer l&apos;aventure depuis le début ? <br></br>
						Attention, cette action est irreversible et supprimera votre avancement actuel dans l&apos;enquête !
					</p>
					<button className="modal-boxdone__button button--red" onClick={nextStepReset}>
						Oui, supprimez mon avancement
					</button>
					<button className="modal-boxdone__button button--red" onClick={() => setModalReset1(false)}>
						Non, retour à l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	// EXPLICATION : Modale de double vérification pour reste tout l'avancement
	const displayModalReset2 = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<p className="modal-boxdone__text">
						Merci de confirmer la remise à zéro de votre avancement dans l&apos;enquête <br></br>
						Vous comprenez que cette action est irreversible et que nous ne serons pas en mesure de retrouver votre
						sauvegarde.
					</p>
					<button className="modal-boxdone__button button--red" onClick={resetGame}>
						Oui, supprimez !
					</button>
					<button className="modal-boxdone__button button--red" onClick={() => setModalReset2(false)}>
						Non, retour à l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	// EXPLICATION : Fonction pour remettre les boxs à zéro
	const resetGame = () => {
		alert("Mock : Vous avez supprimé votre partie");
		setModalReset2(false);
		// ICI METTRE UN CALL API POUR RESET TOUT LES STATES DE TOUTES LES CONST EN FALSE //
	};

	return (
		<main className="choice">
			<img className="choice__logo" src={Logo} />
			<h1 className="choice__title">Bienvenue Agents</h1>
			<p className="choice__subtitle">Veuillez sélectionner votre niveau d&apos;avancement</p>
			{displayBoxChoice()}
			<button className="choice__reset button--red" onClick={() => setModalReset1(true)}>
				Recommencer l&apos;aventure
			</button>
			{modalReset1 ? displayModalReset1() : ""}
			{modalReset2 ? displayModalReset2() : ""}
		</main>
	);
}
export default Choice;
