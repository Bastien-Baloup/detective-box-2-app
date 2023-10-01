// When audio done, update state to put it into historique
//https://wavesurfer.xyz/

import WaveSurfer from "wavesurfer.js";
import { useEffect, useState, useRef } from "react";

const Audio = ({ title, srcImg1, srcImg2, srcTranscription, handleModalAudio, url }) => {
	const containerRef = useRef();
	const waveSurferRef = useRef(false);
	const [isPlaying, toggleIsPlaying] = useState(false);

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
		waveSurfer.load(url);
		waveSurfer.on("ready", () => {
			waveSurferRef.current = waveSurfer;
		});

		return () => {
			waveSurfer.destroy();
		};
	}, [url]);

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
						toggleIsPlaying(!isPlaying);
						waveSurferRef.current.playPause();
					}}
					type="button"
				>
					{isPlaying ? "play" : "stop"}
				</button>
				<div className="modal-audio__waveform-container" ref={containerRef}></div>
				<button className="modal-audio__button button--red" onClick={handleModalAudio}>
					Reprendre l'enquête
				</button>
				<button className="modal-audio__button button--white" onClick={openInNewTab}>
					Transcription
				</button>
			</div>
		</div>
	);
};

export default Audio;
