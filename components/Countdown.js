import { useState, useEffect } from "react";

const defaultRemainingTime = {
	hours: '00',
	minutes: '00',
	seconds: '00'
}

const Countdown = () => {
	const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

	useEffect(() => {
		const intervalId = setInterval(() => {
			updateRemainingTime()
		}, 1000)
		return () => clearTimeout(intervalId)
	})

	function updateRemainingTime() {
		const date = new Date()
		const timeLeft = {
			hours: 23 - date.getUTCHours(),
			minutes: (59 - date.getUTCMinutes()).toString().padStart(2, '0'),
			seconds: (59 - date.getUTCSeconds()).toString().padStart(2, '0')
		}
		setRemainingTime(timeLeft)
	}

	return (
		<div className= { remainingTime.hours<1 ? "text-danger" : "" } >
			{ remainingTime.hours + "h : " + remainingTime.minutes + "m : " + remainingTime.seconds + "s" }
		</div>
	)
}

export default Countdown