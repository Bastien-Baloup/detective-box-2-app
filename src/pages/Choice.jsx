// Récupérer dans la BDD quelle box a son état OUVERTE = TRUE (OUVERTE / FERMEE / RESOLUE)
// Changer le Context avec la box sélectionnée
import Logo from "../assets/img/DB-Logo-DetectiveBox_AgenceDetectiveBlanc.png";
import Boxchoice from "../components/Boxchoice.jsx";
import Saison1 from "../assets/img/Facing-episode1.png";
import Saison2 from "../assets/img/Facing-episode2.png";
import Saison3 from "../assets/img/Facing-episode3.png";

function Choice() {
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
