import { testData } from "../data/testData"
import DailyButton from "./DailyButton"
import Link from "next/link"
import styles from "./Will.module.scss"

const loggedUser = testData.users[0]

const valuePerTask = loggedUser.treasuryAllocation / loggedUser.tasks.length

const weekdays = [
	"Sun",
	"Mon",
	"Tues",
	"Wed",
	"Thur",
	"Fri",
	"Sat"
]

function getDayofWeek(daysAgo, nameOrNum) {
	const dateObj = new Date()
	const pastDate = dateObj.getUTCDate() - daysAgo				// - 1 for correct array address
	dateObj.setDate(pastDate)
	if (nameOrNum == "num") {
		return dateObj.getUTCDay()
	} else {
		return weekdays[dateObj.getUTCDay()]
	}
}

function getSum() {
	let sumOfFinalDay = 0.0000;
	const dayofWeek = getDayofWeek(6, "num");

	{loggedUser.tasks.map((task) => {
		const count = task.days.filter(Boolean).length;
		const valuePerDay = valuePerTask / count;
		if (task.days[dayofWeek] && task.completed[dayofWeek]) {
			sumOfFinalDay += valuePerDay
		} else {
			sumOfFinalDay -= valuePerDay
		}
	})};
	return sumOfFinalDay;
}

const Will = () => {
	return (
		<div className="container-fluid">
			<table className="table align-middle">
				<thead>
					<tr>
						<th scope="col">Description of Habit</th>
						<th className="text-center" scope="col">Value</th>
						<th className="text-center" scope="col">{getDayofWeek(0, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(1, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(2, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(3, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(4, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(5, "name")}</th>
						<th className="text-center" scope="col">{getDayofWeek(6, "name")}</th>
					</tr>
				</thead>
				<tbody>
					{loggedUser.tasks.map((task, index) => {
						const count = task.days.filter(Boolean).length;
						const valuePerDay = valuePerTask / count;

						return (
							<tr key={index}>
								<th scope="row">{task.description}</th>
								<td className="text-center">{valuePerTask}</td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(0, "num")} col={0}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(1, "num")} col={1}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(2, "num")} col={2}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(3, "num")} col={3}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(4, "num")} col={4}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(5, "num")} col={5}></DailyButton></td>
								<td className="text-center"><DailyButton valuePerDay={valuePerDay} task={task} dayofWeek={getDayofWeek(6, "num")} col={6}></DailyButton></td>
							</tr>
						)
					})}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={8} className="text-end"><h5>Today's Locked Value:</h5></td>
						<td className="text-center align-middle">
							<div className="m-auto d-flex align-items-center justify-content-center position-relative" style={{width:"72px", height:"72px"}}>
								<div className={styles.outerRing}></div>
								<div className={styles.innerRing}></div>
								<div className={styles.innerText + " text-dark d-flex align-items-center justify-content-center"}>
									<strong>{getSum().toFixed(4)}</strong>
								</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
			<div className="text-center">
				<Link href="/new-habit">
					<button className="btn btn-danger">
						<i className="fas fa-plus me-2"></i>
						Add a new habit
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Will