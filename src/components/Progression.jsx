// EXPLICATION : Ce composant retourne la barre de progression qui se met à jour avec les objectifs.
// EXPLICATION : Ce composant est utilisé dans le Header

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
import { BoxContext, AuthContext } from "../utils/context/fetchContext";
import { useContext, useState, useEffect } from "react";
// import { dataObjectif } from "../utils/const/dataObjectif";
import { getObjectivesByBox } from "../utils/hooks/useApi.js";

const Progression = () => {
	const { currentBox } = useContext(BoxContext);
	const { token } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getObjectivesByBox(token, currentBox);
			setDataObjectif(result.data);
		};
		fetchData();
	}, [token, currentBox]);

	const [dataObjectif, setDataObjectif] = useState(null);
	const currentStep = dataObjectif?.filter((element) => element.status == "done").length;

	const trackBox = (box) => {
		const boxPlayed = box < currentBox;
		// EXPLICATION : Si la box a été jouée (box < currentbox), alors on retourne ces icones
		// EXPLICATION : Si la box est en cours, alors on affiche les icones en fonction des étapes de validation des objectifs
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

	// EXPLICATION : Si la box n'est pas encore jouée, afficher ces icones
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
						<div className="progressBar__box__icons">{trackBox(1)}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon--main" src={currentBox != 1 ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox != 1 ? "--played" : ""}`}>Box 2</div>
						<div className="progressBar__box__icons">{currentBox != 1 ? trackBox(2) : noTrackBox()}</div>
					</div>
				</div>
				<div className="progressBar__box">
					<img className="progressBar__box__icon--main" src={currentBox == "box3" ? CheckWhite : CrossRed} />
					<div className="progressBar__box__steps">
						<div className={`progressBar__box__title${currentBox == 3 ? "--played" : ""}`}>Box 3</div>
						<div className="progressBar__box__icons">{currentBox == 3 ? trackBox(3) : noTrackBox()}</div>
					</div>
					<img className="progressBar__box__icon--main" src={Flag} />
				</div>
			</div>
		</>
	);
};

export default Progression;
