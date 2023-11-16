// EXPLICATION : Ce composant permet d'afficher les modales videos.

import PropTypes from "prop-types";
import { useState } from "react";
import { AmbianceContext } from "../utils/context/fetchContext.jsx";
import { useContext } from "react";

const Video = ({ title, srcVideo, handleModalVideo, delayedButton }) => {
	const [isDone, setIsDone] = useState(false);
	const { fetchResumeNappe } = useContext(AmbianceContext);

	const handleEndVideoModal = () => {
		fetchResumeNappe();
		handleModalVideo();
	};

	const handleVideoEnded = () => {
		setIsDone(true);
	};

	// EXPLICATION : Attention, le bouton peut s'afficher une fois la vidéo finie (forcer les joueurs à la regarder jusqu'au bout) ou dès le départ (utile dans l'historique par exemple)
	return (
		<div className="modal-video__background">
			<div className="modal-video__box">
				<p className="modal-video__title">{title}</p>
				<div className="modal-video__video-container">
					<video
						className={"modal-video__video"}
						width="320"
						height="240"
						controls
						controlsList="nodownload"
						onContextMenu={(e) => e.preventDefault()}
						onLoadStart={delayedButton == false ? handleVideoEnded : null}
						onEnded={delayedButton == true ? handleVideoEnded : null}
					>
						<source src={srcVideo} type="video/mp4" />
					</video>
				</div>
				<button className={"modal-video__button" + (isDone ? "-show" : "") + " button--red"} onClick={handleEndVideoModal}>
					Continuer l&apos;enquête
				</button>
			</div>
		</div>
	);
};

Video.propTypes = {
	title: PropTypes.string,
	srcVideo: PropTypes.string,
	handleModalVideo: PropTypes.func,
	delayedButton: PropTypes.bool,
};

export default Video;
