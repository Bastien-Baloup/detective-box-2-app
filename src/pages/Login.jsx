import { useState } from "react";
import { Link } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Logo from "../assets/img/DB-Logo-DetectiveBox_DetectiveBlanc.png";
import { useNavigate } from "react-router-dom";
// Help Rémi. Connecter l'api à tout ça...

function Login() {
	const [isSigninActive, setIsSigninActive] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessageSignin, setErrorMessageSignin] = useState("");
	const [errorMessageSignup, setErrorMessageSignup] = useState("");
	const [errorMessageForgot, setErrorMessageForgot] = useState("");
	const [email, setEmail] = useState("");
	const [emailForgot, setEmailForgot] = useState("");
	const navigate = useNavigate();
	// if (isLogged) {
	// 	return <Navigate to="/home" />;
	// }

	const handleSubmitSignin = (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			setErrorMessageSignin("Merci de remplir le formulaire pour vous connecter");
			return;
		}
		setEmail("");
		setPassword("");
		setErrorMessageSignin("");
		navigate("/box-choice");
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
		navigate("/box-choice");
	};

	const handleSubmitEmailForgot = (e) => {
		e.preventDefault();
		if (emailForgot === "") {
			setErrorMessageForgot("Merci de rentrer une adresse mail");
			return;
		}
		setEmailForgot("");
		setErrorMessageForgot("");
		alert("Vérifiez votre boite mail !");
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
			<Link className="login__link" to="/">
				&lt; Retour aux choix des scénarios
			</Link>
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
