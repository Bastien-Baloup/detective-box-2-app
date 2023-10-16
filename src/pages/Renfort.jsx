import { useState } from "react";
import { dataHelp } from "../utils/const/dataHelp";
import Slider from "../components/Slider";
import Check from "../assets/icons/Icon_Check-green.svg";
import LockClosed from "../assets/icons/Icon_Lock-closed-red.svg";
import LockOpen from "../assets/icons/Icon_Lock-open-black.svg";

function Renfort() {
	// if not logged, redirect to Page de connexion
	const [sliderActivated, setSliderActivated] = useState(false);
	const [menuActivated, setmenuActivated] = useState(true);
	const [helpSelected, setHelpSelected] = useState(null);

	const backToHome = () => {
		setSliderActivated(false);
		setmenuActivated(true);
	};

	const openSlider = (data) => {
		setHelpSelected(data);
		setSliderActivated(true);
		setmenuActivated(false);
	};

	const displaySlider = (data) => {
		return <Slider data={data} handleModal={backToHome} />;
	};

	const displayMenu = () => {
		const menuChoices = dataHelp.box1.map((help, index) => {
			console.log(help);
			if (help.status == "done") {
				return (
					<>
						<button className="menu__choice menu__choice--done" key={`helpKey-${index}`}>
							<div className="menu__choice__content">
								<div className="menu__choice__icon-wrapper">
									<img src={Check} className="menu__choice__icon" />
								</div>
								<h3 className="menu__choice__title">{help.title}</h3>
							</div>
						</button>
					</>
				);
			}
			if (help.status == "open") {
				return (
					<>
						<button className="menu__choice menu__choice--open" onClick={() => openSlider(help)} key={`helpKey-${index}`}>
							<div className="menu__choice__content">
								<div className="menu__choice__icon-wrapper">
									<img src={LockOpen} className="menu__choice__icon" />
								</div>
								<h3 className="menu__choice__title">{help.title}</h3>
							</div>
						</button>
					</>
				);
			}
			if (help.status == "closed") {
				return (
					<>
						<button className="menu__choice menu__choice--closed" key={`helpKey-${index}`}>
							<div className="menu__choice__icon-wrapper--closed">
								<img src={LockClosed} className="menu__choice__icon" />
							</div>
							<h3 className="menu__choice__title--closed">Ce renfort est bloqué pour le moment</h3>
						</button>
					</>
				);
			}
		});
		return menuChoices;
	};

	return (
		<div className="main__help">
			<p className="help__title"> Choisissez le sujet sur lequel vous avez besoin de renfort :</p>
			<div className="help__menu">{menuActivated ? displayMenu() : null}</div>
			{sliderActivated ? displaySlider(helpSelected) : null}
		</div>
	);
}
export default Renfort;
