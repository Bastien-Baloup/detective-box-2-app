import { useState } from "react";
import { dataHelp } from "../utils/const/dataHelp";
import Slider from "../components/Slider";

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
		return dataHelp.box1.map((help, index) => (
			<button onClick={() => openSlider(help)} key={`helpKey-${index}`}>
				{help.title}
			</button>
		));
	};

	return (
		<div className="main__help">
			{menuActivated ? displayMenu() : null}
			{sliderActivated ? displaySlider(helpSelected) : null}
		</div>
	);
}
export default Renfort;
