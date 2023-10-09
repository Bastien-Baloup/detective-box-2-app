import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import { useState } from "react";

const Objectif = ({ title, subtitle, detail, state }) => {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	const validateModal = () => {
		alert("Objectif validé");
	};

	// Peut être que la modale doit être faite individuellement en fonction des objectifs?
	const renderModal = () => {
		return (
			<div className="modal-objectif__background">
				<div className="modal-objectif__box">
					<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {title}
					</h2>
					<p className="modal-objectif__title">{detail}</p>
					<button className="modal-objectif__button button--red" onClick={validateModal}>
						Valider
					</button>
				</div>
			</div>
		);
	};

	const renderObjectif = () => {
		if (state == "done") {
			return (
				<>
					<article className="objectif objectif--done">
						<div className="objectif__mainInfo">
							<div className="objectif__icon-wrapper">
								<img src={Check} className="objectif__icon" />
							</div>
							<h3 className="objectif__title">{title}</h3>
						</div>
						<div className="objectif__subInfo">
							<p className="objectif__subtitle">{subtitle}</p>
						</div>
					</article>
				</>
			);
		}
		if (state == "open") {
			return (
				<>
					<article className="objectif objectif--open" onClick={handleModal}>
						<div className="objectif__mainInfo">
							<div className="objectif__icon-wrapper">
								<img src={LockOpen} className="objectif__icon" />
							</div>
							<h3 className="objectif__title">{title}</h3>
						</div>
						<div className="objectif__subInfo">
							<p className="objectif__subtitle">{subtitle}</p>
						</div>
					</article>
				</>
			);
		}
		if (state == "closed") {
			return (
				<>
					<article className="objectif objectif--closed">
						<div className="objectif__icon-wrapper--closed">
							<img src={LockClosed} className="objectif__icon" />
						</div>
						<h3 className="objectif__title--closed">Cet objectif est bloqué pour le moment</h3>
					</article>
				</>
			);
		}
	};

	return (
		<>
			{renderObjectif()}
			{modal ? renderModal() : ""}
		</>
	);
};

export default Objectif;
