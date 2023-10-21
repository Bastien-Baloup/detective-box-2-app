import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Parametres() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	if (localStorage == 0) {
		navigate("/sign-in");
		return;
	}

	const handleSubmitChange = (e) => {
		e.preventDefault();
		if (password === "" && username === "") {
			setErrorMessage("Merci de remplir au moins un champ pour modifier vos informations");
			return;
		}
		setUsername("");
		setPassword("");
		setErrorMessage("");
		alert("Modifications enregistrées");
	};

	return (
		<main className="parametres">
			<Link className="parametres__link" to="/">
				&lt; Retour à l&apos;enquête
			</Link>
			<h1 className="parametres__title">Paramètres</h1>
			<div className="parametres__errorMessage">{errorMessage}</div>
			<form className="parametres__form" onSubmit={handleSubmitChange}>
				<p className="parametres__subtitle">Changer votre nom d&apos;agent</p>
				<Input
					type="texte"
					pattern="\S(.*\S)?"
					label="Nom d'agent"
					name="signup"
					placeholder="Raphaëlle Sanchez"
					value={username}
					setValue={setUsername}
				/>
				<p className="parametres__subtitle">Changer votre mot de passe</p>
				<Input
					type="password"
					label="Mot de passe"
					name="signup"
					placeholder="********"
					value={password}
					setValue={setPassword}
				/>
				<button className="parametres__form__button button--red">Valider</button>
			</form>
		</main>
	);
}
export default Parametres;
