// When audio done, update state to put it into historique
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import Play from "../assets/icons/Icon_Play.svg";
import Pause from "../assets/icons/Icon_Pause.svg";
import WaveSurfer from "wavesurfer.js";

// Augmenter la taille des photos

const Audio = ({ title, srcImg1, srcImg2, srcTranscription, handleModalAudio, srcAudio }) => {
	const containerRef = useRef();
	const waveSurferRef = useRef(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const waveSurfer = WaveSurfer.create({
			container: containerRef.current,
			responsive: true,
			waveColor: "#ffff",
			progressColor: "#e30613",
			cursorColor: "transparent",
			barWidth: 1,
			barRadius: 1,
			barGap: 5,
			barMinHeight: 50,
			cursorWidth: 1,
			autoplay: true,
			dragToSeek: true,
		});
		waveSurfer.load(srcAudio);
		waveSurfer.on("ready", () => {
			waveSurferRef.current = waveSurfer;
		});

		return () => {
			waveSurfer.destroy();
		};
	}, [srcAudio]);

	const openInNewTab = () => {
		window.open(srcTranscription, "_blank");
	};

	return (
		<div className="modal-audio__background">
			<div className="modal-audio__box">
				<p className="modal-audio__title">{title}</p>
				<div className="modal-audio__portraits">
					<div className="modal-audio__portrait-container">
						<img className="modal-audio__portrait" src={srcImg1} />
					</div>
					<div className="modal-audio__portrait-container">
						<img className="modal-audio__portrait" src={srcImg2} />
					</div>
				</div>
				<div className="modal-audio__player">
					<button
						className="modal-audio__player__button"
						onClick={() => {
							setIsPlaying(!isPlaying);
							waveSurferRef.current.playPause();
						}}
					>
						<img className="modal-audio__player__icon" src={isPlaying ? Play : Pause} />
					</button>
					<div className="modal-audio__player__waveform-container" ref={containerRef}></div>
				</div>
				<div className="modal-audio__buttons">
					<button className="modal-audio__button--resume button--red" onClick={handleModalAudio}>
						Reprendre l&apos;enquête
					</button>
					<button className="modal-audio__button--display button--white" onClick={openInNewTab}>
						Transcription
					</button>
				</div>
			</div>
		</div>
	);
};

Audio.propTypes = {
	title: PropTypes.string,
	srcImg1: PropTypes.string,
	srcImg2: PropTypes.string,
	srcTranscription: PropTypes.string,
	handleModalAudio: PropTypes.func,
	srcAudio: PropTypes.string,
};

export default Audio;
