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

	const handleFilterCategory = (selectedFilter) => {
		if (selectedCategory.includes(selectedFilter)) {
			let filters = selectedCategory.filter((element) => element !== selectedFilter);
			setSelectedCategory(filters);
		} else {
			setSelectedCategory([...selectedCategory, selectedFilter]);
		}
	};

	const handleFilterBox = (selectedFilter) => {
		if (selectedBox.includes(selectedFilter)) {
			let filters = selectedBox.filter((element) => element !== selectedFilter);
			setselectedBox(filters);
		} else {
			setselectedBox([...selectedBox, selectedFilter]);
		}
	};

	const filterClues = (data) => {
		if (selectedCategory.length == 0 && selectedBox.length == 0) {
			return data.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} openModal={() => openModal(clue)} />);
		}
		if (selectedCategory.length == 0 && selectedBox.length != 0) {
			return data
				.filter((clue) => selectedBox.includes(clue.box))
				.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} openModal={() => openModal(clue)} />);
		}
		if (selectedBox.length == 0 && selectedCategory.length != 0) {
			return data
				.filter((clue) => selectedCategory.includes(clue.category))
				.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} openModal={() => openModal(clue)} />);
		}
		return data
			.filter((clue) => selectedCategory.includes(clue.category))
			.filter((clue) => selectedBox.includes(clue.box))
			.map((clue, index) => <Preuve data={clue} key={`clueKey2-${index}`} openModal={() => openModal(clue)} />);
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

	const openModal = (clue) => {
		setModal(true);
		setSelectedClue(clue);
	};

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
						<p className="modal-objectif__title">Vous vous êtes sur de vouloir retourner sur le {clue.title} ?</p>
						<button className="modal-objectif__button button--red" onClick={() => window.open(clue.src, "_blank")}>
							Explorer de nouveau
						</button>
					</div>
				</div>
			);
		}
		if (clue.category == "Video") {
			return <Video title={clue.title} srcVideo={urlApi.apiRemi() + clue.src} handleModalVideo={() => setModal(false)} />;
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
