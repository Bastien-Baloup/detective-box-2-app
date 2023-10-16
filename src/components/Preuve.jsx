import PropTypes from "prop-types";
import Archive from "../assets/icons/Icon_mini_Archive.svg";
import Document from "../assets/icons/Icon_mini_Document.svg";
import Interrogation from "../assets/icons/Icon_mini_Interrogation.svg";
import Location from "../assets/icons/Icon_mini_Location.svg";
import Video from "../assets/icons/Icon_mini_Video.svg";

const Preuve = ({ data }) => {
	const findIcon = () => {
		if (data.category == "Archive") {
			return Archive;
		}
		if (data.category == "Document") {
			return Document;
		}
		if (data.category == "Interrogatoire") {
			return Interrogation;
		}
		if (data.category == "Lieu") {
			return Location;
		}
		if (data.category == "Vidéo") {
			return Video;
		}
	};

	const displayCorrespondingModal = () => {
		if (data.category == "Archive") {
			alert("vous ouvrez une archive");
		}
		if (data.category == "Document") {
			alert("vous ouvrez un document");
		}
		if (data.category == "Interrogatoire") {
			alert("vous ouvrez un interrogatoire");
		}
		if (data.category == "Lieu") {
			alert("vous ouvrez un lieu");
		}
		if (data.category == "Vidéo") {
			alert("vous ouvrez une vidéo");
		}
	};

	return (
		<article className="clue" onClick={displayCorrespondingModal} tabIndex="0">
			<div className="clue__picture-wrapper">
				<img src={data.poster} className="clue__picture" />
			</div>
			<div className="clue__info">
				<div className="clue__info--main">
					<h2 className="clue__main__title">{data.title}</h2>
					<div className="clue__main__icon-wrapper">
						<img src={findIcon()} className="clue__main__icon" />
					</div>
				</div>
				<div className="clue__info--detail">{data.detail}</div>
			</div>
		</article>
	);
};

Preuve.propTypes = {
	data: PropTypes.object,
};

export default Preuve;
