// When audio done, update state to put it into historique
//https://wavesurfer.xyz/

import WaveSurfer from "wavesurfer.js";
import { useEffect, useState, useRef } from "react";

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
				<button
					onClick={() => {
						setIsPlaying(!isPlaying);
						waveSurferRef.current.playPause();
					}}
					type="button"
				>
					{isPlaying ? "play" : "stop"}
				</button>
				<div className="modal-audio__waveform-container" ref={containerRef}></div>
				<div className="modal-audio__buttons">
					<button className="modal-audio__button button--red" onClick={handleModalAudio}>
						Reprendre l'enquête
					</button>
					<button className="modal-audio__button button--white" onClick={openInNewTab}>
						Transcription
					</button>
				</div>
			</div>
		</div>
	);
};

export default Audio;
