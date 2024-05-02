import React, {useEffect, useState} from 'react';
import "./tournaments.css"

const Timer = ({ deadline }) => {
	const calculateTimeLeft = () => {
		const deadlineDate = new Date(deadline );
		deadlineDate.setMinutes(deadlineDate.getMinutes() - 20);
		const difference = deadlineDate.getTime() - Date.now();
		let timeLeft = {};
		
		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}
		
		return timeLeft;
	};
	
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	
	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		
		return () => clearTimeout(timer);
	});
	
	return (
			<div className={"timer-box"}>
				{timeLeft.days > 0 && (
						<div className="timer-item" >{timeLeft.days} д </div>
				)}
				{timeLeft.hours > 0 && (
						<div className="timer-item" >{timeLeft.hours} ч </div>
				)}
				{timeLeft.minutes > 0 && (
						<div className="timer-item" >{timeLeft.minutes} м</div>
				)}
				{timeLeft.seconds > 0 && (
						<div className="timer-item" >{timeLeft.seconds} с</div>
				)}
			</div>
	);
};

export default Timer;
