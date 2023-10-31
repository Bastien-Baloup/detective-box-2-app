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

function Home() {
	const [characterDisplayed, setCharacterDisplayed] = useState(null);
	const [modalLaurenGone, setModalLaurenGone] = useState(false);
	const [modalCelineGone, setModalCelineGone] = useState(false);

	const { currentBox } = useContext(BoxContext);

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
