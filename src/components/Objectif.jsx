import PropTypes from "prop-types";
import { useState } from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Input from "./Input.jsx";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import { urlApi } from "../utils/const/urlApi";

// Changer le weight sur le sous titre

const Objectif = ({ data }) => {
	const [modal, setModal] = useState(false);
	const [modalAnswer, setModalAnswer] = useState(false);
	const [modalAnswerBis, setModalAnswerBis] = useState(false);
	const [modalBis, setModalBis] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [value, setValue] = useState("");
	const [nextStep, setNextStep] = useState(false);

	// --- Specifique à l'objectif 14 --- //
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

	// EXPLICATION : Les modales sont écrites pour correspondre à la particularité de chaque Objectif //

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.answer.includes(slugify(value))) {
			if (data.id == 11) {
				// box1document3 dans l'historique
				console.log("document 3 dans l'historique !");
			}
			if (data.id == 13) {
				// if ("box1lieu2" == false) {
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
				// Changer status de l'objectif en done
				// Changer status du renfort 2 en done
				console.log("objectif12 terminé");
			}
			if (data.id == 13) {
				// Changer status de l'objectif en done
				// Changer status du renfort 3 en done
				console.log("objectif13 terminé");
			}
			if (data.id == 14) {
				// Changer status de l'objectif en done
				// Changer status du renfort 4 en done
				console.log("objectif13 terminé");
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
			// Changer status de l'objectif en done
			// Changer status du renfort 1 en done
			console.log("objectif11 terminé");
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
						<p className="modal-objectif__subtitle">{data.detail}</p>
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
					<p className="modal-objectif__subtitle">{data.detail}</p>
					<form className="modal-objectif__form" onSubmit={handleSubmit}>
						<Input
							type="texte"
							label={data.label}
							name="objectif11"
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
					<p className="modal-objectif__subtitle">{data.newdetail}</p>
					<form className="modal-objectif__form" onSubmit={handleSubmitBis}>
						<Input
							type="texte"
							label={data.newlabel}
							name="objectif11bis"
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
				<p className="modal-objectif__answer" key={i}>
					{el}
				</p>
			);
		});
		return text;
	};

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

	return (
		<>
			{renderObjectif()}
			{modal ? renderModal() : ""}
			{modalBis ? renderModalBis() : ""}
			{modalAnswer ? renderModalAnswer() : ""}
			{modalAnswerBis ? renderModalAnswerBis() : ""}
		</>
	);
};

Objectif.propTypes = {
	data: PropTypes.object,
};

export default Objectif;
