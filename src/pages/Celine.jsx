import PhotoCeline from "../assets/img/Agent_celine.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext, useState } from "react";
import { dataCeline } from "../utils/const/dataCeline";

const Celine = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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
		const answerInThisBox = dataCeline[currentBox].find((element) => slugify(element.ask) == slugify(value));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInFailedInterview = dataCeline["generic"].find((element) => slugify(element.ask) == slugify(value));
		const answerInBox1 = dataCeline["box1"].some((element) => slugify(element.ask) == slugify(value));
		const answerInBox2 = dataCeline["box2"].some((element) => slugify(element.ask) == slugify(value));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Je ne peux pas fouiller les archives sans un nom !");
			setValue("");
			return;
		}
		if (previouslyAnsweredInThisBox) {
			console.log(
				"Vous m'avez dejà demandé le dossier cette personne. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (answerInThisBox) {
			console.log(answerInThisBox);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (answerInFailedInterview) {
			console.log(answerInFailedInterview);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (currentBox == "box2" && answerInBox1) {
			console.log(
				"Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (currentBox == "box3" && (answerInBox2 || answerInBox1)) {
			console.log(
				"Vous avez déjà demandé le dossier de cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour le consulter de nouveau."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		console.log("Je ne trouve pas cette personne.");
		setValue("");
		setErrorMessage("");
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
