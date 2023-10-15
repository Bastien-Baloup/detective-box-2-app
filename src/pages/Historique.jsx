// Mettre ici la liste des preuves dont l'état VU = TRUE
// Récupérer via le Context le numéro de la box pour afficher les preuves de la bonne liste correspondante
// --> Q : Afficher tout les assets de toutes les listes dont état VU = TRUE
// ou fonction qui affiche tout les assets des boxs n-1 et n-2 ? <--
// if not logged, redirect to Page de connexion

import { useState } from "react";
import Filter from "../components/Filter";
import Preuve from "../components/Preuve";
import { dataPreuveTest } from "../utils/const/datatHistory";

function Historique() {
	const filtersType = ["Archives", "Document", "Vidéo", "Interrogatoire", "Lieu"];
	const filterBox = ["Box 1", "Box 2", "Box 3"];

	const [selectedFilters, setSelectedFilters] = useState([]);

	const handleFilter = (selectedCategory) => {
		if (selectedFilters.includes(selectedCategory)) {
			let filters = selectedFilters.filter((element) => element !== selectedCategory);
			setSelectedFilters(filters);
		} else {
			setSelectedFilters([...selectedFilters, selectedCategory]);
		}
	};

	return (
		<main className="main__history">
			<div className="filter__wrapper">
				<div className="filter--type__container">
					{filtersType.map((category, index) => (
						<Filter category={category} key={`filterType-${index}`} handleSearch={() => handleFilter(category)} />
					))}
				</div>
				<div className="filter--box__container">
					{filterBox.map((category, index) => (
						<Filter category={category} key={`filterBox-${index}`} handleSearch={() => handleFilter(category)} />
					))}
				</div>
			</div>
			<div className="clue__wrapper">
				{dataPreuveTest.map((clue, index) => (
					<Preuve data={clue} key={`clueKey-${index}`} />
				))}
			</div>
		</main>
	);
}
export default Historique;
