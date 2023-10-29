import PhotoLauren from "../assets/img/Agent_lauren.jpg";
import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
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
		const answerInThisBox = dataLauren[currentBox].find((element) => slugify(element.ask) == slugify(value));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInFailedInterview = dataLauren["generic"].find((element) => slugify(element.ask) == slugify(value));
		const answerInBox1 = dataLauren["box1"].some((element) => slugify(element.ask) == slugify(value));
		const answerInBox2 = dataLauren["box2"].some((element) => slugify(element.ask) == slugify(value));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Il me faut l'identité de la personne à interroger");
			return;
		}
		if (previouslyAnsweredInThisBox) {
			console.log(
				"Vous m'avez dejà demandé d'interroger cette personne. Rendez-vous dans l'Historique pour réécouter l'interview."
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
				"Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (currentBox == "box3" && (answerInBox2 || answerInBox1)) {
			console.log(
				"Vous avez déjà interrogé cette personne lors d'une box précédente. Rendez-vous dans l'Historique pour réécouter l'interview."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		console.log("Je n'ai pas pu joindre la personne dont vous me parlez.");
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
