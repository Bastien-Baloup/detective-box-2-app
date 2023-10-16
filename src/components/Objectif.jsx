import PropTypes from "prop-types";
import { useState } from "react";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";

// Rendre l'objectif finit cliquable (en fait non le temps des tests)
// Changer le weight sur le sous titre

const Objectif = ({ data }) => {
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
					<button className="modal-objectif__icon--container">
						<img className="modal-objectif__icon" src={Cross} onClick={handleModal} />
					</button>
					<h2 className="modal-objectif__title">
						Objectif : <br></br> {data.title}
					</h2>
					<p className="modal-objectif__title">{data.detail}</p>
					<button className="modal-objectif__button button--red" onClick={validateModal}>
						Valider
					</button>
				</div>
			</div>
		);
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
					<button className="objectif objectif--open" onClick={handleModal}>
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
		</>
	);
};

Objectif.propTypes = {
	data: PropTypes.object,
};

export default Objectif;
