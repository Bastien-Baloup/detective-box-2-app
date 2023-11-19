// Page pour faire les requêtes auprès du personnage de Lauren
// Les validations des requêtes sont faites ici

import PhotoLauren from "../assets/img/Agent_lauren.jpg";
import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
import Audio from "../components/Audio.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext, DataContext, AmbianceContext } from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
// import { dataLauren } from "../utils/const/dataLauren";
import { updateCharactersById, updateHistory, getCharactersById, getHistoryByBox } from "../utils/hooks/useApi.js";

const Lauren = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const { fetchPreviousStateNappe } = useContext(AmbianceContext);
	const token = localStorage.getItem("token");
	const { actionToggleDataLauren, toggleDataLauren, toggleDataHistory } = useContext(DataContext);

	//EXPLICATION : Lauren est le personnage "2"

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 2);
			console.log(result);
			setDataLauren(result);
		};
		fetchData();
	}, [toggleDataLauren]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getHistoryByBox(token, 2);
			const box2document6 = result.data.find((event) => event.id == "box2document6");
			setBox2Document6(box2document6.status);
		};
		fetchData();
	}, [toggleDataHistory]);

	const [dataLauren, setDataLauren] = useState(null);
	const [box2document6, setBox2Document6] = useState(false);

	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [modal, setModal] = useState(false);
	const [modalMedia, setModalMedia] = useState(false);
	const [answer, setAnswer] = useState("");

	//EXPLICATION : Fonction pour sortir les joueurs de la page de Lauren si elle vient de se faire enlever (box2document6 dans historique)
	if (currentBox == 2 && box2document6) {
		closeAgentPage();
	}

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
		const thisBox = dataLauren.find((element) => element.box_id == currentBox).data;
		const box1 = dataLauren.find((element) => element.box_id == 1).data;
		const box2 = dataLauren.find((element) => element.box_id == 2).data;
		const generic = dataLauren.find((element) => element.box_id == 4).data;
		const answerInThisBox = thisBox.find((element) => element.ask.includes(slugify(value)));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInFailedInterview = generic.find((element) => element.ask.includes(slugify(value)));
		const answerInBox1 = box1.some((element) => element.ask.includes(slugify(value)));
		const answerInBox2 = box2.some((element) => element.ask.includes(slugify(value)));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Il me faut l'identité de la personne à interroger");
			setValue("");
			return;
		}
		if (previouslyAnsweredInThisBox) {
			setValue("");
			setErrorMessage(
				"Vous m'avez dejà demandé d'interroger cette personne. Rendez-vous dans l'Historique pour réécouter l'interview."
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
				"Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
			);
			return;
		}
		if (currentBox == 3 && (answerInBox2 || answerInBox1)) {
			setValue("");
			setErrorMessage(
				"Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
			);
			return;
		}
		setValue("");
		setErrorMessage("Je n'ai pas pu joindre la personne dont vous me parlez.");
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
		fetchPreviousStateNappe();
		validateModal();
		setModalMedia(true);
	};

	const renderModalMedia = () => {
		return (
			<Audio
				title={answer.title}
				srcImg1={urlApi.apiRemi() + answer.img1}
				srcImg2={urlApi.apiRemi() + answer.img2}
				srcTranscription={urlApi.apiRemi() + answer.srcTranscript}
				srcAudio={urlApi.apiRemi() + answer.srcAudio}
				handleModalAudio={() => closeModalMedia(answer.id, answer.ask)}
			/>
		);
	};

	const closeModalMedia = async (answerId, asnwerAsk) => {
		await updateCharactersById(token, 2, currentBox, asnwerAsk);
		await updateHistory(token, currentBox, answerId);
		if (answerId == "box2audio1") {
			await updateHistory(token, 2, "box2document3");
		}
		actionToggleDataLauren();
		setModalMedia(false);
	};

	const catchphraseLauren = [
		"sounds/402-repliques-lauren-1.wav",
		"sounds/402-repliques-lauren-2.wav",
		"sounds/402-repliques-lauren-3.wav",
		"sounds/402-repliques-lauren-4.wav",
		"sounds/402-repliques-lauren-5.wav",
		"sounds/402-repliques-lauren-6.wav",
		"sounds/402-repliques-lauren-7.wav",
	];
	const catchphraseRaphaelle = [
		"sounds/401-repliques-raphaelle-1.wav",
		"sounds/401-repliques-raphaelle-2.wav",
		"sounds/401-repliques-raphaelle-3.wav",
		"sounds/401-repliques-raphaelle-5.wav",
		"sounds/401-repliques-raphaelle-6.wav",
		"sounds/401-repliques-raphaelle-7.wav",
	];

	const randomNumberLauren = Math.floor(Math.random() * catchphraseLauren.length);
	const randomNumberRaphaelle = Math.floor(Math.random() * catchphraseRaphaelle.length);

	return (
		<>
			{modal ? renderModal() : ""}
			{modalMedia ? renderModalMedia() : ""}
			<audio autoPlay>
				<source
					src={
						currentBox == 3
							? urlApi.apiRemi() + catchphraseRaphaelle[randomNumberRaphaelle]
							: urlApi.apiRemi() + catchphraseLauren[randomNumberLauren]
					}
					type="audio/wav"
				/>
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className="agent">
				<div className="agent__portrait--container">
					<img className="agent__portrait" src={currentBox == 3 ? PhotoRaphaelle : PhotoLauren} />
				</div>
				<div className="agent__main">
					<div className="agent__title--container">
						<p className="agent__title">Qui souhaitez vous interroger ?</p>
					</div>
					<div className="agent__errorMessage">{errorMessage}</div>
					<form className="agent__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label="Nom et prénom"
							name="lauren"
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

Lauren.propTypes = {
	closeAgentPage: PropTypes.func,
};

export default Lauren;
