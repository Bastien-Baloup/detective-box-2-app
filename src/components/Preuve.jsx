import Archive from "../assets/icons/Icon_mini_Archive.svg";
import Document from "../assets/icons/Icon_mini_Document.svg";
import Interrogation from "../assets/icons/Icon_mini_Interrogation.svg";
import Location from "../assets/icons/Icon_mini_Location.svg";
import Video from "../assets/icons/Icon_mini_Video.svg";

const Preuve = ({ title, category, detail, cover, handleModal }) => {
	const findIcon = () => {
		if (category == "Archive") {
			return Archive;
		}
		if (category == "Document") {
			return Document;
		}
		if (category == "Interrogatoire") {
			return Interrogation;
		}
		if (category == "Lieu") {
			return Location;
		}
		if (category == "Vidéo") {
			return Video ;
		}
	};

	return (
		<article className="clue" onClick={handleModal}>
			<div className="clue__picture-wrapper">
				<img src={cover} className="clue__picture" />
			</div>
			<div className="clue__info">
				<div className="clue__info--main">
					<h2 className="clue__main__title">{title}</h2>
					<div className="clue__main__icon-wrapper">
						<img src={findIcon()} className="clue__main__icon" />
					</div>
				</div>
				<div className="clue__info--detail">{detail}</div>
			</div>
		</article>
	);
};

export default Preuve;
