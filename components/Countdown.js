import { useState, useEffect } from "react";

const Countdown = ({remainingTime, setRemainingTime, newDay, setNewDay}) => {
	// const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

	useEffect(() => {
		const intervalId = setInterval(() => {
			updateRemainingTime()
		}, 1000)
		return () => clearTimeout(intervalId)
	})

	function updateRemainingTime() {
		const date = new Date()
		let timeLeft = {
			hours: 23 - date.getUTCHours(),
			minutes: (59 - date.getUTCMinutes()).toString().padStart(2, '0'),
			seconds: (59 - date.getUTCSeconds()).toString().padStart(2, '0')
		}
		// let timeLeft = {
		// 	hours: "0",
		// 	minutes: "00",
		// 	seconds: (59 - date.getUTCSeconds()).toString().padStart(2, '0'),
		// 	string: ''
		// }
		timeLeft.string = timeLeft.hours + "h : " + timeLeft.minutes + "m : " + timeLeft.seconds + "s"
		setRemainingTime(timeLeft)
		if (remainingTime.string == "0h : 00m : 00s") {
			setNewDay(true)
		}
		else if (newDay == true) {
			setNewDay(false)
		}
	}

	return (
		<div className= { remainingTime.hours<1 ? "text-danger" : "" } >
			{ remainingTime.string }
		</div>
	)
}

export default Countdown