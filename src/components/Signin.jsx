import { useState } from "react";
import Input from "./Input";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

function Signin({
	handleSubmitSignin,
	errorMessageSignin,
	errorMessageForgot,
	valueUsername,
	setValueUsername,
	valuePassword,
	setValuePassword,
	handleSubmitEmail,
	valueEmail,
	setValueEmail,
	switchToSignup,
}) {
	const [modalActive, setModalActive] = useState(false);

	const displayModalForgotPassword = () => {
		return (
			<div className="modal-forgot__background">
				<div className="modal-forgot__box">
					<img className="modal-forgot__icon" src={Cross} onClick={() => setModalActive(false)} />
					<h2 className="modal-forgot__title">Renseignez votre adresse email pour changer votre mot de passe</h2>
					<div className="modal-forgot__errorMessage">{errorMessageForgot}</div>
					<form className="modal-forgot__form" onSubmit={handleSubmitEmail}>
						<Input
							type="texte"
							label="Adresse email"
							name="forgot"
							placeholder="agent@detectivebox.fr"
							value={valueEmail}
							setValue={setValueEmail}
						/>
						<button className="modal-password__button button--red">Valider</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<>
			<section className="signin">
				<div className="signin__errorMessage">{errorMessageSignin}</div>
				<form className="signin__form" onSubmit={handleSubmitSignin}>
					<Input
						type="texte"
						label="Identifiant"
						name="signin"
						placeholder="agent@detectivebox.fr"
						value={valueUsername}
						setValue={setValueUsername}
					/>
					<Input
						type="texte"
						label="Mot de passe"
						name="signin"
						placeholder="********"
						value={valuePassword}
						setValue={setValuePassword}
					/>
					<button className="signin__form__button button--red">Connexion</button>
				</form>
				<div className="signin__forget" onClick={() => setModalActive(true)}>
					Mot de passe oublié ?
				</div>
				<button className="signin__button__signup button--white" onClick={switchToSignup}>
					Créer un compte
				</button>
			</section>
			{modalActive ? displayModalForgotPassword() : ""}
		</>
	);
}

Signin.propTypes = {
	handleSubmitSignin: PropTypes.func,
	errorMessageSignin: PropTypes.string,
	errorMessageForgot: PropTypes.string,
	setValueUsername: PropTypes.func,
	valueUsername: PropTypes.string,
	setValuePassword: PropTypes.func,
	valuePassword: PropTypes.string,
	handleSubmitEmail: PropTypes.func,
	setValueEmail: PropTypes.func,
	valueEmail: PropTypes.string,
	switchToSignup: PropTypes.func,
};

export default Signin;
