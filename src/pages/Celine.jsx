import PhotoCeline from "../assets/img/Agent_celine.jpg";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

const Celine = ({ value, setValue, closeAgentPage }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
	};

	return (
		<div className="agent">
			<div className="agent__portrait--container">
				<img className="agent__portrait" src={PhotoCeline} />
			</div>
			<div className="agent__main">
				<div className="agent__title--container">
					<p className="agent__title">Quel dossier des archives souhaitez vous voir ?</p>
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
			<div className="agent__closeButton--container" onClick={closeAgentPage}>
				<img src={Cross} className="agent__closeButton" />
			</div>
		</div>
	);
};

Celine.propTypes = {
	setValue: PropTypes.func,
	value: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Celine;
