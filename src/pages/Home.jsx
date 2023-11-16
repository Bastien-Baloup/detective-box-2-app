// EXPLICATION : Page Home pour afficher les cartes personnages + les formulaires personnages pour les requêtes

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
import { BoxContext, DataContext } from "../utils/context/fetchContext";
import { useContext, useEffect } from "react";
import { urlApi } from "../utils/const/urlApi";
import { getEventByBox, updateEvent, getHistoryByBox } from "../utils/hooks/useApi";

function Home() {
	const [characterDisplayed, setCharacterDisplayed] = useState(null);
	const [modalLaurenGone, setModalLaurenGone] = useState(false);
	const [modalCelineGone, setModalCelineGone] = useState(false);

	const { currentBox } = useContext(BoxContext);
	const token = localStorage.getItem("token");
	const { toggleDataHistory, toggleDataEvent, actionToggleDataEvent } = useContext(DataContext);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getEventByBox(token, 3);
			const event34 = result.data.find((event) => event.id == 34);
			setEvent34(event34.status);
		};
		fetchData();
	}, [toggleDataEvent]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoryByBox(token, 2);
			const box2document6 = result.data.find((event) => event.id == "box2document6");
			setBox2Document6(box2document6.status);
		};
		fetchData();
	}, [toggleDataHistory]);

	const [event34, setEvent34] = useState("");
	const [box2document6, setBox2Document6] = useState(false);

	const specificCardActionLauren = () => {
		setModalLaurenGone(!modalLaurenGone);
	};

	const launchEventGoToDB = async () => {
		setModalLaurenGone(!modalLaurenGone);
		await updateEvent(token, 2, 25, "open");
		actionToggleDataEvent();
	};

	// EXPLICATION : Quand le personnage de Lauren a disparu, alors on affiche cette modale pour afficher la video à l'agence (event 25)
	const displayModalLaurenGone = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/210-commentaires-raphaelle-absence-lauren.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p className="modal-boxdone__text">Agents, voici le numéro de portable de Lauren : +33 7 69 57 00 27.</p>
					<p className="modal-boxdone__text">Essayez de la joindre directement pour nous assurer que tout va bien.</p>
					<p className="modal-boxdone__text">De mon côté, je me mets en route pour l&apos;agence. Retrouvez moi là bas !</p>
					<button className="modal-boxdone__button button--red" onClick={launchEventGoToDB}>
						Se rendre au bureau
					</button>
				</div>
			</div>
		);
	};

	const specificCardActionCeline = () => {
		setModalCelineGone(!modalCelineGone);
	};

	// EXPLICATION : Quand le personnage de Céline a disparu, alors on affiche cette modale
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

	// EXPLICATION : Fonction pour afficher tout les personnages
	const displayAllCharacters = () => {
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
					{currentBox == 3 ? (
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
							actionButton={
								currentBox == 2 && box2document6 == true ? specificCardActionLauren : () => setCharacterDisplayed("lauren")
							}
							state={currentBox == 2 && box2document6 == true ? "unavailable" : ""}
						/>
					)}
					<Card
						srcImg={PhotoCeline}
						srcIcon={IconCeline}
						name="Céline Valluy"
						contentButton="Demander un dossier de police"
						actionButton={() => setCharacterDisplayed("celine")}
						state={event34 == "done" ? "unavailable" : ""}
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
						actionButton={currentBox == 1 ? null : () => setCharacterDisplayed("adele")}
						state={currentBox == 1 ? "unavailable" : ""}
					/>
				</div>
				{modalLaurenGone ? displayModalLaurenGone() : null}
				{modalCelineGone ? displayModalCelineGone() : null}
			</>
		);
	};

	// EXPLICATION : Afficher de nouveau tout les personnages
	const backToHome = () => {
		setCharacterDisplayed(null);
	};

	// EXPLICATION : Fonctions pour afficher tout les différents personnages
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
