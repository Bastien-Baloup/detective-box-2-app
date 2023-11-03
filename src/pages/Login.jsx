// EXPLICATION : Page Login qui va afficher les formulaires sign in, sign up et mot de passe oublié

import { useState } from "react";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Logo from "../assets/img/DB-Logo-DetectiveBox_DetectiveBlanc.png";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/hooks/useApi.js";

function Login() {
	const [isSigninActive, setIsSigninActive] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessageSignin, setErrorMessageSignin] = useState("");
	const [errorMessageSignup, setErrorMessageSignup] = useState("");
	const [errorMessageForgot, setErrorMessageForgot] = useState("");
	const [email, setEmail] = useState("");
	const [emailForgot, setEmailForgot] = useState("");
	const credentials = { email: email, password: password };
	// const newaccount = { email: email, password: password, name: username };
	const { login, loggedIn } = useContext(AuthContext);

	// EXPLICATION : Si le joueur est connecté, alors redirection sur le choix des boxs
	if (loggedIn) {
		return <Navigate to="/box-choice" />;
	}

	const handleSubmitSignin = async (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			setErrorMessageSignin("Merci de remplir le formulaire pour vous connecter");
			return;
		}
		const dataToken = await getToken(credentials);
		if (dataToken.status === 200) {
			login(dataToken);
			console.log(dataToken);
		} else {
			console.log(dataToken.status);
		}
		console.log(JSON.stringify(credentials));
	};

	const handleSubmitSignup = (e) => {
		e.preventDefault();
		if (email === "" || password === "" || username === "") {
			setErrorMessageSignup("Merci de remplir le formulaire pour créer un compte");
			return;
		}
		setUsername("");
		setEmail("");
		setPassword("");
		setErrorMessageSignup("");
		//API pour créer compte
		alert("Compte bien créé Agent ");
	};

	// si email exist, renvoyer "Votre compte existe déjà, merci de vous connecter"

	// EXPLICATION : Gérer le formulaire pour le mot de passe oublié
	const handleSubmitEmailForgot = (e) => {
		e.preventDefault();
		if (emailForgot === "") {
			setErrorMessageForgot("Merci de rentrer une adresse mail");
			return;
		}
		setEmailForgot("");
		setErrorMessageForgot("");
		alert("Un nouveau mot de passe vous a été envoyé par mail !");
	};

	// EXPLICATION : A chaque fois qu'on switch de sign in à sign up, alors on reset les states
	const switchToSignup = () => {
		setErrorMessageForgot("");
		setErrorMessageSignin("");
		setErrorMessageSignup("");
		setIsSigninActive(false);
		setUsername("");
		setEmail("");
		setPassword("");
	};
	// EXPLICATION : A chaque fois qu'on switch de sign up à sign in, alors on reset les states
	const switchToSignin = () => {
		setErrorMessageForgot("");
		setErrorMessageSignin("");
		setErrorMessageSignup("");
		setIsSigninActive(true);
		setUsername("");
		setEmail("");
		setPassword("");
	};

	return (
		<main className="login">
			<a className="login__link" href="https://app.detectivebox.fr/connexion">
				&lt; Retour aux choix des scénarios
			</a>
			<img className="login__logo" src={Logo} />
			{isSigninActive ? (
				<Signin
					handleSubmitSignin={handleSubmitSignin}
					errorMessageSignin={errorMessageSignin}
					errorMessageForgot={errorMessageForgot}
					setValueEmail={setEmail}
					valueEmail={email}
					setValuePassword={setPassword}
					valuePassword={password}
					handleSubmitEmailForgot={handleSubmitEmailForgot}
					valueEmailForgot={emailForgot}
					setValueEmailForgot={setEmailForgot}
					switchToSignup={switchToSignup}
				/>
			) : (
				<Signup
					handleSubmitSignup={handleSubmitSignup}
					errorMessageSignup={errorMessageSignup}
					valueUsername={username}
					setValueUsername={setUsername}
					valueEmail={email}
					setValueEmail={setEmail}
					valuePassword={password}
					setValuePassword={setPassword}
					switchToSignin={switchToSignin}
				/>
			)}
		</main>
	);
}
export default Login;
