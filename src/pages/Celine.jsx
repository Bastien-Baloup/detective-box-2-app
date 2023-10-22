import PhotoCeline from "../assets/img/Agent_celine.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";

const Celine = ({ value, setValue, closeAgentPage}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
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
	setValue: PropTypes.func,
	value: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Celine;
