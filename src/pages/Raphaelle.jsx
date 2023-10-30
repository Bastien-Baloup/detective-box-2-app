import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext, useState } from "react";
import { dataRaphaelle } from "../utils/const/dataRaphaelle";

const Raphaelle = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const [valueAdresse, setValueAdresse] = useState("");
	const [valueLatitude, setValueLatitude] = useState("");
	const [valueLongitude, setValueLongitude] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const slugifyAdresse = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]/g, "");
		return inputSlugified;
	};
	const slugifyGPS = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^0-9]/g, "");
		return inputSlugified;
	};

	const handleSubmit = (e) => {
		const answerInThisBox = (value) => {
			return dataRaphaelle[currentBox].find((element) => element.ask.includes(value));
		};
		const previouslyAnsweredInThisBox = (value) => {
			return answerInThisBox(value) && answerInThisBox(value).status;
		};
		const answerInBox1 = (value) => dataRaphaelle["box1"].some((element) => element.ask.includes(value));
		const answerInBox2 = (value) => dataRaphaelle["box2"].some((element) => element.ask.includes(value));

		e.preventDefault();
		if (valueAdresse != "" && (valueLatitude != "" || valueLongitude != "")) {
			setErrorMessage("Il faut me donner une adresse ou une localisation GPS, pas les deux en même temps !");
			setValueAdresse("");
			setValueLatitude("");
			setValueLongitude("");
			return;
		}
		if (valueAdresse == "" && valueLatitude == "" && valueLongitude == "") {
			setErrorMessage("On n'a pas le temps d'être indécis. Dîtes moi où aller.");
			setValueAdresse("");
			setValueLongitude("");
			setValueLatitude("");
			return;
		}
		if (valueAdresse != "" && valueLatitude == "" && valueLongitude == "") {
			console.log("on créé une adresse");
			let slugifiedAdresse = slugifyAdresse(valueAdresse);
			let regex = /[a-zA-Z]/;
			const doesItHaveLetters = regex.test(slugifiedAdresse);
			if (doesItHaveLetters == false) {
				setErrorMessage("Ce n'est pas une adresse valide.");
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				return;
			}
			if (previouslyAnsweredInThisBox(slugifiedAdresse)) {
				console.log("Vous m'avez dejà demandé d'explorer ce lieu.");
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (answerInThisBox(slugifiedAdresse)) {
				console.log(answerInThisBox(slugifiedAdresse));
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == "box2" && answerInBox1(slugifiedAdresse)) {
				console.log(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == "box3" && (answerInBox2(slugifiedAdresse) || answerInBox1(slugifiedAdresse))) {
				console.log(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
		}

		if ((valueLatitude != "" || valueLongitude != "") && valueAdresse == "") {
			console.log("on créé une GPS");
			let GPS = valueLatitude.concat(valueLongitude);
			let slugifiedGPS = slugifyGPS(GPS);
			if (previouslyAnsweredInThisBox(slugifiedGPS)) {
				console.log("Vous m'avez dejà demandé d'explorer ce lieu.");
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (answerInThisBox(slugifiedGPS)) {
				console.log(answerInThisBox(slugifiedGPS));
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == "box2" && answerInBox1(slugifiedGPS)) {
				console.log(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == "box3" && (answerInBox2(slugifiedGPS) || answerInBox1(slugifiedGPS))) {
				console.log(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
		}

		console.log("Hmm, cet endroit ne me semble pas pertinent.");
		setValueAdresse("");
		setValueLongitude("");
		setValueLatitude("");
		setErrorMessage("");
	};

	const catchphrase = [
		"sounds/401-repliques-raphaelle-1.wav",
		"sounds/401-repliques-raphaelle-2.wav",
		"sounds/401-repliques-raphaelle-3.wav",
		"sounds/401-repliques-raphaelle-4.wav",
		"sounds/401-repliques-raphaelle-5.wav",
		"sounds/401-repliques-raphaelle-6.wav",
		"sounds/401-repliques-raphaelle-7.wav",
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
					<img className="agent__portrait" src={PhotoRaphaelle} />
				</div>
				<div className="agent__main">
					<div className="agent__title--container">
						<p className="agent__title">Où souhaitez-vous aller ?</p>
					</div>
					<div className="agent__errorMessage">{errorMessage}</div>
					<form className="agent__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label="Adresse"
							name="adresse"
							placeholder="Ce champ est vide"
							value={valueAdresse}
							setValue={setValueAdresse}
						/>
						<p>OU</p>
						<Input
							type="texte"
							label="Coordonnées GPS - latitude"
							name="gps"
							placeholder="Ce champ est vide"
							value={valueLatitude}
							setValue={setValueLatitude}
						/>
						<Input
							type="texte"
							label="Coordonnées GPS - longitude"
							name="gps"
							placeholder="Ce champ est vide"
							value={valueLongitude}
							setValue={setValueLongitude}
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

Raphaelle.propTypes = {
	closeAgentPage: PropTypes.func,
};

export default Raphaelle;
