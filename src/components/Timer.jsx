import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Timer = ({ initialMinute, initialSecond, timerEndedFunction }) => {
	const [minutes, setMinutes] = useState(initialMinute);
	const [seconds, setSeconds] = useState(initialSecond);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	const timerEnded = () => {
		timerEndedFunction();
		return <div className="timer timer--red">00:00</div>;
	};

	return (
		<div className="timer--container">
			{minutes === 0 && seconds === 0 ? (
				timerEnded()
			) : (
				<div className={"timer" + (minutes === 0 && seconds <= 10 ? " timer--red" : "")}>
					{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</div>
			)}
		</div>
	);
};

Timer.propTypes = {
	initialMinute: PropTypes.number,
	initialSecond: PropTypes.number,
	timerEndedFunction: PropTypes.func,
};

export default Timer;
