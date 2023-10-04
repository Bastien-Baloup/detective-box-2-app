import Check from "../assets/icons/Icon_Check-red.svg";
import Lockopen from "../assets/icons/Icon_Lock-open-red.svg";
import Lockclosed from "../assets/icons/Icon_Lock-closed-black.svg";
import Cross from "../assets/icons/Icon_Cross-white.svg";
import { useState } from "react";

const BoxChoice = ({ boxNumber, cover, state }) => {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	const openWebsite = () => {
		window.open("https://detectivebox.fr/", "_blank");
	};

	const renderModal = () => {
		return (
			<div className="modal-boxdone__background">
				<div className="modal-boxdone__box">
					<img className="modal-boxdone__icon" src={Cross} onClick={handleModal} />
					<p className="modal-boxdone__text">
						Vous avez déjà finit cette boîte. <br></br> Continuez votre enquête ou rendez-vous sur notre site pour être les
						premiers avertis de nos nouvelles aventures
					</p>
					<button className="modal-boxdone__button button--red" onClick={openWebsite}>
						Se rendre sur le site
					</button>
				</div>
			</div>
		);
	};

	const renderBox = () => {
		if (state == "done") {
			return (
				<>
					<article className="boxchoice boxchoice--done" onClick={handleModal}>
						<div className="boxchoice__picture-wrapper">
							<img src={cover} className="boxchoice__picture" />
						</div>
						<div className="boxchoice__info">
							<h2 className="boxchoice__info__title">Box {boxNumber}</h2>
							<div className="boxchoice__info__icon-wrapper">
								<img src={Check} className="boxchoice__info__icon" />
							</div>
						</div>
					</article>
				</>
			);
		}
		if (state == "open") {
			// This should be a Link
			return (
				<>
					<article className="boxchoice boxchoice--open">
						<div className="boxchoice__picture-wrapper">
							<img src={cover} className="boxchoice__picture" />
						</div>
						<div className="boxchoice__info">
							<h2 className="boxchoice__info__title">Box {boxNumber}</h2>
							<div className="boxchoice__info__icon-wrapper">
								<img src={Lockopen} className="boxchoice__info__icon" />
							</div>
						</div>
					</article>
				</>
			);
		}
		if (state == "closed") {
			return (
				<>
					<article className="boxchoice boxchoice--closed" >
						<div className="boxchoice__picture-wrapper">
							<img src={cover} className="boxchoice__picture" />
						</div>
						<div className="boxchoice__info">
							<h2 className="boxchoice__info__title">Box {boxNumber}</h2>
							<div className="boxchoice__info__icon-wrapper">
								<img src={Lockclosed} className="boxchoice__info__icon" />
							</div>
						</div>
						<div className="boxchoice__greyFilter"></div>
					</article>
				</>
			);
		}
	};

	return (
		<>
			{renderBox()}
			{modal ? renderModal() : ""}
		</>
	);
};

export default BoxChoice;
