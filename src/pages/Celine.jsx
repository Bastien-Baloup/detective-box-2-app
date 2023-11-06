// EXPLICATION : Page pour faire les requêtes auprès du personnage de Céline
// EXPLICATION : Les validations des requêtes sont faites ici

import PhotoCeline from "../assets/img/Agent_celine.jpg";
import Input from "../components/Input.jsx";
import Document from "../components/Document.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext, AuthContext, DataContext } from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
// import { dataCeline } from "../utils/const/dataCeline";
import { updateCharactersById, updateHistory, getCharactersById } from "../utils/hooks/useApi.js";

const Celine = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const { token } = useContext(AuthContext);
	const { actionToggleDataCeline, toggleDataCeline } = useContext(DataContext);

	//EXPLICATION : Celine est le personnage "3"

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 3);
			console.log(result);
			setDataCeline(result);
		};
		fetchData();
	}, [token, currentBox, toggleDataCeline]);

	const [dataCeline, setDataCeline] = useState(null);

	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [modal, setModal] = useState(false);
	const [modalMedia, setModalMedia] = useState(false);
	const [answer, setAnswer] = useState("");

	// EXPLICATION : Fonction pour slugifier l'input des joueurs
	const slugify = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]/g, "");
		return inputSlugified;
	};

	// EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
	// EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (générique, box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
	// EXPLICATION : Celine et Lauren sont les seules à avoir des boxs génériques
	const handleSubmit = (e) => {
		const thisBox = dataCeline.find((element) => element.box_id == currentBox).data;
		const box1 = dataCeline.find((element) => element.box_id == 1).data;
		const box2 = dataCeline.find((element) => element.box_id == 2).data;
		const generic = dataCeline.find((element) => element.box_id == 4).data;
		const answerInThisBox = thisBox.find((element) => element.ask.includes(slugify(value)));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInFailedInterview = generic.find((element) => element.ask.includes(slugify(value)));
		const answerInBox1 = box1.some((element) => element.ask.includes(slugify(value)));
		const answerInBox2 = box2.some((element) => element.ask.includes(slugify(value)));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Je ne peux pas fouiller les archives sans un nom !");
			setValue("");
			return;
		}
		if (previouslyAnsweredInThisBox) {
			setValue("");
			setErrorMessage(
				"Vous m'avez dejà demandé le dossier cette personne. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			return;
		}
		if (answerInThisBox) {
			setAnswer(answerInThisBox);
			setModal(true);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (answerInFailedInterview) {
			setAnswer(answerInFailedInterview);
			setModal(true);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (currentBox == 2 && answerInBox1) {
			setValue("");
			setErrorMessage(
				"Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			return;
		}
		if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
			setValue("");
			setErrorMessage(
				"Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			return;
		}
		setValue("");
		setErrorMessage("Je ne trouve pas cette personne.");
	};

	const renderModal = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					{answer.srcComment ? (
						<audio autoPlay>
							<source src={urlApi.apiRemi() + answer.srcComment} type="audio/wav" />
							Votre navigateur ne prend pas en charge ce format
						</audio>
					) : (
						""
					)}
					<div>{renderText()}</div>
					{answer.id ? (
						<button className="modal-objectif__button button--red" onClick={openMedia}>
							Voir l&apos;élément
						</button>
					) : (
						<button className="modal-objectif__button button--red" onClick={validateModal}>
							Nouvelle requête
						</button>
					)}
				</div>
			</div>
		);
	};

	const renderText = () => {
		const text = answer.text.map((el, i) => {
			return (
				<p className="modal-objectif__subtitle" key={i}>
					{el}
				</p>
			);
		});
		return text;
	};

	const validateModal = () => {
		setModal(false);
	};

	const openMedia = () => {
		validateModal();
		setModalMedia(true);
	};

	const renderModalMedia = () => {
		return (
			<Document
				title={answer.title}
				srcElement={urlApi.apiRemi() + answer.src}
				handleModalDocument={() => closeModalMedia(answer.id, answer.ask)}
			/>
		);
	};

	const closeModalMedia = (answerId, asnwerAsk) => {
		const effect = async () => {
			await updateCharactersById(token, 3, currentBox, asnwerAsk);
			await updateHistory(token, currentBox, answerId);
			// API Mettre à jour le status de cette réponse de FALSE à TRUE
			// API Mettre à jour le status de cet élément dans l'Historique avec l'id
		};
		effect().then(console.log("c'est finit")).then(actionToggleDataCeline()).then(setModalMedia(false));
	};

	const catchphrase = [
		"sounds/403-repliques-celine-1.wav",
		"sounds/403-repliques-celine-2.wav",
		"sounds/403-repliques-celine-3.wav",
		"sounds/403-repliques-celine-4.wav",
		"sounds/403-repliques-celine-5.wav",
		"sounds/403-repliques-celine-6.wav",
		"sounds/403-repliques-celine-7.wav",
	];

	const randomNumber = Math.floor(Math.random() * catchphrase.length);

	return (
		<>
			{modal ? renderModal() : ""}
			{modalMedia ? renderModalMedia() : ""}
			<audio autoPlay>
				<source src={urlApi.apiRemi() + catchphrase[randomNumber]} type="audio/wav" />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className="agent">
				<div className="agent__portrait--container">
					<img className="agent__portrait" src={PhotoCeline} />
				</div>
				<div className="agent__main">
					<div className="agent__title--container">
						<p className="agent__title">Quel dossier cherchez vous ?</p>
					</div>
					<div className="agent__errorMessage">{errorMessage}</div>
					<form className="agent__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label="Nom et prénom"
							name="celine"
							placeholder="Ce champ est vide"
							value={value}
							setValue={setValue}
						/>
						<button className="agent__form__button button--red">Valider</button>
					</form>
				</div>
				<button className="agent__closeButton--container" onClick={closeAgentPage}>
					<img src={Cross} className="agent__closeButton" />
				</button>
			</div>
		</>
	);
};

Celine.propTypes = {
	closeAgentPage: PropTypes.func,
};

export default Celine;
