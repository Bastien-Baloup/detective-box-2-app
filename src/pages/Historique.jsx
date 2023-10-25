import { useState } from "react";
import Filter from "../components/Filter";
import Preuve from "../components/Preuve";
import { dataHistory } from "../utils/const/dataHistory";
import { useNavigate } from "react-router-dom";
import Document from "../components/Document";
import Audio from "../components/Audio";
import Video from "../components/Video";
import { urlApi } from "../utils/const/urlApi";
import Cross from "../assets/icons/Icon_Cross-white.svg";

function Historique() {
	const filtersType = ["Archive", "Document", "Video", "Audio", "Lieu"];
	const filterBox = ["Box 1", "Box 2", "Box 3"];

	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedBox, setselectedBox] = useState([]);

	const [modal, setModal] = useState(false);
	const [selectedClue, setSelectedClue] = useState("");

	// if not logged, redirect to Page de connexion
	const navigate = useNavigate();
	if (localStorage == 0) {
		navigate("/sign-in");
		return;
	}
	// SI contexte vide alors navigate("box-choice");

	// A RECUPERER VIA CONTEXT
	const currentBox = "box3";

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de catégorie
	const handleFilterCategory = (selectedFilter) => {
		if (selectedCategory.includes(selectedFilter)) {
			let filters = selectedCategory.filter((element) => element !== selectedFilter);
			setSelectedCategory(filters);
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter]);
		}
	};

	// EXPLICATION : cette fonction va créer un nouvel array avec l'ensemble des filtres de box
	const handleFilterBox = (selectedFilter) => {
		if (selectedBox.includes(selectedFilter)) {
			let filters = selectedBox.filter((element) => element !== selectedFilter);
			setselectedBox(filters);
		} else {
			setselectedBox([...selectedBox, selectedFilter]);
		}
	};

	// EXPLICATION : cette fonction va filtrer les data en fonction des arrays filtres créés plus haut
	const filterClues = (data) => {
		if (selectedCategory.length == 0 && selectedBox.length == 0) {
			return data.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
		}
		if (selectedCategory.length == 0 && selectedBox.length != 0) {
			return data
				.filter((clue) => selectedBox.includes(clue.box))
				.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
		}
		if (selectedBox.length == 0 && selectedCategory.length != 0) {
			return data
				.filter((clue) => selectedCategory.includes(clue.category))
				.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
		}
		return data
			.filter((clue) => selectedCategory.includes(clue.category))
			.filter((clue) => selectedBox.includes(clue.box))
			.map((clue, index) => <Preuve data={clue} key={`clueKey-${index}`} openModal={() => openModal(clue)} />);
	};

	// EXPLICATION : cette fonction indique quelle data utiliser en fonction de la current box PUIS elle appelle la fonction filter pour display les bonnes preuves
	// Les preuves des boxs précédentes sont toujours toutes affichées. En revanche, seulement celles dont status = true de la current box sont affichées
	const displayClue = () => {
		if (currentBox == "box1") {
			let cluesCurrentBoxTrue = dataHistory["box1"].filter((clue) => clue.status == true);
			let allClues = [cluesCurrentBoxTrue].flat();
			return filterClues(allClues);
		}
		if (currentBox == "box2") {
			let cluesCurrentBoxTrue = dataHistory["box2"].filter((clue) => clue.status == true);
			let allClues = [dataHistory["box1"], cluesCurrentBoxTrue].flat();
			return filterClues(allClues);
		}
		if (currentBox == "box3") {
			let cluesCurrentBoxTrue = dataHistory["box3"].filter((clue) => clue.status == true);
			let allClues = [dataHistory["box1"], dataHistory["box2"], cluesCurrentBoxTrue].flat();
			return filterClues(allClues);
		}
	};

	const openModal = (clue) => {
		setModal(true);
		setSelectedClue(clue);
	};

	// EXPLICATION : cette fonction indique quelle modale afficher au clic d'une preuve en fonction de sa catégorie
	const displayCorrespondingModal = (clue) => {
		if (clue.category == "Archive") {
			return (
				<Document title={clue.title} srcElement={urlApi.apiRemi() + clue.src} handleModalDocument={() => setModal(false)} />
			);
		}
		if (clue.category == "Document") {
			return (
				<Document title={clue.title} srcElement={urlApi.apiRemi() + clue.src} handleModalDocument={() => setModal(false)} />
			);
		}
		if (clue.category == "Audio") {
			return (
				<Audio
					title={clue.title}
					srcImg1={urlApi.apiRemi() + clue.img1}
					srcImg2={urlApi.apiRemi() + clue.img2}
					srcTranscription={urlApi.apiRemi() + clue.srcTranscript}
					srcAudio={urlApi.apiRemi() + clue.srcAudio}
					handleModalAudio={() => setModal(false)}
				/>
			);
		}
		if (clue.category == "Lieu") {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={() => setModal(false)} />
						</button>
						<p className="modal-objectif__title">Vous êtes sur de vouloir retourner sur le lieu {clue.title} ?</p>
						<button className="modal-objectif__button button--red" onClick={() => window.open(clue.src, "_blank")}>
							Explorer de nouveau
						</button>
					</div>
				</div>
			);
		}
		if (clue.category == "Video") {
			return (
				<Video
					title={clue.title}
					srcVideo={urlApi.apiRemi() + clue.src}
					handleModalVideo={() => setModal(false)}
					delayedButton={false}
				/>
			);
		}
	};

	return (
		<main className="main__history">
			{modal ? displayCorrespondingModal(selectedClue) : null}
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
