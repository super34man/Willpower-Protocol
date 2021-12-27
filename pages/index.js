import Will from "../components/Will"
import GettingStarted from "../components/GettingStarted"
import Stats from "../components/Stats"

export default function Home() {
  return (
    <div>
      <main>
				<GettingStarted></GettingStarted>
				<Stats></Stats>
        <Will></Will>
      </main>
    </div>
  )
}
