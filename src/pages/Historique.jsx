// Mettre ici la liste des preuves dont l'état VU = TRUE
// Récupérer via le Context le numéro de la box pour afficher les preuves de la bonne liste correspondante
// --> Q : Afficher tout les assets de toutes les listes dont état VU = TRUE
// ou fonction qui affiche tout les assets des boxs n-1 et n-2 ? <--
// if not logged, redirect to Page de connexion

import { useState } from "react";
import Filter from "../components/Filter";
import Preuve from "../components/Preuve";
import { dataHistory } from "../utils/const/dataHistory";
import { useNavigate } from "react-router-dom";

function Historique() {
	const filtersType = ["Archive", "Document", "Video", "Audio", "Lieu"];
	const filterBox = ["Box 1", "Box 2", "Box 3"];

	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedBox, setselectedBox] = useState([]);

	// if not logged, redirect to Page de connexion
	const navigate = useNavigate();
	// if (!isLogged) {
	// 	navigate("/sign-in");
	// 	return;
	// }
	// SI contexte vide alors navigate("box-choice");

	// A RECUPERER VIA CONTEXT
	const currentBox = "box3";

	const handleFilterCategory = (selectedFilter) => {
		if (selectedCategory.includes(selectedFilter)) {
			let filters = selectedCategory.filter((element) => element !== selectedFilter);
			setSelectedCategory(filters);
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter]);
		}
	};
	console.log(selectedCategory);

	const handleFilterBox = (selectedFilter) => {
		if (selectedBox.includes(selectedFilter)) {
			let filters = selectedBox.filter((element) => element !== selectedFilter);
			setselectedBox(filters);
		} else {
			setselectedBox([...selectedBox, selectedFilter]);
		}
	};
	console.log(selectedBox);

	const filterClues = (data) => {
		if (selectedCategory.length == 0 && selectedBox.length == 0) {
			return data.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} />);
		}
		if (selectedCategory.length == 0 && selectedBox.length != 0) {
			return data
				.filter((clue) => selectedBox.includes(clue.box))
				.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} />);
		}
		if (selectedBox.length == 0 && selectedCategory.length != 0) {
			return data
				.filter((clue) => selectedCategory.includes(clue.category))
				.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} />);
		}
		return data
			.filter((clue) => selectedCategory.includes(clue.category))
			.filter((clue) => selectedBox.includes(clue.box))
			.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} />);
	};

	const displayClue = () => {
		if (currentBox == "box1") {
			let allClues = [dataHistory["box1"]].flat();
			return filterClues(allClues);
		}
		if (currentBox == "box2") {
			let allClues = [dataHistory["box1"], dataHistory["box2"]].flat();
			return filterClues(allClues);
		}
		if (currentBox == "box3") {
			let allClues = [dataHistory["box1"], dataHistory["box2"], dataHistory["box3"]].flat();
			return filterClues(allClues);
		}
	};

	return (
		<main className="main__history">
			<div className="filter__wrapper">
				<div className="filter--type__container">
					{filtersType.map((category, index) => (
						<Filter category={category} key={`filterType-${index}`} handleSearch={() => handleFilterCategory(category)} />
					))}
				</div>
				<div className="filter--box__container">
					{filterBox.map((category, index) => (
						<Filter category={category} key={`filterBox-${index}`} handleSearch={() => handleFilterBox(category)} />
					))}
				</div>
			</div>
			<div className="clue__wrapper">{displayClue()}</div>
		</main>
	);
}
export default Historique;
