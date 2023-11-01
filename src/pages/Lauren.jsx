import PhotoLauren from "../assets/img/Agent_lauren.jpg";
import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
import Audio from "../components/Audio.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext, useState } from "react";
import { dataLauren } from "../utils/const/dataLauren";

const Lauren = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [modal, setModal] = useState(false);
	const [modalMedia, setModalMedia] = useState(false);
	const [answer, setAnswer] = useState("");

	const slugify = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]/g, "");
		return inputSlugified;
	};

	const handleSubmit = (e) => {
		const answerInThisBox = dataLauren[currentBox].find((element) => element.ask.includes(slugify(value)));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInFailedInterview = dataLauren["generic"].find((element) => element.ask.includes(slugify(value)));
		const answerInBox1 = dataLauren["box1"].some((element) => element.ask.includes(slugify(value)));
		const answerInBox2 = dataLauren["box2"].some((element) => element.ask.includes(slugify(value)));
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
		if (currentBox == "box2" && answerInBox1) {
			setValue("");
			setErrorMessage(
				"Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
			);
			return;
		}
		if (currentBox == "box3" && (answerInBox2 || answerInBox1)) {
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
					<p className="modal-objectif__subtitle">{answer.text}</p>
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

	// const renderText = () => {
	// 	const text = answer.text.map((el, i) => {
	// 		return (
	// 			<p className="modal-objectif__subtitle" key={i}>
	// 				{el}
	// 			</p>
	// 		);
	// 	});
	// 	return text;
	// };

	const validateModal = () => {
		setModal(false);
		// API Mettre à jour le status de cette réponse de FALSE à TRUE sauf si c'est generic
	};

	const openMedia = () => {
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
				handleModalAudio={closeModalMedia}
			/>
		);
	};

	const closeModalMedia = () => {
		setModalMedia(false);
		// API Mettre à jour le status de cet élément dans l'Historique avec l'id
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
						currentBox == "box3"
							? urlApi.apiRemi() + catchphraseRaphaelle[randomNumberRaphaelle]
							: urlApi.apiRemi() + catchphraseLauren[randomNumberLauren]
					}
					type="audio/wav"
				/>
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className="agent">
				<div className="agent__portrait--container">
					<img className="agent__portrait" src={currentBox == "box3" ? PhotoRaphaelle : PhotoLauren} />
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
