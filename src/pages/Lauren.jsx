import PhotoLauren from "../assets/img/Agent_lauren.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

const Lauren = ({ value, setValue, closeAgentPage, url }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
	};

	const catchphrase = [
		"sounds/402-repliques-lauren-1.wav",
		"sounds/402-repliques-lauren-2.wav",
		"sounds/402-repliques-lauren-3.wav",
		"sounds/402-repliques-lauren-4.wav",
		"sounds/402-repliques-lauren-5.wav",
		"sounds/402-repliques-lauren-6.wav",
		"sounds/402-repliques-lauren-7.wav",
	];

	const randomNumber = Math.floor(Math.random() * catchphrase.length);

	return (
		<>
			<audio autoPlay>
				<source src={url + catchphrase[randomNumber]} type="audio/wav" />
				Votre navigateur ne prend pas en charge ce format
			</audio>
			<div className="agent">
				<div className="agent__portrait--container">
					<img className="agent__portrait" src={PhotoLauren} />
				</div>
				<div className="agent__main">
					<div className="agent__title--container">
						<p className="agent__title">Qui souhaitez vous interroger ?</p>
					</div>
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
	setValue: PropTypes.func,
	value: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Lauren;
