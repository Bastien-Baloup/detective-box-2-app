import Input from "./Input";
import PropTypes from "prop-types";

const Signup = ({
	handleSubmitSignup,
	errorMessageSignup,
	setValueUsername,
	valueUsername,
	valueEmail,
	setValueEmail,
	setValuePassword,
	valuePassword,
	switchToSignin,
}) => {
	return (
		<>
			<section className="signup">
				<div className="signup__errorMessage">{errorMessageSignup}</div>
				<form className="signup__form" onSubmit={handleSubmitSignup}>
					<Input
						type="texte"
						label="Nom d'agent"
						name="signup"
						placeholder="Raphaëlle Sanchez"
						value={valueUsername}
						setValue={setValueUsername}
					/>
					<Input
						type="texte"
						label="Adresse email"
						name="signup"
						placeholder="agent@detectivebox.fr"
						value={valueEmail}
						setValue={setValueEmail}
					/>
					<Input
						type="texte"
						label="Mot de passe"
						name="signup"
						placeholder="********"
						value={valuePassword}
						setValue={setValuePassword}
					/>
					<button className="signup__form__button button--red">Valider</button>
				</form>
				<button className="signup__button__signin button--white" onClick={switchToSignin}>
					Me connecter
				</button>
			</section>
		</>
	);
};

Signup.propTypes = {
	handleSubmitSignup: PropTypes.func,
	errorMessageSignup: PropTypes.string,
	valueUsername: PropTypes.string,
	setValueUsername: PropTypes.func,
	valuePassword: PropTypes.string,
	setValuePassword: PropTypes.func,
	valueEmail: PropTypes.string,
	setValueEmail: PropTypes.func,
	switchToSignin: PropTypes.func,
};

export default Signup;
