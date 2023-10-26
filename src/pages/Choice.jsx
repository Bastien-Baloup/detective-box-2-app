// Récupérer dans la BDD quelle box a son état OUVERTE = TRUE (OUVERTE / FERMEE / RESOLUE)
// Changer le Context avec la box sélectionnée
import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDetectiveBlanc.png";
import Boxchoice from "../components/Boxchoice.jsx";
import Saison1 from "../assets/img/Facing-episode1.jpg";
import Saison2 from "../assets/img/Facing-episode2.jpg";
import Saison3 from "../assets/img/Facing-episode3.jpg";
import { AuthContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

// ICI METTRE UN CALL API POUR RECUPERER STATE DES BOXS ? ou juste avec url ? //

function Choice() {
	const { loggedIn } = useContext(AuthContext);

	if (!loggedIn) {
		return <Navigate to="/sign-in" />;
	}

	const dataBoxChoiceTest = [
		{
			boxNumber: 1,
			cover: Saison1,
			state: "done",
		},
		{
			boxNumber: 2,
			cover: Saison2,
			state: "open",
		},
		{
			boxNumber: 3,
			cover: Saison3,
			state: "closed",
		},
	];

	const displayBoxChoice = () => {
		return (
			<div className="boxchoice__wrapper">
				{dataBoxChoiceTest.map((box, index) => (
					<Boxchoice data={box} key={`boxChoiceKey-${index}`} />
				))}
			</div>
		);
	};

	return (
		<main className="choice">
			<img className="choice__logo" src={Logo} />
			<h1 className="choice__title">Bienvenue Agents</h1>
			<p className="choice__subtitle">Veuillez sélectionner votre niveau d&apos;avancement</p>
			{displayBoxChoice()}
		</main>
	);
}
export default Choice;
