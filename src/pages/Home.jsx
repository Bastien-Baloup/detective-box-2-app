import Card from "../components/Card";
import IconLauren from "../assets/icons/Logo_Lauren.svg";
import PhotoLauren from "../assets/img/LAUREN_DARK.png";
import IconRaphaelle from "../assets/icons/Logo_Raphaelle.svg";
import PhotoRaphaelle from "../assets/img/RAPHAELLE_DARK.png";
import IconCeline from "../assets/icons/Logo_Celine.svg";
import PhotoCeline from "../assets/img/CELINE_DARK.png";
import IconTim from "../assets/icons/Logo_Tim.svg";
import PhotoTim from "../assets/img/TIM_DARK.png";
import IconAdele from "../assets/icons/Logo_Adele.svg";
import PhotoAdele from "../assets/img/ADELE_DARK.png";
import Tim from "./Tim";
import Adele from "./Adele";
import Lauren from "./Lauren";
import Raphaelle from "./Raphaelle";
import Celine from "./Celine";
import { useState } from "react";

function Home() {
	// if not logged, redirect to Page de connexion
	const [characterDisplayed, setCharacterDisplayed] = useState(null);
	const [modalLaurenGone, setModalLaurenGone] = useState(false);
	const [modalCelineGone, setModalCelineGone] = useState(false);

	const specificCardActionLauren = () => {
		setModalLaurenGone(!modalLaurenGone);
		console.log("voici une action particulière à effectuer pour Lauren");
	};

	const displayModalLaurenGone = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
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
		return (
			<>
				<div className="card__wrapper">
					<Card
						srcImg={PhotoLauren}
						srcIcon={IconLauren}
						name="Lauren Fraser"
						contentButton="Faire un interrogatoire"
						actionButton={() => setCharacterDisplayed("lauren")}
						state=""
					/>
					<Card
						srcImg={PhotoRaphaelle}
						srcIcon={IconRaphaelle}
						name="Raphaëlle Sanchez"
						contentButton="Explorer un lieu"
						actionButton={() => setCharacterDisplayed("raphaelle")}
						state=""
					/>
					<Card
						srcImg={PhotoCeline}
						srcIcon={IconCeline}
						name="Céline Valluy"
						contentButton="Demander un dossier de police"
						actionButton={() => setCharacterDisplayed("celine")}
						state=""
					/>
					<Card
						srcImg={PhotoTim}
						srcIcon={IconTim}
						name="Tim Lonewood"
						contentButton="Demander une analyse"
						actionButton={() => setCharacterDisplayed("tim")}
						state=""
					/>
					<Card
						srcImg={PhotoAdele}
						srcIcon={IconAdele}
						name="Adèle Leinu"
						contentButton="Demander une analyse"
						actionButton={() => setCharacterDisplayed("adele")}
						state="unavailable"
					/>
				</div>
				{modalLaurenGone ? displayModalLaurenGone() : null}
				{modalCelineGone ? displayModalCelineGone() : null}
			</>
		);
	};

	const backToHome = () =>{
		setCharacterDisplayed(null);
	}

	const displayLauren = () => {
		return <Lauren valueUsername="" setValueUsername="" closeAgentPage={backToHome}/>;
	};

	const displayRaphaelle = () => {
		return <Raphaelle valueUsername="" setValueUsername="" closeAgentPage={backToHome}/>;
	};

	const displayCeline = () => {
		return <Celine valueUsername="" setValueUsername="" closeAgentPage={backToHome}/>;
	};

	const displayTim = () => {
		return <Tim valueUsername="" setValueUsername="" closeAgentPage={backToHome}/>;
	};

	const displayAdele = () => {
		return <Adele valueUsername="" setValueUsername="" closeAgentPage={backToHome}/>;
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
