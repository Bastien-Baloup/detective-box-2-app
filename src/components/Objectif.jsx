// EXPLICATION : Ce composant est très complexe et important : il permet de rendre les objectifs
// EXPLICATION : Il affiche egalement toute la logique de validation des objectifs
// EXPLICATION : Il affiche egalement toute la logique des différents événements de l'application

import PropTypes from "prop-types";
import { useState } from "react";
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
import { BoxContext } from "../utils/context/fetchContext";
import { useContext } from "react";

// Changer le weight sur le sous titre

const Objectif = ({ data }) => {
	const [modal, setModal] = useState(false);
	const [modalAnswer, setModalAnswer] = useState(false);
	const [modalAnswerBis, setModalAnswerBis] = useState(false);
	const [modalBis, setModalBis] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [value, setValue] = useState("");
	const [nextStep, setNextStep] = useState(false);

	const { currentBox } = useContext(BoxContext);

	const navigate = useNavigate();

	const token = localStorage.getItem("token");

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
		getIntVictimesValue();
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
		getFinalVictimesValue();
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
	};

	// -- CONDITIONS SPE OBJECTIF 33 -- //
	const [victimeSaved, setVictimeSaved] = useState("");

	const handleVictimeChoice = (choice) => {
		setVictimeSaved(choice);
		setModal(false);
		setModalAnswer(true);
	};

	const handleFinalStep = () => {
		setModalAnswer(false);
		setModalBis(!modalBis);
		setNextStep(true);
		// API box3help4 == done + box3help5 == open
	};

	const handleSubmitCity = () => {
		setErrorMessage("Je ne trouve aucune personne à se nom dans cette ville. On doit s'être trompé quelque part");
		if (slugify(value) == "milan" && victimeSaved == "maria") {
			setErrorMessage(
				"Bon, j'ai fait quelques recherches rapidement sur cette Maria Gruber... malheureusement c'est un prénom très répandu, surtout en Autriche, difficile de cibler correctement l'endroit qu'on cherche... mais ça vous aidera peut-être"
			);
		}
		if (slugify(value) == "milan" && victimeSaved == "giuseppe") {
			// if event 37 == "closed" > event 37 == "open"
		}
		if (slugify(value) == "graz" && victimeSaved == "maria") {
			// if event 39 == "closed" > event 39 == "open"
		}
		if (slugify(value) == "graz" && victimeSaved == "giuseppe") {
			// if event 38 == "closed" > event 38 == "open"
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

	const handleSubmit = (e) => {
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
				// 	if ("API box3audio3 == true dans l'historique") {
				// 		setErrorMessage("Si on allait plutôt chez elle pour voir de quoi il en retourne ?");
				// 		setValue("");
				// 		return;
				// 	}
				// 	if ("API box3lieu2 == true dans l'historique") {
				// 		setErrorMessage("Cet arbre généalogique ne joue pas en sa faveur, mais ça ne veut pas tout dire.");
				// 		setValue("");
				// 		return;
				// 	}
				// 	if ("API box3help4 != done dans dataHelp") {
				// 		setErrorMessage("");
				// 		setValue("");
				// 		setModal(false);
				// 		setModalAnswer(true);
				// 		return;
				// 	} else {
				// 		setErrorMessage("C'est un peu léger d'inculper quelqu'un avec le peu d'infos qu'on a");
				// 		setValue("");
				// 		return;
				// 	}
				// } else {
				setErrorMessage(data.errorMessage);
				setValue("");
			}
		}
		if (data.answer.includes(slugify(value))) {
			if (data.id == 11) {
				// API box1document3 == true dans l'historique
				console.log("document 3 dans l'historique !");
			}
			if (data.id == 13) {
				// API if ("box1lieu2" == false dans l'historique) {
				setErrorMessage("Je pense que nous avons trop peu d'éléments pour tirer une conclusion pour cette piste");
				setValue("");
				return;
				// }
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

	const handleModalAnswer = () => {
		if (data.newdetail) {
			setModalAnswer(false);
			setModalBis(true);
			setNextStep(true);
		} else {
			setModalAnswer(false);
			if (data.id == 12) {
				// API Changer status de l'objectif en done
				// API box1help2 == done dans dataHelp
				console.log("objectif12 terminé");
			}
			if (data.id == 13) {
				// API Changer status de l'objectif en done
				// API box1help3 == done dans datatHelp
				console.log("objectif13 terminé");
			}
			if (data.id == 14) {
				// API Changer status de l'objectif en done
				// API box1help4 == done dans dataHelp
				console.log("objectif14 terminé");
			}
			if (data.id == 21) {
				// API Changer status de l'objectif en done
				// API box2help1 == done dans dataHelp
				console.log("objectif21 terminé");
			}
			if (data.id == 23) {
				// API Changer status de l'objectif en done
				// API box2help3 == done dans dataHelp
				console.log("objectif23 terminé");
			}
			if (data.id == 24) {
				// API box2help4 == done dans dataHelp
				// API box2help5 == open dans dataHelp
				console.log("objectif24 terminé");
			}
			if (data.id == 31) {
				// API Changer status de l'objectif en done
				// API box3help1 == done dans dataHelp
				console.log("objectif31 terminé");
			}
			if (data.id == 32) {
				// API Changer status de l'objectif en done
				// API box3help2 == done dans dataHelp
				console.log("objectif32 terminé");
			}
			if (data.id == 34) {
				// API Changer status de l'objectif en done
				// API box3help6 == done dans dataHelp
				console.log("objectif34 terminé");
			}
			if (data.id == 33) {
				// API box3help4 == done dans dataHelp
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

	const handleModalAnswerBis = () => {
		setModalAnswerBis(false);
		if (data.id == 11) {
			// API Changer status de l'objectif en done
			// API box1help1 == done dans dataHelp
			console.log("objectif11 terminé");
		}
		if (data.id == 22) {
			// API Changer status de l'objectif en done
			// API box2help2 == done dans dataHelp
			// API objectif data.id == 23 == true dans dataObjectif
			// API box2help3 == open dans dataHelp
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
						<div>
							{data.victimes.map((el, i) => {
								return (
									<div key={i}>
										<img className="modal-objectif__victimes" src={urlApi.apiRemi() + el.img} />
										<p className="modal-objectif__victimes">{el.name}</p>
									</div>
								);
							})}
						</div>
						<div>
							<select name="victime1" onChange={(e) => setVictime1(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select name="victime2" onChange={(e) => setVictime2(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select name="victime3" onChange={(e) => setVictime3(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select name="victime4" onChange={(e) => setVictime4(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select name="victime5" onChange={(e) => setVictime5(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
							<select name="victime6" onChange={(e) => setVictime6(e.target.value)}>
								{data.choices.map((el, i) => {
									return (
										<option value={el} key={i}>
											{el}
										</option>
									);
								})}
							</select>
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
						<div>
							{data.victimes.map((el, i) => {
								return (
									<div key={i}>
										<img
											className="modal-objectif__victimes"
											src={urlApi.apiRemi() + el.img}
											onClick={() => toggleIntVictime(el.name)}
										/>
										<p className="modal-objectif__victimes">{el.name}</p>
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
						<div>
							{data.victimes.map((el, i) => {
								return (
									<div key={i}>
										<img
											className="modal-objectif__victimes"
											src={urlApi.apiRemi() + el.img}
											onClick={() => toggleFinalVictime(el.name)}
										/>
										<p className="modal-objectif__victimes">{el.name}</p>
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
		// if (data.id == 24 && lieu de fouille chez mason PAS visite ! (ou document dans historique ?)) {
		if (data.id == 24) {
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
		// if (API data.id == 33 == "open" && box3help4 == open) {
		if (data.id == 33) {
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
		// if (API data.id == 33 == "open" && objectif 34 == done) {
		if (data.id == 33) {
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

	const [modaleVideo, setModaleVideo] = useState(false);
	const [modaleHacking, setModaleHacking] = useState(false);
	const [modaleMailHacking, setModaleMailHacking] = useState(false);
	const [modaleMalle, setModaleMalle] = useState(false);
	const [modaleRebecca, setModaleRebecca] = useState(false);
	const [modaleVHS, setModaleVHS] = useState(false);
	const [modaleInterrogatoireGarraud, setModaleInterrogatoireGarraud] = useState(false);
	const [videoInterrogatoireGarraud, setVideoInterrogatoireGarraud] = useState(false);
	const [endGameModale, setEndGameModale] = useState(false);

	const handleModalVideoBrief = () => {
		if (currentBox == "box1") {
			//API box1video1 in history == true
		}
		if (currentBox == "box2") {
			//API box2video1 in history == true
		}
		if (currentBox == "box3") {
			//API box3video1 in history == true
		}
		setModaleVideo(false);
	};

	const displayBrief = () => {
		if (currentBox == "box1") {
			return (
				<Video
					title="Briefing box 1"
					srcVideo={urlApi.apiRemi() + "videos/db-s02-101-def.mp4"}
					handleModalVideo={handleModalVideoBrief}
					delayedButton={true}
				/>
			);
		}
		if (currentBox == "box2") {
			return (
				<Video
					title="Briefing box 1"
					srcVideo={urlApi.apiRemi() + "videos/db-s02-201-vdef.mp4"}
					handleModalVideo={handleModalVideoBrief}
					delayedButton={true}
				/>
			);
		}
		if (currentBox == "box3") {
			return (
				<Video
					title="Briefing box 1"
					srcVideo={urlApi.apiRemi() + "videos/db-s02-301-def.mp4"}
					handleModalVideo={handleModalVideoBrief}
					delayedButton={true}
				/>
			);
		}
	};

	const displayHacking = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/103-hacking-tueur.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<div>Vous avez un mail</div>
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

	const handleCloseMailHacking = () => {
		setModaleMailHacking(true);
		// API put box1document5 == true in history
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
					{renderEndText}
					<button className="modal-objectif__button button--red" onClick={handleEndGameModale}>
						Retour au menu
					</button>
				</div>
			</div>
		);
	};

	const renderEndText = () => {
		if (currentBox == "box1") {
			return (
				<div>
					<p>Vous avez finit la première partie</p>
					<p>Rendez-vous en box 2 pour la suite de l&pos;enquête</p>
				</div>
			);
		}
		if (currentBox == "box2") {
			return (
				<div>
					<p>Vous avez finit la seconde partie</p>
					<p>Rendez-vous en box 3 pour la suite de l&pos;enquête</p>
				</div>
			);
		}
		if (currentBox == "box3") {
			return (
				<div>
					<p>Vous avez finit l&pos;enquête, bravo Agent !</p>
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
						l&pos;historique
					</p>
					<button className="modal-objectif__button button--red" onClick={handleOpenRebeccaAudio}>
						Ecouter l&pos;enregistrement
					</button>
				</div>
			</div>
		);
	};

	const handleOpenRebeccaAudio = () => {
		setModaleMalle(false);
		setModaleRebecca(true);
	};

	const displayAudioRebecca = () => {
		<Audio
			title="Derniers mots de Rebecca"
			srcImg1={urlApi.apiRemi() + "assets/photos-personnages/rebecca_dumont.jpg"}
			srcImg2={null}
			srcTranscription={urlApi.apiRemi() + "assets/transcripts/102_Derniers_mots_Rebecca_transcript.pdf"}
			handleModalAudio={closeAudioRebecca}
			srcAudio={urlApi.apiRemi() + "sounds/102-derniers-mots-rebecca.wav"}
		/>;
	};

	const closeAudioRebecca = () => {
		setModaleRebecca(false);
		//API box1audio1 == true in history
	};

	const displayModaleVHS = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<p>Voilà ce qu&pos;on a retrouvé dans le coffre: une lettre et une cassette VHS.</p>
					<p>La lettre est disponible dans l&pos;onglet Historique</p>
					<p>
						Il y a deux passages intéressants dans la video: un vers 15min où on voit Charles Garraud et un autre à la
						fin...Si vous voulez plus d&apos;informations sur la cassette, n&apos;hésitez pas à consulter Tim en lui demandant
						une analyse VHS.
					</p>
					<p>
						Il y avait aussi ce plan étrange, il n&apos;a pas l&apos;air bien vieux, il a dû être accroché à la maison il
						n&apos;y a pas longtemps.
					</p>
					<p>Ça ne correspond à aucune des adresses qu&pos;on a trouvées jusqu&pos;ici...</p>
					<p>Vous pouvez l&pos;étudier depuis l&pos;Historique</p>
					<button className="modal-objectif__button button--red" onClick={handleCloseModaleVHS}>
						Continuer l&pos;enquête
					</button>
				</div>
			</div>
		);
	};

	const handleCloseModaleVHS = () => {
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
						Passer à l&pos;interrogatoire
					</button>
				</div>
			</div>
		);
	};

	const handleOpenInterrogatoire = () => {
		setModaleInterrogatoireGarraud(false);
		setVideoInterrogatoireGarraud(true);
	};

	const displayVideoInterrogatoireGarraud = () => {
		return (
			<Video
				title="Interrogatoire de Charles Garraud"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-104-vdef.mp4"}
				handleModalVideo={handleCloseVideoInterrogatoire}
				delayedButton={true}
			/>
		);
	};

	const handleCloseVideoInterrogatoire = () => {
		setVideoInterrogatoireGarraud(false);
		// box1video4 == true dans history
	};

	const handleEndGameModale = () => {
		if (currentBox == "box1") {
			// API box 1 status == done;
			// API box 2 status == "open";
		}
		if (currentBox == "box2") {
			// API box 2 status == done;
			// API box 3 status == "open";
		}
		if (currentBox == "box3") {
			// API box 3 status == done;
		}
		navigate("/box-choice");
	};

	// Pour toutes les videos
	// 	if (box1 event 11 == "open"){
	// 		setModaleVideo(true)
	// 		event id 11 == "done"
	// 	}

	// 	if (box1 event id 2 == "open"){
	// 		setModaleHacking(true)
	// 		event id 2 == "done"
	// 	}

	// 	if (objectif id 12 == done && currentBox event 12 == "closed"){
	// 		currentBox event id 12 == "open"
	// 	}

	// 	if(objectif 11 , 12, 13 == "done" && objectif 14 == "closed"){
	// 		objectif 14 == "open";
	// 	}

	// 	if(objectif 14 == "done" && box1video4 ==true in history){
	// 		setEndGameModale(true);
	// 	}

	// 	if(box1document1 == true dans history && event box 13 == "closed"){
	// event box 1 3 == "open";
	// 	}

	// 	if (box1 event id 13 == "open"){
	// 		setModaleMalle(true);
	// 		event id 2 == "done"
	// 	}

	// 	if(box1archive23 == true dans history){
	// 		box1document4 == true dans history
	// 	}

	// 	if(box1document2 == true dans history && event box 14 == "closed"){
	// 		event box 1 4 == "open";
	// 			}

	// 	if (box1 event id 14 == "open"){
	// 				setModaleVHS(true);
	// 				event id 4 == "done"
	// 	}

	// 	if(box1document6 == true dans history && event 15 == "closed"){
	// 		event box 15 == "open";
	// 			}

	// 	if (box1 event id 15 == "open"){
	// 				setModaleInterrogatoireGarraud(true);
	// 				event id 15 == "done"
	// 	}

	// --- LOGIQUE EVENT BOX 2 --- //

	const [mailLauren1, setMailLauren1] = useState(false);
	// const [mailLauren2, setMailLauren2] = useState(false);
	const [audioSamuel, setAudioSamuel] = useState(false);
	const [audioBreakingNews, setAudioBreakingNews] = useState(false);
	const [videoBreakingNews, setVideoBreakingNews] = useState(false);
	// const [videoBureauLauren, setVideoBureauLauren] = useState(false);
	const [audioEndBreakingNews, setAudioEndBreakingNews] = useState(false);

	// if (box1 event 21 == "open"){
	// 	setModaleVideo(true)
	// 	event id 21 == "done"
	// }

	// if(box2lieu2 == true dans historique && objectif22 =="closed" && "box2help2" == "closed"){
	// 	objectif 22 == "open";
	// 	box2help2 == "open"}

	// if(objectif 21 , 22, 23 == "done" && objectif 24 == "closed"){
	// 	objectif 24 == "open";
	// 	box2help4 == "open";
	// }

	// if(event 32 == "open" && box2video5 ==false in history){
	// 	setVideoBureauLauren(true);
	// 	event 32 == "done"
	// }

	// const displayVideoBureauLauren = () => {
	// 	return (
	// 		<Video
	// 			title="Bureau de Lauren Fraser"
	// 			srcVideo={urlApi.apiRemi() + "videos/db-s02-209-vdef.mp4"}
	// 			handleModalVideo={handleCloseVideoBureau}
	// 			delayedButton={true}
	// 		/>
	// 	);
	// };

	// const handleCloseVideoBureau = () => {
	// 	// box2video5 == true dans history
	// };

	// if(objectif 24 == "done" && box2video5 ==true in history){
	// 	setEndGameModale(true);
	// }

	// if(box2document4 == true dans historique && event 23 == "closed" ){
	// 	setMailLauren1(true);
	// 	event 23 == "open"
	// }

	const displayMailLauren1 = () => {
		return (
			<Document
				title="Email de Lauren Fraser"
				srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#1.jpg"}
				handleModalDocument={handleCloseMail1}
			/>
		);
	};

	const handleCloseMail1 = () => {
		// box2document8 ==true dans history
		setMailLauren1(false);
	};

	// if(objectif3 == "done" dans historique && event 24 == "closed" ){
	// 	setMailLauren2(true);
	// 	event 24 == "open"
	// }

	// const displayMailLauren2 = () => {
	// 	return (
	// 		<Document
	// 			title="Email de Lauren Fraser"
	// 			srcElement={urlApi.apiRemi() + "assets/document/219_Message_Lauren_#2.jpg"}
	// 			handleModalDocument={handleCloseMail2}
	// 		/>
	// 	);
	// };

	// const handleCloseMail2 = () => {
	// 	// box2document9 ==true dans history
	// 	setMailLauren1(false);
	// };

	// if(objectif 21 == "done" && event 22 == "closed"){
	// 	setAudioSamuel(true);
	// 	event 22 = "open"
	// }

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

	const closeAudioSamuel = () => {
		setAudioSamuel(false);
		// box2audio3 == true dans history
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
						Passer à l&pos;interrogatoire
					</button>
				</div>
			</div>
		);
	};

	const handleCloseAudioBreakingNews = () => {
		setAudioBreakingNews(false);
		setVideoBreakingNews(true);
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
					srcVideo={urlApi.apiRemi() + "videos/db-s02-203-vdef.mp4"}
					handleModalVideo={handleCloseVideoBreakingNews}
					delayedButton={true}
				/>
			</>
		);
	};

	const handleCloseVideoBreakingNews = () => {
		setAudioEndBreakingNews(true);
		// box2video3 == true dans history
	};

	// if(box2lieu3 == true dans history && box2help5 == "open" dans historique && box2help6 == "closed" dans historique){
	// 	box2help5 == "done" dans dataHelp
	// 	box2help6 == "open" dans dataHelp
	// }

	// --- LOGIQUE EVENT BOX 3 --- //

	// const [videoSauverLauren, setVideoSauverLauren] = useState(false);
	const [debriefLauren, setDebriefLauren] = useState(false);
	const [tempsEcoule, setTempsEcoule] = useState(false);
	const [mauvaiseFin1, setMauvaiseFin1] = useState(false);
	const [mauvaiseFin2, setMauvaiseFin2] = useState(false);
	const [resolution, setResolution] = useState(false);
	const [interrogatoireFinal, setInterrogatoireFinal] = useState(false);

	// if (box1 event 31 == "open"){
	// 	setModaleVideo(true)
	// 	event id 31 == "done"
	// }

	// 	if (box3document2 == true dans history &&o objectif 31 == "closed"){
	// objectif 31 == "open"
	// box3help3 == "open"
	// objectif 34 == "open"
	// box3help6 == "open"
	// 	}

	// if(box3help4 == true dans help && Objectif 34 == done && event32 == closed){
	// 	event 32 == open;
	// }

	// if(event32 == open){
	// 	setVideoSauverLauren(true);
	// 	event32 =="closed";
	// }

	// const displayVideoSauverLauren = () => {
	// 	return (
	// 		<Video
	// 			title="Cave de Céline"
	// 			srcVideo={urlApi.apiRemi() + "videos/db-s02-302-def.mp4"}
	// 			handleModalVideo={handleCloseVideoSauverLauren}
	// 			delayedButton={true}
	// 		/>
	// 	);
	// };

	// const handleCloseVideoSauverLauren = () => {
	// 	// box3video2 == true dans history;
	// 	setDebriefLauren(true);
	// };

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

	const closeDebriefLauren = () => {
		// box3audio1==true dans historique
		window.open("https://fouille.foret.detectivebox.fr/?token=" + token, "_blank");
		// ne pas oublier le token
		// box3lieu1==true dans historique
		setDebriefLauren(false);
	};

	// if(box3help5 == true dans help and event 33 == "closed" ){
	// 	event 33 == "open"
	// }

	// if (objectif id: 35 == "open"){
	// 	setTempsEcoule(true);
	// 	id35 ="closed"
	// }

	const displayModaleTempsEcoule = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/306-fin-du-temps.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Le temps est écoulé, nous n&pos;avons pas pu sauver la victime à temps !</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&pos;enquête
					</button>
				</div>
			</div>
		);
	};

	const handleReset = () => {
		setTempsEcoule(false);
		setMauvaiseFin1(false);
		setMauvaiseFin2(false);
		// event 39, 38, 37, 35, 34, 33 =="closed"
		// box3help5 == "closed" dans DataHelp box3help4 == "open"
	};

	const handleGoToResolution = () => {
		setTempsEcoule(false);
		setMauvaiseFin1(false);
		setMauvaiseFin2(false);
		// event39 == "open"
	};

	// if (event 39 == "open"){
	// setResolution(true);
	// 	event 39 == "done"
	// }

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
	};

	const displayInterrogatoireFinal = () => {
		return (
			<Video
				title="Interrogatoire de Céline Valluy"
				srcVideo={urlApi.apiRemi() + "videos/db-s02-309-def.mp4"}
				handleModalVideo={handleEndBox3}
				delayedButton={true}
			/>
		);
	};

	const handleEndBox3 = () => {
		setInterrogatoireFinal(false);
		setEndGameModale(true);
	};

	// if (event 37 == "open"){
	// setMauvaiseFin1(true)
	// 	event 37 == "done"
	// }

	const displayModaleMauvaiseFin1 = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/308-mauvaise-fin-1.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>
						Ce n&pos;était pas la bonne cible, nous nous sommes trompés... Céline est malheureusement dans la nature et elle a
						réussi son grand œuvre.{" "}
					</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&pos;enquête
					</button>
				</div>
			</div>
		);
	};

	// if (event 38 == "open"){
	// 	setMauvaiseFin2(true)
	// 	event 38 == "done"
	// }

	const displayModaleMauvaiseFin2 = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<audio autoPlay>
						<source src={urlApi.apiRemi() + "sounds/309-mauvaise-fin-2.wav"} type="audio/wav" />
						Votre navigateur ne prend pas en charge ce format
					</audio>
					<p>Le temps est écoulé, nous n&pos;avons pas pu sauver la victime à temps !</p>
					<p>Souhaitez-vous réessayer ou passer à l&apos;épilogue ?</p>
					<button className="modal-objectif__button button--red" onClick={handleReset}>
						Recommencer
					</button>
					<button className="modal-objectif__button button--red" onClick={handleGoToResolution}>
						Résolution de l&pos;enquête
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
			{modaleVideo ? displayBrief() : null}
			{modaleHacking ? displayHacking() : null}
			{modaleMailHacking ? displayMailHacking() : null}
			{modaleMalle ? displayContentMalle() : null}
			{modaleRebecca ? displayAudioRebecca() : null}
			{modaleVHS ? displayModaleVHS() : null}
			{modaleInterrogatoireGarraud ? displayModaleInterrogatoireGarraud() : null}
			{videoInterrogatoireGarraud ? displayVideoInterrogatoireGarraud() : null}
			{mailLauren1 ? displayMailLauren1() : null}
			{/* {mailLauren2 ? displayMailLauren2() : null} */}
			{audioSamuel ? displayAudioSamuel() : null}
			{audioBreakingNews ? displayAudioBreakingNews() : null}
			{videoBreakingNews ? displayVideoBreakingNews() : null}
			{/* {videoBureauLauren ? displayVideoBureauLauren() : null} */}
			{/* {videoSauverLauren ? displayVideoSauverLauren() : null} */}
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
