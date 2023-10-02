// When document seen, update state to put it into historique
import { useState } from "react";

const Video = ({ title, srcVideo, handleModalVideo }) => {
	const [isDone, setIsDone] = useState(false);

	const handleVideoEnded = () => {
		setIsDone(true);
	};

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
						onEnded={handleVideoEnded}
					>
						<source src={srcVideo} type="video/mp4" />
					</video>
				</div>
				<button className={"modal-video__button" + (isDone ? "-show" : "") + " button--red"} onClick={handleModalVideo}>
					Reprendre l'enquête
				</button>
			</div>
		</div>
	);
};

export default Video;
