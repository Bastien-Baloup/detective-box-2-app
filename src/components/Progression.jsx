import { useState } from "react";
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
import { BoxContext } from "../utils/context/fetchContext";
import { useContext } from "react";

// rendre les points équidistants dans la box 3

const Progression = () => {
	const { currentBox } = useContext(BoxContext);
	// This const is to test the componant. We will get the current step with DBB
	const [currentStep, setCurrentStep] = useState(0);

	//This const is to test the component only
	// const addAStep = () => {
	// 	const stepMax = 4;
	// 	if (currentStep < stepMax) {
	// 		setCurrentStep(currentStep + 1);
	// 	}
	// 	if (currentStep === stepMax) {
	// 		setCurrentStep(0);
	// 	}
	// };

	const trackBox = (box) => {
		const boxPlayed = box < currentBox;

		if (boxPlayed) {
			return (
				<>
					<img className="progressBar__box__icon--small" src={RoundWhite} />
					<img className="progressBar__box__icon--small" src={LineMediumWhite} />
					<img className="progressBar__box__icon--small" src={RoundWhite} />
					<img className="progressBar__box__icon--small" src={LineSmallWhite} />
					<img className="progressBar__box__icon--small" src={RoundWhite} />
					<img className="progressBar__box__icon--small" src={LineSmallWhite} />
					<img className="progressBar__box__icon--small" src={RoundWhite} />
				</>
			);
		}
		return (
			<>
				<img className="progressBar__box__icon--small" src={currentStep < 1 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 2 ? LineMediumRed : LineMediumWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 2 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 3 ? LineSmallRed : LineSmallWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 3 ? RoundRed : RoundWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 4 ? LineSmallRed : LineSmallWhite} />
				<img className="progressBar__box__icon--small" src={currentStep < 4 ? RoundRed : RoundWhite} />
			</>
		);
	};

	const noTrackBox = () => {
		return (
			<>
				<img className="progressBar__box__icon--small" src={RoundRed} />
				<img className="progressBar__box__icon--small" src={LineBigRed} />
				<img className="progressBar__box__icon--small" src={RoundRed} />
			</>
		);
	};

	return (
		<>
			<div className="progressBar">
				<div className="progressBar__box">
					<img className="progressBar__box__icon--main" src={CheckWhite} />
					<div className="progressBar__box__steps">
						<div className="progressBar__box__title--played">Box 1</div>
						<div className="progressBar__box__icons">{trackBox("box1")}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon--main" src={currentBox != "box1" ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox != "box1" ? "--played" : ""}`}>Box 2</div>
						<div className="progressBar__box__icons">{currentBox != "box1" ? trackBox("box2") : noTrackBox()}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon--main" src={currentBox == "box3" ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox == "box3" ? "--played" : ""}`}>Box 3</div>
						<div className="progressBar__box__icons">{currentBox == "box3" ? trackBox("box3") : noTrackBox()}</div>
					</div>
					<img className="progressBar__box__icon--main" src={Flag} />
				</div>
			</div>
		</>
	);
};

export default Progression;
