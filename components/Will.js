import { testData } from "../data/testData"
import Link from "next/link"
import styles from "./Will.module.scss"
import { useMoralis, useMoralisQuery } from "react-moralis"

import { useState, useEffect } from "react"
import WillTable from "./WillTable"

const Will = ({newDay}) => {
	const { user } = useMoralis();

	const loggedUser = testData.users[0]
	// const valuePerTask = loggedUser.treasuryAllocation / loggedUser.tasks.length
	

	const { data, error, isLoading } = useMoralisQuery(
		"Habits",
		query =>
			query
				.equalTo("address", user.get('ethAddress')),
				[],
				{
					live: true,
				},
	);

	const valuePerHabit = user.get('allocation') / data.length


	function getSum() {
		let sumOfFinalDay = 0.0000;
		const dayofWeek = getDayofWeek(6, "num");

		loggedUser.tasks.map((task) => {
			const count = task.days.filter(Boolean).length;
			const valuePerDay = valuePerHabit / count;
			if (task.days[dayofWeek] && task.completed[dayofWeek]) {
				sumOfFinalDay += valuePerDay
			} else {
				sumOfFinalDay -= valuePerDay
			}
		});
		return sumOfFinalDay;
	}

	// useEffect(() => {
	// 	console.log('something')
	// }, [newDay])


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

	return (
		<div className="container-fluid">
			<div className="table-responsive">
				<table className="table align-middle">
					<thead>
						<tr>
							<th scope="col">{ "Description of Habit" }</th>
							<th className="text-center" scope="col">{ "Value" }</th>
							<th className="text-center" scope="col">{ getDayofWeek(0, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(1, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(2, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(3, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(4, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(5, "name") }</th>
							<th className="text-center" scope="col">{ getDayofWeek(6, "name") }</th>
						</tr>
					</thead>
					<tbody>
						<WillTable newDay={newDay} getDayofWeek={getDayofWeek} data={data} isLoading={isLoading} valuePerHabit={valuePerHabit}></WillTable>
					</tbody>
					<tfoot>
						<tr className="d-none d-md-table-row">
							<td colSpan={8} className="text-end"><h5>{ "Today's Locked Value:" }</h5></td>
							<td className="text-center align-middle">
								<div className="m-auto d-flex align-items-center justify-content-center position-relative" style={{width:"72px", height:"72px"}}>
									<div className={styles.outerRing}></div>
									<div className={styles.innerRing}></div>
									<div className={styles.innerText + " text-dark d-flex align-items-center justify-content-center"}>
										<strong>{ getSum().toFixed(4) }</strong>
									</div>
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div className="d-md-none d-flex align-items-center justify-content-end me-2 mt-2">
				<div className="text-right me-2">
					<h5>{ `Today's Locked Value:` }</h5>
				</div>
				<div className="text-center align-middle">
					<div className="m-auto d-flex align-items-center justify-content-center position-relative" style={{width:"72px", height:"72px"}}>
						<div className={styles.outerRing}></div>
						<div className={styles.innerRing}></div>
						<div className={styles.innerText + " text-dark d-flex align-items-center justify-content-center"}>
							<strong>{ getSum().toFixed(4) }</strong>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center mt-3">
				<Link href="/new-habit">
					<button className="btn btn-danger">
						<i className="fas fa-plus me-2"></i>
						{ "Add a new habit" }
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Will