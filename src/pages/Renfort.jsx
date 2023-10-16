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
		dataHelp.box1.map((help, index) => {
			if (help.status == "done") {
				return (
					<>
						<button className="objectif objectif--done" key={`helpKey-${index}`}>
							<div className="objectif__mainInfo">
								<div className="objectif__icon-wrapper">
									<img src={Check} className="objectif__icon" />
								</div>
								<h3 className="objectif__title">{help.title}</h3>
							</div>
						</button>
					</>
				);
			}
			if (help.status == "open") {
				return (
					<>
						<button className="objectif objectif--open" onClick={() => openSlider(help)} key={`helpKey-${index}`}>
							<div className="objectif__mainInfo">
								<div className="objectif__icon-wrapper">
									<img src={LockOpen} className="objectif__icon" />
								</div>
								<h3 className="objectif__title">{help.title}</h3>
							</div>
						</button>
					</>
				);
			}
			if (help.status == "closed") {
				return (
					<>
						<article className="objectif objectif--closed" key={`helpKey-${index}`}>
							<div className="objectif__icon-wrapper--closed">
								<img src={LockClosed} className="objectif__icon" />
							</div>
							<h3 className="objectif__title--closed">Ce renfort est bloqué pour le moment</h3>
						</article>
					</>
				);
			}
		});
	};

	return (
		<div className="main__help">
			{menuActivated ? displayMenu() : null}
			{sliderActivated ? displaySlider(helpSelected) : null}
		</div>
	);
}
export default Renfort;
