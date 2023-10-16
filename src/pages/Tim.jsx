import PhotoTim from "../assets/img/TIM_DARK.png";
import Input from "../components/Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

const Tim = ({ value, setValue, closeAgentPage }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ça fait quelque chose");
	};

	return (
		<div className="agent">
			<div className="agent__portrait--container">
				<img className="agent__portrait" src={PhotoTim} />
			</div>
			<div className="agent__main">
				<div className="agent__title--container">
					<p className="agent__title">Que souhaitez vous analyser ?</p>
				</div>
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
	);
};

Tim.propTypes = {
	setValue: PropTypes.func,
	value: PropTypes.string,
	closeAgentPage: PropTypes.func,
};

export default Tim;