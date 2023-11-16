// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from "prop-types";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Input from "./Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import Video from "../components/Video";
import Document from "../components/Document";
import Audio from "../components/Audio";
import { urlApi } from "../utils/const/urlApi";
// import { dataHelp } from "../utils/const/dataHelp";
import { useNavigate } from "react-router-dom";
import { BoxContext, DataContext, AmbianceContext } from "../utils/context/fetchContext";
import { useContext } from "react";
import {
	updateHelp,
	getEventByBox,
	updateEvent,
	getHistoryByBox,
	getHelpByBox,
	updateHistory,
	updateObjectives,
	updateBox,
	getObjectivesByBox,
	updateTimeEndBox,
} from "../utils/hooks/useApi.js";

const Objectif = ({ data }) => {
	const [modal, setModal] = useState(false);
	const [modalAnswer, setModalAnswer] = useState(false);
	const [modalAnswerBis, setModalAnswerBis] = useState(false);
	const [modalBis, setModalBis] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [value, setValue] = useState("");
	const [nextStep, setNextStep] = useState(false);

	const { currentBox } = useContext(BoxContext);
	const token = localStorage.getItem("token");
	const { fetchPreviousStateNappe } = useContext(AmbianceContext);
	const {
		actionToggleDataEvent,
		toggleDataEvent,
		actionToggleDataHelp,
		toggleDataHelp,
		actionToggleDataHistory,
		toggleDataHistory,
		actionToggleDataObjectif,
		toggleDataObjectif,
	} = useContext(DataContext);

	const navigate = useNavigate();

	let event13 = useRef("");
	let event14 = useRef("");
	let event15 = useRef("");
	// const [event13, setEvent13] = useState("");
	// const [event14, setEvent14] = useState("");
	// const [event15, setEvent15] = useState("");
	const [event23, setEvent23] = useState("");
	const [event25, setEvent25] = useState("");
	const [event35, setEvent35] = useState("");

	const [box1lieu2, setBox1Lieu2] = useState(false);
	const [box2lieu1, setBox2Lieu1] = useState(false);
	const [box2video5, setBox2Video5] = useState(false);
	const [box3audio3, setBox3Audio3] = useState(false);
	const [box3lieu2, setBox3Lieu2] = useState(false);
	const [box3lieu3, setBox3Lieu3] = useState(false);

	const [box3help4, setBox3Help4] = useState("");

	let objectif33 = useRef("");
	const [objectif11, setObjectif11] = useState("");
	const [objectif12, setObjectif12] = useState("");
	const [objectif13, setObjectif13] = useState("");
	// const [objectif33, setObjectif33] = useState("");
	const [objectif34, setObjectif34] = useState("");

	const [objectifs, setObjectifs] = useState();
	console.log(objectifs);
	// const objectif12 = objectifs?.data.find((event) => event.id == 12).status;
	// const objectif13 = objectifs?.data.find((event) => event.id == 13).status;
	// const objectif11 = objectifs?.data.find((event) => event.id == 11).status;
	// const objectif33 = objectifs?.data.find((event) => event.id == 33).status;
	// const objectif34 = objectifs?.data.find((event) => event.id == 34).status;
	// console.log(objectif12);

	const [events, setEvent] = useState();
	console.log(events);

	// EXPLICATION : Fonction pour récupérer l'état des événements
	useLayoutEffect(() => {
		const fetchData = async () => {
			const events = await getEventByBox(token, currentBox);
			setEvent(events);
			if (events != undefined) {
				if (currentBox === 1) {
					const event13Data = events.data.find((event) => event.id === 13);
					// setEvent13(event13Data.status);
					event13.current = event13Data.status;
					console.log(event13Data);
					const event14Data = events.data.find((event) => event.id === 14);
					// setEvent14(event14Data.status);
					event14.current = event14Data.status;
					console.log(event14Data);
					const event15Data = events.data.find((event) => event.id === 15);
					// setEvent15(event15Data.status);
					event15.current = event15Data.status;
					console.log(event15Data);
				}
				if (currentBox === 2) {
					const event23Data = events.data.find((event) => event.id === 23);
					setEvent23(event23Data.status);
					const event25Data = events.data.find((event) => event.id === 25);
					setEvent25(event25Data.status);
				}
				if (currentBox === 3) {
					const event35Data = events.data.find((event) => event.id === 35);
					setEvent35(event35Data.status);
				}
			}
		};
		fetchData();
	}, [toggleDataEvent]);

	//EXPLICATION : UseEffect pour déclencher les evenements entre les différents composants
	useEffect(() => {
		if (currentBox == 2) {
			// EXPLICATION : Pour faire le lien entre le composant Home (carte Lauren) et ici
			console.log(event25);
			if (event25 == "open" && box2video5 == false) {
				setVideoBureauLauren(true);
				fetchPreviousStateNappe();
			}
		}
		if (currentBox == 3) {
			// EXPLICATION : Pour faire le lien entre le composant Header (timer) et ici
			if (event35 == "open") {
				setTempsEcoule(true);
			}
		}
	}, [toggleDataEvent]);

	// EXPLICATION : Fonction pour récupérer l'état de l'historique
	useEffect(() => {
		const fetchData = async () => {
			const clues = await getHistoryByBox(token, currentBox);
			if (currentBox == 1) {
				const box1lieu2Data = clues.data.find((event) => event.id == "box1lieu2");
				setBox1Lieu2(box1lieu2Data.status);
			}
			if (currentBox == 2) {
				const box2lieu1Data = clues.data.find((event) => event.id == "box2lieu1");
				setBox2Lieu1(box2lieu1Data.status);
				const box2video5Data = clues.data.find((event) => event.id == "box2video5");
				setBox2Video5(box2video5Data.status);
			}
			if (currentBox == 3) {
				const box3audio3Data = clues.data.find((event) => event.id == "box3audio3");
				setBox3Audio3(box3audio3Data.status);
				const box3lieu2Data = clues.data.find((event) => event.id == "box3lieu2");
				setBox3Lieu2(box3lieu2Data.status);
				const box3lieu3Data = clues.data.find((event) => event.id == "box3lieu3");
				setBox3Lieu3(box3lieu3Data.status);
			}
		};
		fetchData();
	}, [toggleDataHistory]);

	// EXPLICATION : Fonction pour récupérer l'état des renforts (help)
	useEffect(() => {
		const fetchData = async () => {
			const help = await getHelpByBox(token, currentBox);
			if (currentBox == 3) {
				const box3help4Data = help.data.find((event) => event.id == "box3help4");
				setBox3Help4(box3help4Data.status);
			}
		};
		fetchData();
	}, [toggleDataHelp]);

	// EXPLICATION : UseEffect pour récupérer l'état des objectifs
	useEffect(() => {
		const fetchData = async () => {
			const objectifs = await getObjectivesByBox(token, currentBox);
			setObjectifs(objectifs);
			if (currentBox == 1) {
				const objectif12Data = objectifs.data.find((event) => event.id == 12);
				setObjectif12(objectif12Data.status);
				const objectif11Data = objectifs.data.find((event) => event.id == 11);
				setObjectif11(objectif11Data.status);
				const objectif13Data = objectifs.data.find((event) => event.id == 13);
				setObjectif13(objectif13Data.status);
			}
			if (currentBox == 3) {
				const objectif33Data = objectifs.data.find((event) => event.id == 33);
				objectif33.current = objectif33Data.status;
				console.log(objectif33Data);
				const objectif34Data = objectifs.data.find((event) => event.id == 34);
				setObjectif34(objectif34Data.status);
			}
		};
		fetchData();
	}, [toggleDataObjectif]);

	//EXPLICATION : UseEffect pour avoir les event sur les lieux de fouille
	let es = useRef(null);

	useEffect(() => {
		console.log(es.current);
		if (es.current) {
			return;
		}
		es.current = new EventSource("https://sse.detectivebox.remimichel.fr/stream?token=" + token);
		es.current.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			console.log(data.id);
			console.log(objectif33.current);
			if (data.id === "box1document1" && event13.current == "closed") {
				setModaleMalle(true);
			}
			if (data.id === "box1video2" && event14.current == "closed") {
				setModaleVHS(true);
			}
			if (data.id === "box1document6" && event15.current == "closed") {
				setModaleInterrogatoireGarraud(true);
			}
			// if (data.id === "box2document6" && currentBox === 2) {
			// 	actionToggleDataHistory();
			// }
			if (data.id === "box2document4" && event23 == "closed") {
				setMailLauren1(true);
			}
			if (data.id === "box3document2" && objectif33.current == "closed") {
				const updateApp = async () => {
					console.log("on passe dans la fonction");
					await updateObjectives(token, 3, 33, "open");
					await updateObjectives(token, 3, 34, "open");
					actionToggleDataObjectif();
					await updateHelp(token, 3, "box3help2", "closed");
					await updateHelp(token, 3, "box3help3", "open");
					await updateHelp(token, 3, "box3help6", "open");
					actionToggleDataHelp();
				};
				updateApp();
			}
		});
		es.current.addEventListener("error", () => {
			es.current.close();
		});
	}, []);

	// EXPLICATION : VERSION POLLING

	// const startHistoryPolling = async () => {
	// 	setInterval(async () => {
	// 		const data = await getHistories(token, [
	// 			"box1document1",
	// 			"box1document6",
	// 			"box1video2",
	// 			"box2document6",
	// 			"box3document2",
	// 			"box2document4",
	// 		]).then((res) => res.json());
	// 		if (data["box1document1"] && event13 == "closed") {
	// 			setModaleMalle(true);
	// 			actionTogglePolling(false);
	// 			await updateEvent(token, 1, 13, "done");
	// 		}
	// 		console.log(event14);
	// 		if (data["box1video2"] && event14 == "closed") {
	// 			setModaleVHS(true);
	// 			actionTogglePolling(false);
	// 			// await updateEvent(token, 1, 14, "done");
	// 			// setEvent14("done");
	// 		}
	// 		if (data["box1document6"] && event15 == "closed") {
	// 			setModaleInterrogatoireGarraud(true);
	// 			actionTogglePolling(false);
	// 			// await updateEvent(token, 1, 15, "done");
	// 		}
	// 		// if (data["box2document6"] && currentBox === 2) {
	// 		// 	actionToggleDataHistory();
	// 		//     actionTogglePolling(false);
	// 		// }
	// 		if (data["box2document4"] && event23 == "closed") {
	// 			setMailLauren1(true);
	// 			actionTogglePolling(false);
	// 			await updateEvent(token, 2, 23, "done");
	// 		}
	// 		if (data["box3document2"] && objectif33 == "closed") {
	// 			await updateObjectives(token, 3, 33, "open");
	// 			await updateObjectives(token, 3, 34, "open");
	// 			await updateHelp(token, 3, "box3help3", "open");
	// 			await updateHelp(token, 3, "box3help6", "open");
	// 			actionTogglePolling(false);
	// 			//toggleObjectives ? toggleHelp ?
	// 		}
	// 	}, 5000);
	// };

	// useEffect(() => {
	// 	console.log(togglePolling);
	// 	if (togglePolling == true) {
	// 		// const events = await getEventByBox(token, currentBox);
	// 		// const clues = await getHistoryByBox(token, currentBox);
	// 		// const help = await getHelpByBox(token, currentBox);
	// 		// const objectifs = await getObjectivesByBox(token, currentBox);
	// 		// setHistory(clues);
	// 		// setEvents(events);
	// 		// setRenforts(help);
	// 		// setObjectifs(objectifs);
	// 		startHistoryPolling();
	// 	}
	// }, [togglePolling]);

	// --- CONDITIONS SPE OBJECTIF 14 --- //

	const [victime1, setVictime1] = useState("");
	const [victime2, setVictime2] = useState("");
	const [victime3, setVictime3] = useState("");
	const [victime4, setVictime4] = useState("");
	const [victime5, setVictime5] = useState("");
	const [victime6, setVictime6] = useState("");

	const getVictimesValue = () => {
		let allVictimes = [victime1, victime2, victime3, victime4, victime5, victime6];
		setValue(allVictimes);
	};

	const handleSubmit14 = () => {
		getVictimesValue();
		if (JSON.stringify(data.answer) == JSON.stringify(value)) {
			setErrorMessage("");
			setValue("");
			setModal(false);
			setModalAnswer(true);
			return;
		} else {
			setErrorMessage(data.errorMessage);
		}
	};

	// --- CONDITIONS SPE OBJECTIF 21 --- //

	const [intVictimes, setIntVictimes] = useState({
		"Aaron King": false,
		"Ainmire Oconradh": false,
		"Annelijn Dikboom": false,
		"Annina Kurschner": false,
		"Augustas Alsys": false,
		"Bogdana Nikol": false,
		"Daisy Vandenbulcke": false,
		"Dimosthenis Rigas": false,
		"Dominik Jele": false,
		"Edvard Kallio": false,
		"Elias Varelas": false,
		"Elimena Furino": false,
		"Eliza Gaewska": false,
		"Ere Jakobson": false,
		"Horasiu Prunea": false,
		"Imelda Tuzzolino": false,
		"Ivar Mortensen": false,
		"Janina Muster": false,
		"Jörn Frenzel": false,
		"Karina Galicka": false,
		"Konstantin Wallner": false,
		"Lina Syren": false,
		"Marian Bilek": false,
		"Marike Vonbraun": false,
		"Petar Cojocaru": false,
		"Riano Della Valle": false,
		"Taneli Tuominen": false,
		"Timo Sladie": false,
	});

	const getIntVictimesValue = () => {
		let allIntVictimesTrue = Object.keys(intVictimes).filter((el) => {
			return intVictimes[el];
		});
		setValue(allIntVictimesTrue);
	};

	const handleSubmit21 = () => {
		if (value.length > 8) {
			setErrorMessage(
				"Il nous faut éliminer encore des victimes si l'on veut avancer dans l'enquête et revenir voir Garraud avec de nouveaux éléments…"
			);
			return;
		}
		if (value.length < 8) {
			setErrorMessage(
				"Vous y êtes allés un peu fort sur ce premier tri ! On devrait en garder plus pour être certain de ne pas en oublier en route"
			);
			return;
		}
		if (JSON.stringify(data.answer) == JSON.stringify(value)) {
			setErrorMessage("");
			setValue("");
			setModal(false);
			setModalAnswer(true);
			return;
		} else {
			setErrorMessage(data.errorMessage);
		}
	};

	const toggleIntVictime = (el) => {
		if (intVictimes[el] == false) {
			setIntVictimes((prevState) => ({ ...prevState, [el]: true }));
		} else {
			setIntVictimes((prevState) => ({ ...prevState, [el]: false }));
		}
		getIntVictimesValue();
	};

	// --- CONDITIONS SPE OBJECTIF 23 --- //

	const [finalVictimes, setFinalVictimes] = useState({
		"Aaron King": false,
		"Annina Kurschner": false,
		"Daisy Vandenbulcke": false,
		"Elimena Furino": false,
		"Horasiu Prunea": false,
		"Jörn Frenzel": false,
		"Konstantin Wallner": false,
		"Riano Della Valle": false,
	});

	const getFinalVictimesValue = () => {
		let allFinalVictimesTrue = Object.keys(finalVictimes).filter((el) => {
			return finalVictimes[el];
		});
		setValue(allFinalVictimesTrue);
	};

	const handleSubmit23 = () => {
		console.log(value);
		console.log(data.answer);
		if (value.length > 5 || value.length < 5) {
			setErrorMessage("Nous avons 5 cartes, il nous faut 5 victimes");
			return;
		}
		if (JSON.stringify(data.answer) == JSON.stringify(value)) {
			setErrorMessage("");
			setValue("");
			setModal(false);
			setModalAnswer(true);
			return;
		} else {
			setErrorMessage(data.errorMessage);
		}
	};

	const toggleFinalVictime = (el) => {
		if (finalVictimes[el] == false) {
			setFinalVictimes((prevState) => ({ ...prevState, [el]: true }));
		} else {
			setFinalVictimes((prevState) => ({ ...prevState, [el]: false }));
		}
		getFinalVictimesValue();
	};

	// -- CONDITIONS SPE OBJECTIF 33 -- //

	const [victimeSaved, setVictimeSaved] = useState("");

	const handleVictimeChoice = (choice) => {
		setVictimeSaved(choice);
		setModal(false);
		setModalAnswer(true);
	};

	const handleFinalStep = async () => {
		setModalAnswer(false);
		setModalBis(!modalBis);
		setNextStep(true);
		await updateHelp(token, 3, "box3help4", "done");
		await updateHelp(token, 3, "box3help5", "open");
		await updateEvent(token, 3, 33, "open");
		actionToggleDataHelp();
		actionToggleDataEvent();
	};

	const handleSubmitCity = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		if (slugify(value) == "milan" && victimeSaved == "maria") {
			setErrorMessage(
				"Bon, j'ai fait quelques recherches rapidement sur cette Maria Gruber... malheureusement c'est un prénom très répandu, surtout en Autriche, difficile de cibler correctement l'endroit qu'on cherche... mais ça vous aidera peut-être"
			);
		}
		if (slugify(value) == "milan" && victimeSaved == "giuseppe") {
			setMauvaiseFin1(true);
		}
		if (slugify(value) == "graz" && victimeSaved == "maria") {
			setResolution(true);
		}
		if (slugify(value) == "graz" && victimeSaved == "giuseppe") {
			setMauvaiseFin2(true);
		} else {
			setErrorMessage("Je ne trouve aucune personne à se nom dans cette ville. On doit s'être trompé quelque part");
		}
	};

	// -- GENERIQUE -- //

	const handleModal = () => {
		setModal(!modal);
		setErrorMessage("");
		setValue("");
	};

	const handleModalBis = () => {
		setModalBis(!modalBis);
		setErrorMessage("");
		setValue("");
	};

	const slugify = (input) => {
		let inputSlugified = input
			.replace(/\s/g, "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]/g, "");
		return inputSlugified;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.id == 31) {
			if (slugify(value) == "aussichtspavillion" || slugify(value) == "wutoschingen") {
				setErrorMessage("Je pense qu'on approche, mais elle parle d'un lieu préhistorique, non ?");
				setValue("");
				return;
			}
		}
		if (data.id == 32) {
			if (slugify(value) == "arbailles" || slugify(value) == "arbaille") {
				setErrorMessage(
					"La forêt des Arbailles... C'est grand. Il me faudrait plus d'informations, quelque chose qui m'aiderait à situer un point dans la forêt. Peut-être que Lauren savait ?"
				);
				setValue("");
				return;
			}
		}
		if (data.id == 34) {
			if (data.answer.includes(slugify(value))) {
				if (box3help4 == "open") {
					setErrorMessage("");
					setValue("");
					setModal(false);
					setModalAnswer(true);
					return;
				}
				if (box3lieu2 == true) {
					setErrorMessage("Cet arbre généalogique ne joue pas en sa faveur, mais ça ne veut pas tout dire.");
					setValue("");
					return;
				}
				if (box3audio3 == true) {
					setErrorMessage("Si on allait plutôt chez elle pour voir de quoi il en retourne ?");
					setValue("");
					return;
				} else {
					setErrorMessage("C'est un peu léger d'inculper quelqu'un avec le peu d'infos qu'on a");
					setValue("");
					return;
				}
			} else {
				setErrorMessage(data.errorMessage);
				setValue("");
			}
		}
		if (data.answer.includes(slugify(value))) {
			if (data.id == 11) {
				await updateHistory(token, 1, "box1document3");
				actionToggleDataHistory();
				console.log("document 3 dans l'historique !");
			}
			if (data.id == 13 && box1lieu2 == false) {
				console.log(box1lieu2);
				setErrorMessage("Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste");
				setValue("");
				return;
			}
			setErrorMessage("");
			setValue("");
			setModal(false);
			setModalAnswer(true);
			return;
		} else {
			setErrorMessage(data.errorMessage);
			setValue("");
		}
	};

	const handleModalAnswer = async () => {
		if (data.newdetail) {
			setModalAnswer(false);
			setModalBis(true);
			setNextStep(true);
		} else {
			setModalAnswer(false);
			if (data.id == 12) {
				await updateObjectives(token, 1, 12, "done");
				actionToggleDataObjectif();
				await updateHelp(token, 1, "box1help2", "done");
				actionToggleDataHelp();
				console.log(objectif13, objectif11);
				if (objectif11 == "done" && objectif13 == "done") {
					await updateObjectives(token, 1, 14, "open");
					actionToggleDataObjectif();
					await updateHelp(token, 1, "box1help4", "open");
					actionToggleDataHelp();
				}
				setModaleHacking(true);
				await updateHistory(token, 1, "box1document5");
				actionToggleDataHistory();
				console.log("objectif12 terminé");
			}
			if (data.id == 13) {
				await updateObjectives(token, 1, 13, "done");
				actionToggleDataObjectif();
				await updateHelp(token, 1, "box1help3", "done");
				actionToggleDataHelp();
				if (objectif11 == "done" && objectif12 == "done") {
					await updateObjectives(token, 1, 14, "open");
					actionToggleDataObjectif();
					await updateHelp(token, 1, "box1help4", "open");
					actionToggleDataHelp();
				}
				console.log("objectif13 terminé");
			}
			if (data.id == 14) {
				await updateObjectives(token, 1, 14, "done");
				await updateHelp(token, 1, "box1help4", "done");
				actionToggleDataObjectif();
				actionToggleDataHelp();
				console.log("objectif14 terminé");
			}
			if (data.id == 21) {
				await updateObjectives(token, 2, 21, "done");
				await updateHelp(token, 2, "box2help1", "done");
				setAudioSamuel(true);
				fetchPreviousStateNappe();
				await updateHistory(token, 2, "box2audio3");
				actionToggleDataHistory();
				actionToggleDataObjectif();
				actionToggleDataHelp();
				console.log("objectif21 terminé");
			}
			if (data.id == 23) {
				await updateObjectives(token, 2, 23, "done");
				await updateHelp(token, 2, "box2help3", "done");
				await updateObjectives(token, 2, 24, "open");
				await updateHelp(token, 2, "box2help4", "open");
				setMailLauren2(true);
				actionToggleDataObjectif();
				actionToggleDataHelp();
				await updateHistory(token, 2, "box2document9");
				actionToggleDataHistory();
				console.log("objectif23 terminé");
			}
			if (data.id == 24) {
				await updateObjectives(token, 2, 24, "done");
				await updateHelp(token, 2, "box2help4", "done");
				await updateHelp(token, 2, "box2help5", "open");
				actionToggleDataObjectif();
				actionToggleDataHelp();
				console.log("objectif24 terminé");
			}
			if (data.id == 31) {
				await updateObjectives(token, 3, 31, "done");
				await updateHelp(token, 3, "box3help1", "done");
				actionToggleDataObjectif();
				actionToggleDataHelp();
				console.log("objectif31 terminé");
			}
			if (data.id == 32) {
				await updateObjectives(token, 3, 32, "done");
				actionToggleDataObjectif();
				console.log("objectif32 terminé");
			}
			if (data.id == 34) {
				await updateObjectives(token, 3, 34, "done");
				await updateHelp(token, 3, "box3help6", "done");
				actionToggleDataObjectif();
				actionToggleDataHelp();
				console.log("objectif34 terminé");
			}
			if (data.id == 33) {
				await updateHelp(token, 3, "box3help4", "done");
				actionToggleDataHelp();
				console.log("objectif33 etape 1 terminé");
			}
		}
	};

	const handleSubmitBis = (e) => {
		e.preventDefault();
		if (data.newanswer.includes(slugify(value))) {
			setErrorMessage("");
			setValue("");
			setModalBis(false);
			setModalAnswerBis(true);
			return;
		} else {
			setErrorMessage(data.newerrorMessage);
			setValue("");
		}
	};

	const handleModalAnswerBis = async () => {
		setModalAnswerBis(false);
		setNextStep(false);
		if (data.id == 11) {
			await updateObjectives(token, 1, 11, "done");
			actionToggleDataObjectif();
			await updateHelp(token, 1, "box1help1", "done");
			console.log(objectif12, objectif13);
			if (objectif12 == "done" && objectif13 == "done") {
				await updateObjectives(token, 1, 14, "open");
				await updateHelp(token, 1, "box1help4", "open");
			}
			actionToggleDataObjectif();
			actionToggleDataHelp();
			console.log("objectif11 terminé");
		}
		if (data.id == 22) {
			await updateObjectives(token, 2, 22, "done");
			await updateHelp(token, 2, "box2help2", "done");
			await updateObjectives(token, 2, 23, "open");
			await updateHelp(token, 2, "box2help3", "open");
			actionToggleDataObjectif();
			actionToggleDataHelp();
			console.log("objectif22 terminé");
		}
	};

	const renderModal = () => {
		if (data.id == 14) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<div className="modal-objectif__errorMessage">{errorMessage}</div>
						<div>{renderText(data.detail)}</div>
						<div className="modal-objectif__victimes__main">
							{/* <div className="modal-objectif__victimes__list"> */}
							{data.victimes.map((el, i) => {
								return (
									<div key={i} className="modal-objectif__victimes__info">
										<div className="modal-objectif__victimes__photos--container">
											<img className="modal-objectif__victimes__photos" src={urlApi.apiRemi() + el.img} />
										</div>
										<p className="modal-objectif__victimes__nom">{el.name}</p>
									</div>
								);
							})}
							{/* </div> */}
							{/* <div className="modal-objectif__victimes__select"> */}
							<select
								className="modal-objectif__victimes__select"
								name="victime1"
								onChange={(e) => setVictime1(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select
								className="modal-objectif__victimes__select"
								name="victime2"
								onChange={(e) => setVictime2(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select
								className="modal-objectif__victimes__select"
								name="victime3"
								onChange={(e) => setVictime3(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select
								className="modal-objectif__victimes__select"
								name="victime4"
								onChange={(e) => setVictime4(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select
								className="modal-objectif__victimes__select"
								name="victime5"
								onChange={(e) => setVictime5(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select
								className="modal-objectif__victimes__select"
								name="victime6"
								onChange={(e) => setVictime6(e.target.value)}
							>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							{/* </div> */}
						</div>
						<button className="modal-objectif__button button--red" onClick={handleSubmit14}>
							Valider
						</button>
					</div>
				</div>
			);
		}
		if (data.id == 21) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<div className="modal-objectif__errorMessage">{errorMessage}</div>
						<div>{renderText(data.detail)}</div>
						<div className="modal-objectif__victimestri__liste">
							{data.victimes.map((el, i) => {
								return (
									<div
										key={i}
										className={`modal-objectif__victimestri__info ${
											intVictimes[el.name] == true ? "victimestri__info--selected" : ""
										}`}
									>
										<div className="modal-objectif__victimestri__photo--container">
											<img
												className={`modal-objectif__victimestri__photo ${
													intVictimes[el.name] == true ? "victimestri__photo--selected" : ""
												}`}
												src={urlApi.apiRemi() + el.img}
												onClick={() => toggleIntVictime(el.name)}
											/>
										</div>
										<p className="modal-objectif__victimestri__nom">{el.name}</p>
									</div>
								);
							})}
						</div>
						<button className="modal-objectif__button button--red" onClick={handleSubmit21}>
							Valider
						</button>
					</div>
				</div>
			);
		}
		if (data.id == 23) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<div className="modal-objectif__errorMessage">{errorMessage}</div>
						<div>{renderText(data.detail)}</div>
						<div className="modal-objectif__victimestri__liste">
							{data.victimes.map((el, i) => {
								return (
									<div
										key={i}
										className={`modal-objectif__victimestri__info ${
											finalVictimes[el.name] == true ? "victimestri__info--selected" : ""
										}`}
									>
										<div className="modal-objectif__victimestri__photo--container">
											<img
												className={`modal-objectif__victimestri__photo ${
													finalVictimes[el.name] == true ? "victimestri__photo--selected" : ""
												}`}
												src={urlApi.apiRemi() + el.img}
												onClick={() => toggleFinalVictime(el.name)}
											/>
										</div>
										<p className="modal-objectif__victimestri__nom">{el.name}</p>
									</div>
								);
							})}
						</div>
						<button className="modal-objectif__button button--red" onClick={handleSubmit23}>
							Valider
						</button>
					</div>
				</div>
			);
		}
		if (data.id == 24 && box2lieu1 == false) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<div>{renderText(data.predetail)}</div>
						<button className="modal-objectif__button button--red" onClick={handleModal}>
							Valider
						</button>
					</div>
				</div>
			);
		}
		if (data.id == 33 && objectif34 != "done") {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<p className="modal-objectif__subtitle">
							Il nous manque des informations sur l&apos;identité du tueur pour aller plus loin
						</p>
						<button className="modal-objectif__button button--red" onClick={handleModal}>
							Continuer l&apos;enquête
						</button>
					</div>
				</div>
			);
		}
		if (data.id == 33 && objectif34 == "done") {
			if (box3lieu3 == false) {
				setVideoSauverLauren(true);
				fetchPreviousStateNappe();
				return;
			}
			if (box3lieu3 == true) {
				return (
					<div className="modal-objectif__background">
						<div className="modal-objectif__box">
							<button className="modal-objectif__icon--container">
								<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
							</button>
							<h2 className="modal-objectif__title">
								Objectif : <br></br> {data.title}
							</h2>
							<p className="modal-objectif__subtitle">
								On a le nom des deux dernières cibles, mais il n&apos;en reste plus qu&apos;une en vie, il faut qu&apos;on la
								trouve pour pouvoir la sauver.
							</p>
							<p className="modal-objectif__subtitle">Qui est la dernière cible encore vivante ?</p>
							<button className="modal-objectif__button button--red" onClick={() => handleVictimeChoice("maria")}>
								Maria Gruber
							</button>
							<button className="modal-objectif__button button--red" onClick={() => handleVictimeChoice("giuseppe")}>
								Giuseppe Rossi
							</button>
						</div>
					</div>
				);
			}
		}
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<button className="modal-objectif__icon--container">
						<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
					</button>
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {data.title}
					</h2>
					<div className="modal-objectif__errorMessage">{errorMessage}</div>
					<div>{renderText(data.detail)}</div>
					<form className="modal-objectif__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label={data.label}
							name="objectif"
							placeholder="Ce champ est vide"
							value={value}
							setValue={setValue}
						/>
						<button className="modal-objectif__button button--red">Valider</button>
					</form>
				</div>
			</div>
		);
	};

	const renderModalBis = () => {
		if (data.id == 33) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<button className="modal-objectif__icon--container">
							<img className="modal-objectif__icon" src={Cross} onClick={handleModalBis} />
						</button>
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						<div className="modal-objectif__errorMessage">{errorMessage}</div>
						<p className="modal-objectif__subtitle">Les choses s&apos;accélèrent, elle nous a mis un ultimatum !</p>
						<p className="modal-objectif__subtitle">
							Il faut qu&apos;on sache où est cette personne pour intervenir à temps, on ne peut pas se permettre de se tromper
						</p>
						<form className="modal-objectif__form" onSubmit={handleSubmitCity}>
							<Input
								type="texte"
								label={data.newlabel}
								name="objectifbis"
								placeholder="Ce champ est vide"
								value={value}
								setValue={setValue}
							/>
							<button className="modal-objectif__button button--red">Valider</button>
						</form>
					</div>
				</div>
			);
		}
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<button className="modal-objectif__icon--container">
						<img className="modal-objectif__icon" src={Cross} onClick={handleModalBis} />
					</button>
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {data.title}
					</h2>
					<div className="modal-objectif__errorMessage">{errorMessage}</div>
					<div>{renderText(data.newdetail)}</div>
					<form className="modal-objectif__form" onSubmit={handleSubmitBis}>
						<Input
							type="texte"
							label={data.newlabel}
							name="objectifbis"
							placeholder="Ce champ est vide"
							value={value}
							setValue={setValue}
						/>
						<button className="modal-objectif__button button--red">Valider</button>
					</form>
				</div>
			</div>
		);
	};

	const renderModalAnswer = () => {
		if (data.id == 33) {
			return (
				<div className="modal-objectif__background">
					<div className="modal-objectif__box">
						<h2 className="modal-objectif__title">
							Objectif : <br></br> {data.title}
						</h2>
						{victimeSaved == "Maria" ? (
							<audio autoPlay>
								<source src={urlApi.apiRemi() + "sounds/304-dernier-objectif-rempli-maria.wav"} type="audio/wav" />
								Votre navigateur ne prend pas en charge ce format
							</audio>
						) : (
							<audio autoPlay>
								<source src={urlApi.apiRemi() + "sounds/304-dernier-objectif-rempli-giuseppe.wav"} type="audio/wav" />
								Votre navigateur ne prend pas en charge ce format
							</audio>
						)}
						<p className="modal-objectif__subtitle">“Le jeu n&apos;est pas fini, Raph…”</p>
						<button className="modal-objectif__button button--red" onClick={handleFinalStep}>
							Continuer l&apos;enquête
						</button>
					</div>
				</div>
			);
		}
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {data.title}
					</h2>
					{data.answersrc ? (
						<audio autoPlay>
							<source src={urlApi.apiRemi() + data.answersrc} type="audio/wav" />
							Votre navigateur ne prend pas en charge ce format
						</audio>
					) : (
						""
					)}
					<div>{renderText(data.answertext)}</div>
					<button className="modal-objectif__button button--red" onClick={handleModalAnswer}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const renderModalAnswerBis = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {data.title}
					</h2>
					{data.newanswersrc ? (
						<audio autoPlay>
							<source src={urlApi.apiRemi() + data.newanswersrc} type="audio/wav" />
							Votre navigateur ne prend pas en charge ce format
						</audio>
					) : (
						""
					)}
					<div>{renderText(data.newanswertext)}</div>
					<button className="modal-objectif__button button--red" onClick={handleModalAnswerBis}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const renderText = (data) => {
		const text = data.map((el, i) => {
			return (
				<p className="modal-objectif__subtitle" key={i}>
					{el}
				</p>
			);
		});
		return text;
	};

	// -- RENDER DES BOUTONS OBJECTIFS -- //

	const renderObjectif = () => {
		if (data.status == "done") {
			return (
				<>
					<button className="objectif objectif--done">
						<div className="objectif__mainInfo">
							<div className="objectif__icon-wrapper">
								<img src={Check} className="objectif__icon" />
							</div>
							<h3 className="objectif__title">{data.title}</h3>
						</div>
						<div className="objectif__subInfo">
							<p className="objectif__subtitle">{data.subtitle}</p>
						</div>
					</button>
				</>
			);
		}
		if (data.status == "open") {
			return (
				<>
					<button className="objectif objectif--open" onClick={nextStep ? handleModalBis : handleModal}>
						<div className="objectif__mainInfo">
							<div className="objectif__icon-wrapper">
								<img src={LockOpen} className="objectif__icon" />
							</div>
							<h3 className="objectif__title">{data.title}</h3>
						</div>
						<div className="objectif__subInfo">
							<p className="objectif__subtitle">{data.subtitle}</p>
						</div>
					</button>
				</>
			);
		}
		if (data.status == "closed") {
			return (
				<>
					<button className="objectif objectif--closed">
						<div className="objectif__icon-wrapper--closed">
							<img src={LockClosed} className="objectif__icon" />
						</div>
						<h3 className="objectif__title--closed">Cet objectif est bloqué pour le moment</h3>
					</button>
				</>
			);
		}
	};

	// --- LOGIQUE EVENT BOX 1 --- //

	const [modaleHacking, setModaleHacking] = useState(false);
	const [modaleMailHacking, setModaleMailHacking] = useState(false);
	const [modaleMalle, setModaleMalle] = useState(false);
	const [modaleRebecca, setModaleRebecca] = useState(false);
	const [modaleVHS, setModaleVHS] = useState(false);
	const [modaleInterrogatoireGarraud, setModaleInterrogatoireGarraud] = useState(false);
	const [videoInterrogatoireGarraud, setVideoInterrogatoireGarraud] = useState(false);
	const [endGameModale, setEndGameModale] = useState(false);

	const displayHacking = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box modal-hacking">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/103-hacking-tueur.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<div className="text-hacking" data-text="Vous avez un mail">
						Vous avez un mail
					</div>
					<button className="modal-objectif__button button--red" onClick={handleOpenMailHacking}>
						Valider
					</button>
				</div>
			</div>
		);
	};

	const handleOpenMailHacking = () => {
		setModaleHacking(false);
		setModaleMailHacking(true);
	};

	const handleCloseMailHacking = async () => {
		setModaleMailHacking(false);
	};

	const displayMailHacking = () => {
		return (
			<>
				<audio autoPlay>
					<source src={urlApi.apiRemi() + "sounds/musiques-db-s2-theme-tueur.wav"} type="audio/wav" />
					Votre navigateur ne prend pas en charge ce format
				</audio>
				<Document
					title="Email du tueur"
					srcElement={urlApi.apiRemi() + "assets/document/125_Email_Tueur_Oublie.png"}
					handleModalDocument={handleCloseMailHacking}
				/>
			</>
		);
	};

	const displayEndGameModale = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					{renderEndText()}
					<button className="modal-objectif__button button--red" onClick={handleEndGameModale}>
						Clore cette partie de l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const renderEndText = () => {
		if (currentBox == 1) {
			return (
				<div className="modal-objectif__endGame--text">
					<p>Vous avez finit la première partie</p>
					<p>Rendez-vous en box 2 pour la suite de l&apos;enquête</p>
				</div>
			);
		}
		if (currentBox == 2) {
			return (
				<div>
					<p>Vous avez finit la seconde partie</p>
					<p>Rendez-vous en box 3 pour la suite de l&apos;enquête</p>
				</div>
			);
		}
		if (currentBox == 3) {
			return (
				<div>
					<p>Vous avez cloturé le dossier du Tueur au Tarot, bravo Agent !</p>
					<p>Au plaisir de vous retrouver sur de prochaines enquêtes.</p>
				</div>
			);
		}
	};

	const displayContentMalle = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<p>
						Je vous transmets l&apos;enregistrement qu&apos;on a trouvé dans la malle pour que vous puissiez l&apos;écouter.
					</p>
					<p> Tim nous confirme que c&apos;est bien la voix de Rebecca.</p>
					<p>
						Attention, j&apos;ai écouté l&apos;enregistrement et il est assez dur. Pour les âmes sensibles, cliquez sur la
						transcription.
					</p>
					<p> On a aussi un médaillon, difficile de dire à quoi il sert. </p>
					<p>
						Quant aux inscriptions, je vous laisse me dire ce que ça vous inspire... tous les éléments sont dans
						l&apos;historique
					</p>
					<button className="modal-objectif__button button--red" onClick={handleOpenRebeccaAudio}>
						Ecouter l&apos;enregistrement
					</button>
				</div>
			</div>
		);
	};

	const handleOpenRebeccaAudio = () => {
		fetchPreviousStateNappe();
		setModaleMalle(false);
		setModaleRebecca(true);
	};

	const displayAudioRebecca = () => {
		return (
			<Audio
				title="Derniers mots de Rebecca"
				srcImg1={urlApi.apiRemi() + "assets/photos-personnages/rebecca_dumont.jpg"}
				srcImg2={null}
				srcTranscription={urlApi.apiRemi() + "assets/transcripts/102_Derniers_mots_Rebecca_transcript.pdf"}
				handleModalAudio={closeAudioRebecca}
				srcAudio={urlApi.apiRemi() + "sounds/102-derniers-mots-rebecca.wav"}
			/>
		);
	};

	const closeAudioRebecca = async () => {
		await updateEvent(token, 1, 13, "done");
		actionToggleDataEvent();
		await updateHistory(token, 1, "box1audio1");
		actionToggleDataHistory();
		setModaleRebecca(false);
	};

	const displayModaleVHS = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<p>Voilà ce qu&apos;on a retrouvé dans le coffre: une lettre et une cassette VHS.</p>
					<p>La lettre est disponible dans l&apos;onglet Historique</p>
					<p>
						Il y a deux passages intéressants dans la video: un vers 15min où on voit Charles Garraud et un autre à la
						fin...Si vous voulez plus d&apos;informations sur la cassette, n&apos;hésitez pas à consulter Tim en lui demandant
						une analyse VHS.
					</p>
					<p>
						Il y avait aussi ce plan étrange, il n&apos;a pas l&apos;air bien vieux, il a dû être accroché à la maison il
						n&apos;y a pas longtemps.
					</p>
					<p>Ça ne correspond à aucune des adresses qu&apos;on a trouvées jusqu&apos;ici...</p>
					<p>Vous pouvez l&apos;étudier depuis l&apos;Historique</p>
					<button className="modal-objectif__button button--red" onClick={handleCloseModaleVHS}>
						Continuer l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const handleCloseModaleVHS = async () => {
		await updateEvent(token, 1, 14, "done");
		actionToggleDataEvent();
		setModaleVHS(false);
	};

	const displayModaleInterrogatoireGarraud = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<p>
						Ça fait de sacrées révélations tout ça... Je pense qu&apos;avec ce qu&apos;on a là, on devrait pouvoir interroger
						Charles Garraud.
					</p>
					<button className="modal-objectif__button button--red" onClick={handleOpenInterrogatoire}>
						Passer à l&apos;interrogatoire
					</button>
				</div>
			</div>
		);
	};

	const handleOpenInterrogatoire = () => {
		setModaleInterrogatoireGarraud(false);
		setVideoInterrogatoireGarraud(true);
		fetchPreviousStateNappe();
	};

	const displayVideoInterrogatoireGarraud = () => {
		return (
			<Video
				title="Interrogatoire de Charles Garraud"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-104-vdef.mp4&type=video"}
				handleModalVideo={handleCloseVideoInterrogatoire}
				delayedButton={true}
			/>
		);
	};

	const handleCloseVideoInterrogatoire = async () => {
		setVideoInterrogatoireGarraud(false);
		setEndGameModale(true);
	};

	const handleEndGameModale = async () => {
		if (currentBox == 1) {
			// await updateHistory(token, 1, "box1video4");
			await updateEvent(token, 1, 15, "done");
			await updateBox(token, 1, "done");
			await updateBox(token, 2, "open");
			await updateTimeEndBox(token, 1);
		}
		if (currentBox == 2) {
			// await updateHistory(token, 2, "box2video5");
			await updateEvent(token, 2, 25, "done");
			await updateBox(token, 2, "done");
			await updateBox(token, 3, "open");
			await updateTimeEndBox(token, 2);
		}
		if (currentBox == 3) {
			await updateBox(token, 3, "done");
			await updateTimeEndBox(token, 3);
		}
		navigate("/box-choice");
	};

	// --- LOGIQUE EVENT BOX 2 --- //

	const [mailLauren1, setMailLauren1] = useState(false);
	const [mailLauren2, setMailLauren2] = useState(false);
	const [audioSamuel, setAudioSamuel] = useState(false);
	const [audioBreakingNews, setAudioBreakingNews] = useState(false);
	const [videoBreakingNews, setVideoBreakingNews] = useState(false);
	const [videoBureauLauren, setVideoBureauLauren] = useState(false);
	const [audioEndBreakingNews, setAudioEndBreakingNews] = useState(false);

	const displayVideoBureauLauren = () => {
		return (
			<Video
				title="Bureau de Lauren Fraser"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-209-vdef.mp4&type=video"}
				handleModalVideo={handleCloseVideoBureau}
				delayedButton={true}
			/>
		);
	};

	const handleCloseVideoBureau = async () => {
		setVideoBureauLauren(false);
		setEndGameModale(true);
	};

	const displayMailLauren1 = () => {
		return (
			<Document
				title="Email de Lauren Fraser"
				srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#1.jpg"}
				handleModalDocument={handleCloseMail1}
			/>
		);
	};

	const handleCloseMail1 = async () => {
		await updateHistory(token, 2, "box2document8");
		actionToggleDataHistory();
		await updateEvent(token, 2, 23, "done");
		actionToggleDataEvent();
		setMailLauren1(false);
	};

	const displayMailLauren2 = () => {
		return (
			<Document
				title="Email de Lauren Fraser"
				srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#2.jpg"}
				handleModalDocument={handleCloseMail2}
			/>
		);
	};

	const handleCloseMail2 = async () => {
		setMailLauren2(false);
	};

	const displayAudioSamuel = () => {
		return (
			<Audio
				title="Echanges Samuel Perry & Raphaëlle Sanchez"
				srcImg1={urlApi.apiRemi() + "assets/photos-personnages/Samuel Perry.jpg"}
				srcImg2={urlApi.apiRemi() + "assets/photos-personnages/raphaelle.jpg"}
				srcTranscription={urlApi.apiRemi() + "assets/transcripts/207_Echanges_Samuel_Perry-Raphaelle_transcript.pdf"}
				handleModalAudio={closeAudioSamuel}
				srcAudio={urlApi.apiRemi() + "sounds/207-echanges-samuel-perry-raphaelle.wav"}
			/>
		);
	};

	const closeAudioSamuel = async () => {
		setAudioSamuel(false);
		setAudioBreakingNews(true);
	};

	const displayAudioBreakingNews = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/203-commentaires-raphaelle-breaking-news-1.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Attendez, allumez la TV ! </p>
					<button className="modal-objectif__button button--red" onClick={handleCloseAudioBreakingNews}>
						Passer à l&apos;interrogatoire
					</button>
				</div>
			</div>
		);
	};

	const handleCloseAudioBreakingNews = () => {
		setAudioBreakingNews(false);
		setVideoBreakingNews(true);
		fetchPreviousStateNappe();
	};

	const displayVideoBreakingNews = () => {
		return (
			<>
				{audioEndBreakingNews ? (
					<audio autoPlay onEnded={() => setVideoBreakingNews(false)}>
						<source src={urlApi.apiRemi() + "sounds/203-commentaires-raphaelle-breaking-news-2.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
				) : null}
				<Video
					title="Flash Info"
					srcVideo={urlApi.apiRemi() + "videos/db-s02-203-vdef.mp4&type=video"}
					handleModalVideo={handleCloseVideoBreakingNews}
					delayedButton={true}
				/>
			</>
		);
	};

	const handleCloseVideoBreakingNews = async () => {
		setAudioEndBreakingNews(true);
		fetchPreviousStateNappe();
		await updateHistory(token, 2, "box2video3");
		actionToggleDataHistory();
	};

	// --- LOGIQUE EVENT BOX 3 --- //

	const [videoSauverLauren, setVideoSauverLauren] = useState(false);
	const [debriefLauren, setDebriefLauren] = useState(false);
	const [tempsEcoule, setTempsEcoule] = useState(false);
	const [mauvaiseFin1, setMauvaiseFin1] = useState(false);
	const [mauvaiseFin2, setMauvaiseFin2] = useState(false);
	const [resolution, setResolution] = useState(false);
	const [interrogatoireFinal, setInterrogatoireFinal] = useState(false);

	const displayVideoSauverLauren = () => {
		return (
			<Video
				title="Cave de Céline"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-302-def.mp4&type=video"}
				handleModalVideo={handleCloseVideoSauverLauren}
				delayedButton={true}
			/>
		);
	};

	const handleCloseVideoSauverLauren = async () => {
		setDebriefLauren(true);
		fetchPreviousStateNappe();
		await updateHistory(token, 3, "box3video2");
		actionToggleDataHistory();
	};

	const displayDebriefLauren = () => {
		return (
			<Audio
				title="Debrief Lauren"
				srcImg1={urlApi.apiRemi() + "assets/photos-personnages/lauren.jpg"}
				srcImg2={null}
				srcTranscription={urlApi.apiRemi() + "assets/photos-personnages/raphaelle.jpg"}
				handleModalAudio={closeDebriefLauren}
				srcAudio={urlApi.apiRemi() + "sounds/303-debrief-lauren.wav"}
			/>
		);
	};

	const closeDebriefLauren = async () => {
		await updateHistory(token, 3, "box3audio1");
		await updateHistory(token, 3, "box3lieu1");
		actionToggleDataHistory();
		setDebriefLauren(false);
		window.open("https://fouille.foret.detectivebox.fr/?token=" + token, "_blank");
	};

	const displayModaleTempsEcoule = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/306-fin-du-temps.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Le temps est écoulé, nous n&apos;avons pas pu sauver la victime à temps !</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const handleReset = async () => {
		setTempsEcoule(false);
		setMauvaiseFin1(false);
		setMauvaiseFin2(false);
		setValue("");
		setVictimeSaved("");
		setNextStep(false);
		await updateEvent(token, 3, 35, "closed");
		await updateHelp(token, 3, "box3help5", "closed");
		await updateHelp(token, 3, "box3help4", "open");
		actionToggleDataEvent();
		actionToggleDataHelp();
	};

	const handleGoToResolution = async () => {
		await updateEvent(token, 3, 35, "done");
		// actionToggleDataEvent();
		setTempsEcoule(false);
		setMauvaiseFin1(false);
		setMauvaiseFin2(false);
		setResolution(true);
	};

	const displayModaleResolution = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/307-bonne-fin.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Bravo, grâce à vous, nous avons réussi à sauver la dernière cible et à arrêter Céline !</p>
					<p>Il est temps de tout lui faire avouer.</p>
					<button className="modal-objectif__button button--red" onClick={handleInterrogatoireFinal}>
						Voir l&apos;interrogatoire
					</button>
				</div>
			</div>
		);
	};

	const handleInterrogatoireFinal = () => {
		setResolution(false);
		setInterrogatoireFinal(true);
		fetchPreviousStateNappe();
	};

	const displayInterrogatoireFinal = () => {
		return (
			<Video
				title="Interrogatoire de Céline Valluy"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-309-def.mp4&type=video"}
				handleModalVideo={handleEndBox3}
				delayedButton={true}
			/>
		);
	};

	const handleEndBox3 = () => {
		setInterrogatoireFinal(false);
		setEndGameModale(true);
	};

	const displayModaleMauvaiseFin1 = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/308-mauvaise-fin-1.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>
						Ce n&apos;était pas la bonne cible, nous nous sommes trompés... Céline est malheureusement dans la nature et elle
						a réussi son grand œuvre.{" "}
					</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	const displayModaleMauvaiseFin2 = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/309-mauvaise-fin-2.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Le temps est écoulé, nous n&apos;avons pas pu sauver la victime à temps !</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&apos;enquête
					</button>
				</div>
			</div>
		);
	};

	return (
		<>
			{renderObjectif()}
			{modal ? renderModal() : ""}
			{modalBis ? renderModalBis() : ""}
			{modalAnswer ? renderModalAnswer() : ""}
			{modalAnswerBis ? renderModalAnswerBis() : ""}
			{modaleHacking ? displayHacking() : null}
			{modaleMailHacking ? displayMailHacking() : null}
			{modaleMalle ? displayContentMalle() : null}
			{modaleRebecca ? displayAudioRebecca() : null}
			{modaleVHS ? displayModaleVHS() : null}
			{modaleInterrogatoireGarraud ? displayModaleInterrogatoireGarraud() : null}
			{videoInterrogatoireGarraud ? displayVideoInterrogatoireGarraud() : null}
			{mailLauren1 ? displayMailLauren1() : null}
			{mailLauren2 ? displayMailLauren2() : null}
			{audioSamuel ? displayAudioSamuel() : null}
			{audioBreakingNews ? displayAudioBreakingNews() : null}
			{videoBreakingNews ? displayVideoBreakingNews() : null}
			{videoBureauLauren ? displayVideoBureauLauren() : null}
			{videoSauverLauren ? displayVideoSauverLauren() : null}
			{debriefLauren ? displayDebriefLauren() : null}
			{tempsEcoule ? displayModaleTempsEcoule() : null}
			{mauvaiseFin1 ? displayModaleMauvaiseFin1() : null}
			{mauvaiseFin2 ? displayModaleMauvaiseFin2() : null}
			{resolution ? displayModaleResolution() : null}
			{interrogatoireFinal ? displayInterrogatoireFinal() : null}
			{endGameModale ? displayEndGameModale() : null}
		</>
	);
};

Objectif.propTypes = {
	data: PropTypes.object,
};

export default Objectif;
