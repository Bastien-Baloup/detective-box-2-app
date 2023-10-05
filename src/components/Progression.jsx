import RoundWhite from "../assets/icons/Icon_Round-white.svg";
import RoundRed from "../assets/icons/Icon_Round-red.svg";
import LineMediumWhite from "../assets/icons/Icon_Line_Medium-white.svg";
import LineSmallWhite from "../assets/icons/Icon_Line_Small-white.svg";
import LineBigRed from "../assets/icons/Icon_Line_Big-red.svg";
import LineMediumRed from "../assets/icons/Icon_Line_Medium-red.svg";
import LineSmallRed from "../assets/icons/Icon_Line_Small-red.svg";
import CheckWhite from "../assets/icons/Icon_Check-white.svg";
import CrossRed from "../assets/icons/Icon_Cross-red.svg";
import Flag from "../assets/icons/Icon_Flag.svg";
import { useState } from "react";

const Progression = () => {
	// Here we will get the current Box with Context <=> DBB
	const [currentBox, setCurrentBox] = useState(1);
	// This const is to test the componant. We will get the current step with DBB
	const [currentStep, setCurrentStep] = useState(0);

	//This const is to test the component only
	const addAStep = () => {
		const stepMax = 4;
		if (currentStep < stepMax) {
			setCurrentStep(currentStep + 1);
		}
		if (currentStep === stepMax) {
			setCurrentStep(0);
		}
	};

	const trackBox = (box) => {
		const boxPlayed = box < currentBox;

		if (boxPlayed) {
			return (
				<>
					<img className="progressBar__box__icon-small" src={RoundWhite} />
					<img className="progressBar__box__icon-small" src={LineMediumWhite} />
					<img className="progressBar__box__icon-small" src={RoundWhite} />
					<img className="progressBar__box__icon-small" src={LineSmallWhite} />
					<img className="progressBar__box__icon-small" src={RoundWhite} />
					<img className="progressBar__box__icon-small" src={LineSmallWhite} />
					<img className="progressBar__box__icon-small" src={RoundWhite} />
				</>
			);
		}
		return (
			<>
				<img className="progressBar__box__icon-small" src={currentStep < 1 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 2 ? LineMediumRed : LineMediumWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 2 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 3 ? LineSmallRed : LineSmallWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 3 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 4 ? LineSmallRed : LineSmallWhite} />
				<img className="progressBar__box__icon-small" src={currentStep < 4 ? RoundRed : RoundWhite} />
			</>
		);
	};

	const noTrackBox = () => {
		return (
			<>
				<img className="progressBar__box__icon-small" src={RoundRed} />
				<img className="progressBar__box__icon-small" src={LineBigRed} />
				<img className="progressBar__box__icon-small" src={RoundRed} />
			</>
		);
	};

	return (
		<>
			<div className="progressBar">
				<div className="progressBar__box">
					<img className="progressBar__box__icon-main" src={CheckWhite} />
					<div className="progressBar__box__steps">
						<div className="progressBar__box__title-played">Box 1</div>
						<div className="progressBar__box__icons">{trackBox(1)}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon-main" src={currentBox != 1 ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox != 1 ? "-played" : ""}`}>Box 2</div>
						<div className="progressBar__box__icons">{currentBox != 1 ? trackBox(2) : noTrackBox()}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon-main" src={currentBox == 3 ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox == 3 ? "-played" : ""}`}>Box 3</div>
						<div className="progressBar__box__icons">{currentBox == 3 ? trackBox(3) : noTrackBox()}</div>
					</div>
					<img className="progressBar__box__icon-main" src={Flag} />
				</div>
			</div>
			{/* These button are to test the component only */}
			<button onClick={() => setCurrentBox(1)}>Box 1</button>
			<button onClick={() => setCurrentBox(2)}>Box 2</button>
			<button onClick={() => setCurrentBox(3)}>Box 3</button>
			<button onClick={addAStep}>Add a step</button>
		</>
	);
};

export default Progression;
