import { useState } from "react";
import Input from "./Input";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import PropTypes from "prop-types";

const Signin = ({
	handleSubmitSignin,
	errorMessageSignin,
	errorMessageForgot,
	valueEmailForgot,
	setValueEmailForgot,
	valuePassword,
	setValuePassword,
	handleSubmitEmailForgot,
	valueEmail,
	setValueEmail,
	switchToSignup,
}) => {
	const [modalActive, setModalActive] = useState(false);

	const displayModalForgotPassword = () => {
		return (
			<div className="modal-forgot__background">
				<div className="modal-forgot__box">
					<button className="modal-forgot__icon--container">
						<img className="modal-forgot__icon" src={Cross} onClick={() => setModalActive(false)} />
					</button>
					<h2 className="modal-forgot__title">Renseignez votre adresse email pour changer votre mot de passe</h2>
					<div className="modal-forgot__errorMessage">{errorMessageForgot}</div>
					<form className="modal-forgot__form" onSubmit={handleSubmitEmailForgot}>
						<Input
							type="email"
							label="Adresse email"
							name="forgot"
							placeholder="agent@detectivebox.fr"
							value={valueEmailForgot}
							setValue={setValueEmailForgot}
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
						type="email"
						label="Identifiant"
						name="signin"
						placeholder="agent@detectivebox.fr"
						value={valueEmail}
						setValue={setValueEmail}
					/>
					<Input
						type="password"
						label="Mot de passe"
						name="signin"
						placeholder="********"
						value={valuePassword}
						setValue={setValuePassword}
					/>
					<button className="signin__form__button button--red">Connexion</button>
				</form>
				<button className="signin__forget" onClick={() => setModalActive(true)}>
					Mot de passe oublié ?
				</button>
				<button className="signin__button__signup button--white" onClick={switchToSignup}>
					Créer un compte
				</button>
			</section>
			{modalActive ? displayModalForgotPassword() : ""}
		</>
	);
};

Signin.propTypes = {
	handleSubmitSignin: PropTypes.func,
	errorMessageSignin: PropTypes.string,
	errorMessageForgot: PropTypes.string,
	setValuePassword: PropTypes.func,
	valuePassword: PropTypes.string,
	handleSubmitEmailForgot: PropTypes.func,
	setValueEmail: PropTypes.func,
	valueEmail: PropTypes.string,
	setValueEmailForgot: PropTypes.func,
	valueEmailForgot: PropTypes.string,
	switchToSignup: PropTypes.func,
};

export default Signin;
