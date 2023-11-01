import Card from "../components/Card";
import IconLauren from "../assets/icons/Logo_Lauren.svg";
import PhotoLauren from "../assets/img/Agent_lauren.jpg";
import IconRaphaelle from "../assets/icons/Logo_Raphaelle.svg";
import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import IconCeline from "../assets/icons/Logo_Celine.svg";
import PhotoCeline from "../assets/img/Agent_celine.jpg";
import IconTim from "../assets/icons/Logo_Tim.svg";
import PhotoTim from "../assets/img/Agent_tim.jpg";
import IconAdele from "../assets/icons/Logo_Adele.svg";
import PhotoAdele from "../assets/img/Agent_adele.jpg";
import Tim from "./Tim";
import Adele from "./Adele";
import Lauren from "./Lauren";
import Raphaelle from "./Raphaelle";
import Celine from "./Celine";
import { useState } from "react";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext } from "react";
import { urlApi } from "../utils/const/urlApi";

function Home() {
	const [characterDisplayed, setCharacterDisplayed] = useState(null);
	const [modalLaurenGone, setModalLaurenGone] = useState(false);
	const [modalCelineGone, setModalCelineGone] = useState(false);

	const { currentBox } = useContext(BoxContext);

	const specificCardActionLauren = () => {
		setModalLaurenGone(!modalLaurenGone);
		console.log(
			" Agents, voici le numéro de portable de Lauren : +33 7 69 57 00 27. Essayez de la joindre directement pour nous assurer que tout va bien. De mon côté, je me mets en route pour l'agence. Retrouvez moi là bas ! "
		);
		// Bouton : Aller au bureau + pop up video bureau de Lauren (true dans historique)
	};

	const displayModalLaurenGone = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/210-commentaires-raphaelle-absence-lauren.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p className="modal-boxdone__text">
						Oh non ! <br></br> Quelque chose est arrivée à Lauren. Rendez-vous à l&apos;agence !
					</p>
					<button className="modal-boxdone__button button--red" onClick={specificCardActionLauren}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const specificCardActionCeline = () => {
		setModalCelineGone(!modalCelineGone);
		console.log("voici une action particulière à effectuer pour Céline");
	};

	const displayModalCelineGone = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/300-commentaires-sanchez-1.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p className="modal-boxdone__text">
						Oh non ! <br></br> Maintenant c&apos;est Céline que j&apos;arrive plus à joindre...
					</p>
					<button className="modal-boxdone__button button--red" onClick={specificCardActionCeline}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const displayAllCharacters = () => {
		// ICI RETRAVAILLER LES STATE AVEC UNE FONCTION IF (EVENT == TRUE) ALORS UNAVAILABLE ...//
		return (
			<>
				<div className="card__wrapper">
					<Card
						srcImg={PhotoRaphaelle}
						srcIcon={IconRaphaelle}
						name="Raphaëlle Sanchez"
						contentButton="Explorer un lieu"
						actionButton={() => setCharacterDisplayed("raphaelle")}
						state=""
					/>
					{currentBox == "box3" ? (
						<Card
							srcImg={PhotoRaphaelle}
							srcIcon={IconLauren}
							name="Raphaëlle Sanchez"
							contentButton="Demander un interrogatoire"
							actionButton={() => setCharacterDisplayed("lauren")}
							state=""
						/>
					) : (
						<Card
							srcImg={PhotoLauren}
							srcIcon={IconLauren}
							name="Lauren Fraser"
							contentButton="Demander un interrogatoire"
							actionButton={() => setCharacterDisplayed("lauren")}
							state=""
							// state={"eventmachin" == "done" ? "unavailable" : ""}
						/>
					)}
					<Card
						srcImg={PhotoCeline}
						srcIcon={IconCeline}
						name="Céline Valluy"
						contentButton="Demander un dossier de police"
						actionButton={() => setCharacterDisplayed("celine")}
						state=""
						// state={"eventmachin" == "done" ? "unavailable" : ""}
					/>
					<Card
						srcImg={PhotoTim}
						srcIcon={IconTim}
						name="Tim Lonewood"
						contentButton="Demander une analyse informatique"
						actionButton={() => setCharacterDisplayed("tim")}
						state=""
					/>
					<Card
						srcImg={PhotoAdele}
						srcIcon={IconAdele}
						name="Adèle Leinu"
						contentButton="Demander une analyse scientifique"
						actionButton={currentBox == "box1" ? null : () => setCharacterDisplayed("adele")}
						state={currentBox == "box1" ? "unavailable" : ""}
					/>
				</div>
				{modalLaurenGone ? displayModalLaurenGone() : null}
				{modalCelineGone ? displayModalCelineGone() : null}
			</>
		);
	};

	const backToHome = () => {
		setCharacterDisplayed(null);
	};

	const displayLauren = () => {
		return <Lauren closeAgentPage={backToHome} />;
	};

	const displayRaphaelle = () => {
		return <Raphaelle closeAgentPage={backToHome} />;
	};

	const displayCeline = () => {
		return <Celine closeAgentPage={backToHome} />;
	};

	const displayTim = () => {
		return <Tim closeAgentPage={backToHome} />;
	};

	const displayAdele = () => {
		return <Adele closeAgentPage={backToHome} />;
	};

	// --- LOGIQUE EVENT BOX 1 --- //

	// Si event1 == closed alors, display box1video1 - event == playing après la demande de nappe. (clic = historic update + event1 == done)
	// Si objectif 11 == done , box1help1 == done, (à mettre dans dataObjectif ?)
	// Si objectif 12 == done, alors display pop up "vous avez un nouveau mail" + Audio sounds/103-hacking-tueur.wav > Document box1document5
	// Si objectif 12 == done , box1help2 == done, (à mettre dans dataObjectif ?)
	// Si objectif 1, 2 et 3 == done, alors objectif 4 == open
	// Si objectif 4 == done + interrogatoire Garraud dans historique, alors pop up fin de box.
	// Attention si objectif 4 == done + si box1video4 dans historique, alors pop up fin de box (etat box 1 closed + navigate choix des box)
	// Si box1document1 dans historique, alors modale avec
	// Je vous transmets l’enregistrement qu’on a trouvé dans la malle pour que vous puissiez l’écouter. Tim nous confirme que c’est bien la voix de Rebecca. Attention, j’ai écouté l’enregistrement et il est assez dur. Pour les âmes sensibles, je vous donne directement la transcription ici. On a un médaillon, difficile de dire à quoi il sert. Quant aux inscriptions, je vous laisse me dire ce que ça vous inspire...
	// sounds/102-derniers-mots-rebecca.wav
	// si bonne réponse objectif 2, alors "Vous avez un nouveau mail" + sounds/103-hacking-tueur.wav + effet glitch
	//> box1document5
	// Si box1document2 dans historique, alors Voilà ce qu’on a retrouvé dans le coffre: une lettre et une cassette VHS. intéressants, un vers 15min où on voit Charles Garraud et un autre à la fin...Si vous voulez plus d’informations sur la cassette, n’hésitez pas à consulter Tim en lui demandant une analyse VHS. Il y avait aussi ce plan étrange, il n’a pas l’air bien vieux, il a dû être accroché à la maison il n’y a pas longtemps: Ça ne correspond à aucune des adresses qu’on a trouvées jusqu’ici...
	// Si box1video2 dans historique, alors pop up Video Cave (event). Au clic : event == done + box1document2 et box1document7 dans historique
	// NON LA VIDEO SE JOUERA DANS LE LIEU DE FOUILLE
	// Si box1archive23 dans historique, alors box1document4 dans historique
	// Si box1video4 dans historique, alors pop up video Garraud + box1document6 dans historique

	// --- LOGIQUE EVENT BOX 2 --- //

	// si event1 == closed and quizz.box2 == true alors display
	// Si "box2document6" alors lauren plus dispo
	// Si objectif 1 == done , alors pop up audio box2audio3 (true dans historique), puis pop up audio sounds/203-commentaires-raphaelle-breaking-news-1.wav au clic du bouton > puis video box2video3 > au clic sounds/203-commentaires-raphaelle-breaking-news-2.wav
	// Si lieu de fouille prison dans l'historique, alors objectif 2 ouvert
	// Si objectif 3 résolu, alors pop up audio Message Lauren (true dans historique)
	// Si video bureau de Lauren dans historique alors ==> objectif 4 == closed
	// Si tout les objectifs == closed alors modale fin de box
	// Ouverture objectif 4 (et renfort 4) ssi objectif 1, 2 et 3 closed
	// Si document photos Lauren dans l'historique alors event pour que Lauren = disparue

	// --- LOGIQUE EVENT BOX 3 --- //

	// Si event1 == closed  and quizz.box3 == true alors, display box3video1 (clic = historic update + event1 == done)
	// Si document malle du squelette de la foret est dans l'historique, alors objectif 3 ouvert
	// Si objectif 4 valide > pop up Video Retrouver Lauren > pop up audio Debrief Lauren > Lieu de fouille
	// si objectif 3 etape 2 valide, alors timer de fin == true + audio pendant le timer
	// if event alors pop up video interrogatoire final > objectif 4 valide > fin de box

	return (
		<main className="main__home">
			{characterDisplayed == null ? displayAllCharacters() : null}
			{characterDisplayed == "lauren" ? displayLauren() : null}
			{characterDisplayed == "raphaelle" ? displayRaphaelle() : null}
			{characterDisplayed == "celine" ? displayCeline() : null}
			{characterDisplayed == "tim" ? displayTim() : null}
			{characterDisplayed == "adele" ? displayAdele() : null}
		</main>
	);
}
export default Home;
