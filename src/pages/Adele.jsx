import PhotoAdele from "../assets/img/Agent_adele.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";
import { urlApi } from "../utils/const/urlApi";

const Adele = ({ value, setValue, closeAgentPage}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
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
	setValue: PropTypes.func,
	value: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Adele;
