import { testData } from "../data/testData"
import Link from "next/link"

export default function NewHabit() {
	const addHabit = event => {
    event.preventDefault()

    console.log(JSON.stringify({
        description: event.target.description.value,
				days: [
					event.target.sunday.checked,
					event.target.monday.checked,
					event.target.tuesday.checked,
					event.target.wednesday.checked,
					event.target.thursday.checked,
					event.target.friday.checked,
					event.target.saturday.checked,
				]
      })
		)
	}


  return (
		<div className="container-fluid p-4">
			<div className="row">
				<div className="col-lg-6 col-md-9">
					<h3>How to Add a Habit</h3>
					
					<form onSubmit={ addHabit }>
						<h5 className="mt-4">{ "Step 1 - What's your habit?" }</h5>
						<div>
							<input type="text" className="form-control" id="description" placeholder="Habit Description" autoComplete="off" />
						</div>

						<h5 className="mt-4">{ "Step 2 - Choose the days you'll perform this habit" }</h5>
						<div className="form-check form-switch">
							<label htmlFor="sunday" className="form-check-label">{ "Sunday" }</label>
							<input type="checkbox" className="form-check-input" id="sunday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="monday" className="form-check-label">{ "Monday" }</label>
							<input type="checkbox" className="form-check-input" id="monday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="tuesday" className="form-check-label">{ "Tuesday" }</label>
							<input type="checkbox" className="form-check-input" id="tuesday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="wednesday" className="form-check-label">{ "Wednesday" }</label>
							<input type="checkbox" className="form-check-input" id="wednesday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="thursday" className="form-check-label">{ "Thursday" }</label>
							<input type="checkbox" className="form-check-input" id="thursday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="friday" className="form-check-label">{ "Friday" }</label>
							<input type="checkbox" className="form-check-input" id="friday" defaultChecked />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="saturday" className="form-check-label">{ "Saturday" }</label>
							<input type="checkbox" className="form-check-input" id="saturday" defaultChecked />
						</div>

						<h5 className="mt-4">Step 3 - Submit your new habit</h5>
						<button type="submit" className="btn btn-danger gradientButton text-dark">Add Habit</button>
						<Link href="/">
							<button className="btn btn-light ms-3">Cancel</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}