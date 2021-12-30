import { useMoralis } from "react-moralis"
import { useState, useEffect } from "react";
import Link from "next/link";

function CreateNewHabit() {
	const { Moralis, user } = useMoralis();

	const [saveStatus, setSaveStatus] = useState({status: "", description: ""});
	const [habit, setHabit] = useState({
		address: user.get('ethAddress'),
		description: "",
		daysAgo0: true,
		daysAgo1: true,
		daysAgo2: true,
		daysAgo3: true,
		daysAgo4: true,
		daysAgo5: true,
		daysAgo6: true,
		completedDaysAgo0: false,
		completedDaysAgo1: false,
		completedDaysAgo2: false,
		completedDaysAgo3: false,
		completedDaysAgo4: false,
		completedDaysAgo5: false,
		completedDaysAgo6: false
	});

	const addHabit = (e) => {
		e.preventDefault();
		if (!habit.description) return;

		const Habits = Moralis.Object.extend("Habits");
		const habits = new Habits();
		habits.setACL(new Moralis.ACL(Moralis.User.current()));

		habits.save(habit)
		.then(
			() => {
				console.log('success');
				setSaveStatus({status: 'success', description: habit.description});
			},
			(error) => {
				console.log(error.message);
				setSaveStatus({status: 'error', description: ''});
			}
		);
	}

	return (
		<div className="container-fluid p-4">
			<div className="row">
				<div className="col-lg-6 col-md-9">
					<h3>How to Add a Habit</h3>
					<form onSubmit={ addHabit }>
						<h5 className="mt-4">{ "Step 1 - What's your habit?" }</h5>
						<div>
							<input type="text" required className="form-control" id="description" placeholder="Habit Description" autoComplete="off" onChange={(e) => setHabit({...habit, ...{description: e.target.value}})} />
						</div>

						<h5 className="mt-4">{ "Step 2 - Choose the days you'll perform this habit" }</h5>
						<div className="form-check form-switch">
							<label htmlFor="sunday" className="form-check-label">{ "Sunday" }</label>
							<input type="checkbox" className="form-check-input" id="sunday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo0: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="monday" className="form-check-label">{ "Monday" }</label>
							<input type="checkbox" className="form-check-input" id="monday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo1: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="tuesday" className="form-check-label">{ "Tuesday" }</label>
							<input type="checkbox" className="form-check-input" id="tuesday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo2: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="wednesday" className="form-check-label">{ "Wednesday" }</label>
							<input type="checkbox" className="form-check-input" id="wednesday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo3: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="thursday" className="form-check-label">{ "Thursday" }</label>
							<input type="checkbox" className="form-check-input" id="thursday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo4: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="friday" className="form-check-label">{ "Friday" }</label>
							<input type="checkbox" className="form-check-input" id="friday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo5: e.target.checked}})} />
						</div>
						<div className="form-check form-switch">
							<label htmlFor="saturday" className="form-check-label">{ "Saturday" }</label>
							<input type="checkbox" className="form-check-input" id="saturday" defaultChecked onClick={(e) => setHabit({...habit, ...{daysAgo6: e.target.checked}})} />
						</div>

						<h5 className="mt-4">Step 3 - Submit your new habit</h5>
						<button type="submit" className="btn btn-danger gradientButton text-dark">Add Habit</button>
						<Link href="/">
							<button className="btn btn-light ms-3">Cancel</button>
						</Link>
					</form>
				</div>
			</div>
			<div className="w-50 mt-3 text-center lead">
				<div className={'alert alert-danger gradientBackground ' + (saveStatus.status == 'success' ? '' : 'd-none')}>
					{ 'Success! Your new habit "' + saveStatus.description + '" was added.' }
				</div>
				<div className={'alert alert-warning ' + (saveStatus.status == 'error' ? '' : 'd-none')}>
					Something went wrong. Try again and if errors persist, please let us know in our Discord
				</div>
			</div>
		</div>
	)
}

export default CreateNewHabit
