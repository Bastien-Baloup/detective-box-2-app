// Page pour faire les requêtes auprès du personnage de Raphaelle
// Les validations des requêtes sont faites ici

import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext, AuthContext } from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
// import { dataRaphaelle } from "../utils/const/dataRaphaelle";
import { updateCharactersById, updateHistory, getCharactersById } from "../utils/hooks/useApi.js";

const Raphaelle = ({ closeAgentPage }) => {
	const { currentBox } = useContext(BoxContext);
	const { token } = useContext(AuthContext);

	//EXPLICATION : Raphaelle est le personnage "4"

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCharactersById(token, 4);
			console.log(result);
			setDataRaphaelle(result);
		};
		fetchData();
	}, [token, currentBox]);

	const [valueAdresse, setValueAdresse] = useState("");
	const [valueLatitude, setValueLatitude] = useState("");
	const [valueLongitude, setValueLongitude] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [modal, setModal] = useState(false);
	const [answer, setAnswer] = useState("");
	const [dataRaphaelle, setDataRaphaelle] = useState(null);

	// EXPLICATION : Fonction pour slugifier l'input Adresse des joueurs (lettre et chiffres ok)
	const slugifyAdresse = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]/g, "");
		return inputSlugified;
	};

	// EXPLICATION : Fonction pour slugifier l'input GPS des joueurs (seulement )
	const slugifyGPS = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^0-9]/g, "");
		return inputSlugified;
	};

	// EXPLICATION : Les réponses peuvent être trouvées dans la box actuelle ou les boxs précédentes
	// EXPLICATION : Les réponses du personnage dépendent de la location de la réponse (box précedente ou box actuelle) et du status de la réponse (déjà demandé ou pas)
	// EXPLICATION : Pour rappel, Raphaëlle est le seul personnage qui a deux champs (adresse et GPS(latitude et longitude))
	const handleSubmit = (e) => {
		const thisBox = dataRaphaelle.find((element) => element.box_id == currentBox).data;
		const box1 = dataRaphaelle.find((element) => element.box_id == 1).data;
		const box2 = dataRaphaelle.find((element) => element.box_id == 2).data;
		const answerInThisBox = (value) => {
			return thisBox.find((element) => element.ask.includes(value));
		};
		const previouslyAnsweredInThisBox = (value) => {
			return answerInThisBox(value) && answerInThisBox(value).status;
		};
		const answerInBox1 = (value) => box1.some((element) => element.ask.includes(value));
		const answerInBox2 = (value) => box2.some((element) => element.ask.includes(value));

		e.preventDefault();
		// EXPLICATION : si les deux champs sont remplis, message d'erreur
		if (valueAdresse != "" && (valueLatitude != "" || valueLongitude != "")) {
			setErrorMessage("Il faut me donner une adresse ou une localisation GPS, pas les deux en même temps !");
			setValueAdresse("");
			setValueLatitude("");
			setValueLongitude("");
			return;
		}
		// EXPLICATION : si aucun des champs n'est rempli, message d'erreur
		if (valueAdresse == "" && valueLatitude == "" && valueLongitude == "") {
			setErrorMessage("On n'a pas le temps d'être indécis. Dîtes moi où aller.");
			setValueAdresse("");
			setValueLongitude("");
			setValueLatitude("");
			return;
		}
		// EXPLICATION : si uniquement le champ adresse est rempli
		if (valueAdresse != "" && valueLatitude == "" && valueLongitude == "") {
			let slugifiedAdresse = slugifyAdresse(valueAdresse);
			// EXPLICATION : Verifie que l'adresse contient au moins une lettre, sinon les joueurs peuvent rentrer les coordonnées GPS dans le champ adresse
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
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("Vous m'avez dejà demandé d'explorer ce lieu.");
				return;
			}
			if (answerInThisBox(slugifiedAdresse)) {
				setAnswer(answerInThisBox(slugifiedAdresse));
				setModal(true);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == 2 && answerInBox1(slugifiedAdresse)) {
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				return;
			}
			if (currentBox == 3 && (answerInBox2(slugifiedAdresse) || answerInBox1(slugifiedAdresse))) {
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				return;
			}
		}
		// EXPLICATION : si uniquement les champs latitude et longitude sont remplis
		if ((valueLatitude != "" || valueLongitude != "") && valueAdresse == "") {
			let GPS = valueLatitude.concat(valueLongitude);
			let slugifiedGPS = slugifyGPS(GPS);
			if (previouslyAnsweredInThisBox(slugifiedGPS)) {
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("Vous m'avez dejà demandé d'explorer ce lieu.");
				return;
			}
			if (answerInThisBox(slugifiedGPS)) {
				setAnswer(answerInThisBox(slugifiedGPS));
				setModal(true);
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage("");
				return;
			}
			if (currentBox == 2 && answerInBox1(slugifiedGPS)) {
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				return;
			}
			if (currentBox == 3 && (answerInBox2(slugifiedGPS) || answerInBox1(slugifiedGPS))) {
				setValueAdresse("");
				setValueLongitude("");
				setValueLatitude("");
				setErrorMessage(
					"Vous avez déjà visité ce lieu lors d'une box précédente. Rendez-vous dans l'Historique pour le visiter de nouveau."
				);
				return;
			}
		}
		setValueAdresse("");
		setValueLongitude("");
		setValueLatitude("");
		setErrorMessage("Hmm, cet endroit ne me semble pas pertinent.");
	};

	const renderModal = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<div>{renderText()}</div>
					{answer.id ? (
						<button className="modal-objectif__button button--red" onClick={() => openLieu(answer.id, answer.ask)}>
							Explorer le lieu
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

	const openLieu = async (answerId, asnwerAsk) => {
		window.open(answer.src + "/?token=" + token, "_blank");
		validateModal();
		await updateHistory(token, currentBox, answerId);
		await updateCharactersById(token, 4, currentBox, asnwerAsk);
		// API Mettre ce lieu de fouille dans l'Historique
		// API Mettre à jour le status de cette réponse de FALSE à TRUE
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
			{modal ? renderModal() : ""}
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
