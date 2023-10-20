import PhotoRaphaelle from "../assets/img/Agent_raphaelle.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

const Raphaelle = ({
	valueAdresse,
	setValueAdresse,
	valueLatitude,
	setValueLatitude,
	valueLongitude,
	setValueLongitude,
	closeAgentPage,
	url
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
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
				<source src={url + catchphrase[randomNumber]} type="audio/wav" />
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
	setValueAdresse: PropTypes.func,
	valueAdresse: PropTypes.string,
	setValueLatitude: PropTypes.func,
	valueLatitude: PropTypes.string,
	setValueLongitude: PropTypes.func,
	valueLongitude: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Raphaelle;
