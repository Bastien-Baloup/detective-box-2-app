import PhotoAdele from "../assets/img/Agent_adele.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";
import { BoxContext } from "../utils/context/fetchContext";
import { useContext, useState } from "react";
import { dataAdele } from "../utils/const/dataAdele";

const Adele = ({ closeAgentPage }) => {
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
		const answerInThisBox = dataAdele[currentBox].find((element) => element.ask.includes(slugify(value)));
		const previouslyAnsweredInThisBox = answerInThisBox && answerInThisBox.status;
		// const answerInFailedInterview = dataAdele["generic"].find((element) => slugify(element.ask) == slugify(value));
		const answerInBox2 = dataAdele["box2"].some((element) => element.ask.includes(slugify(value)));
		e.preventDefault();
		if (value == "") {
			setErrorMessage("Je dois bien analyser quelque chose !");
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
		// if (answerInFailedInterview) {
		// 	console.log(answerInFailedInterview);
		// 	setValue("");
		// 	setErrorMessage("");
		// 	return;
		// }
		if (currentBox == "box3" && answerInBox2) {
			console.log("Vous avez déjà analysé cet élément lors d'une box précédente.");
			setValue("");
			setErrorMessage("");
			return;
		}
		console.log("Je n'ai pas pu analyser ce que vous m'avez demandé.");
		setValue("");
		setErrorMessage("");
	};

	const catchphrase = [
		"sounds/405-repliques-adele-1.wav",
		"sounds/405-repliques-adele-2.wav",
		"sounds/405-repliques-adele-3.wav",
		"sounds/405-repliques-adele-4.wav",
		"sounds/405-repliques-adele-5.wav",
		"sounds/405-repliques-adele-6.wav",
		"sounds/405-repliques-adele-7.wav",
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
					<img className="agent__portrait" src={PhotoAdele} />
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
							name="adele"
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

Adele.propTypes = {
	closeAgentPage: PropTypes.func,
};

export default Adele;
