import { useState } from "react";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Logo from "../assets/img/DB-Logo-DetectiveBox_DetectiveBlanc.png";
import { Navigate, useNavigate } from "react-router-dom";

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
	const { login, loggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	if (loggedIn) {
		return <Navigate to="/box-choice" />;
	}

	const handleSubmitSignin = (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			setErrorMessageSignin("Merci de remplir le formulaire pour vous connecter");
			return;
		}
		// setEmail("");
		// setPassword("");
		// setErrorMessageSignin("");
		login(credentials);
		navigate("/box-choice");

		// const handleSubmit = async (e) => {
		// 	e.preventDefault();
		// 	setErrorMessage("");
		// 	if (username === "" || password === "") {
		// 		setErrorMessage("Please fill the form to connect");
		// 		return;
		// 	}

		// 	const credentials = { email: username, password: password };

		// 	const dataToken = await getToken(credentials);
		// 	if (dataToken.status === 200) {
		// 		localStorage.setItem("token", dataToken.body.token);
		// 	} else {
		// 		setErrorMessage(dataToken.message);
		// 	}
		// 	const token = localStorage.getItem("token");
		// 	if (token) {
		// 		dispatch(logIn());
		// 		const dataUser = await getUser(token);
		// 		dispatch(getName(dataUser.body.firstName, dataUser.body.lastName));
		// 	}
		// };
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
		alert("Compte bien créé Agent ");
	};

	const handleSubmitEmailForgot = (e) => {
		e.preventDefault();
		if (emailForgot === "") {
			setErrorMessageForgot("Merci de rentrer une adresse mail");
			return;
		}
		setEmailForgot("");
		setErrorMessageForgot("");
		alert("Votre mot de passe vous a été envoyé par mail !");
	};

	const switchToSignup = () => {
		setErrorMessageForgot("");
		setErrorMessageSignin("");
		setErrorMessageSignup("");
		setIsSigninActive(false);
		setUsername("");
		setEmail("");
		setPassword("");
	};

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
