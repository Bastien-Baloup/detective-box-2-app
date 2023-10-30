import PhotoTim from "../assets/img/Agent_tim.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext, useState } from "react";
import { dataTim } from "../utils/const/dataTim";

const Tim = ({ closeAgentPage }) => {
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
		const answerInThisBox = dataTim[currentBox].find((element) => element.ask.includes(slugify(value)));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		const answerInBox1 = dataTim["box1"].some((element) => element.ask.includes(slugify(value)));
		const answerInBox2 = dataTim["box2"].some((element) => element.ask.includes(slugify(value)));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Vous n'avez rien à me faire analyser ? Je retourne gamer alors.");
			setValue("");
			return;
		}
		if (previouslyAnsweredInThisBox) {
			console.log("Vous m'avez dejà demandé d'analyser cet élément.");
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
		if (currentBox == "box2" && answerInBox1) {
			console.log(
				"Vous avez déjà analysé cet élément lors d'une box précédente. Rendez-vous dans l'Historique pour revoir les résultats."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		if (currentBox == "box3" && (answerInBox2 || answerInBox1)) {
			console.log(
				"Vous avez déjà analysé cet élément lors d'une box précédente. Rendez-vous dans l'Historique pour revoir les résultats."
			);
			setValue("");
			setErrorMessage("");
			return;
		}
		console.log("Nan, j'ai rien sur ce que vous me demandez.");
		setValue("");
		setErrorMessage("");
	};

	const catchphrase = [
		"sounds/404-repliques-tim-1.wav",
		"sounds/404-repliques-tim-2.wav",
		"sounds/404-repliques-tim-3.wav",
		"sounds/404-repliques-tim-4.wav",
		"sounds/404-repliques-tim-5.wav",
		"sounds/404-repliques-tim-6.wav",
		"sounds/404-repliques-tim-7.wav",
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
					<img className="agent__portrait" src={PhotoTim} />
				</div>
				<div className="agent__main">
					<div className="agent__title--container">
						<p className="agent__title">Que souhaitez vous analyser ?</p>
					</div>
					<div className="agent__errorMessage">{errorMessage}</div>
					<form className="agent__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label="Element à analyser"
							name="tim"
							placeholder="Ce champ est vide"
							value={value}
							setValue={setValue}
						/>
						<button className="agent__form__button button--red">Valider</button>
					</form>
				</div>
				<div className="agent__closeButton--container" onClick={closeAgentPage}>
					<img src={Cross} className="agent__closeButton" />
				</div>
			</div>
		</>
	);
};

Tim.propTypes = {
	closeAgentPage: PropTypes.func,
};

export default Tim;
