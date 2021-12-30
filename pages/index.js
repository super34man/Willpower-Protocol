import Will from "../components/Will"
import GettingStarted from "../components/GettingStarted"
import Stats from "../components/Stats"
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

const defaultRemainingTime = {
	hours: '--',
	minutes: '--',
	seconds: '--',
	string: ''
}

export default function Home() {
	const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
	const [newDay, setNewDay] = useState(false)

	const { isAuthenticated } = useMoralis();

	if (!isAuthenticated) return <GettingStarted isAuth={false}></GettingStarted>

  return (
    <div>
      <main>
				<GettingStarted isAuth={true}></GettingStarted>
				<Stats
					remainingTime={remainingTime}
					setRemainingTime={setRemainingTime}
					newDay={newDay}
					setNewDay={setNewDay}
				></Stats>
        <Will
					remainingTime={remainingTime}
					newDay={newDay}
				></Will>
      </main>
    </div>
  )
}
