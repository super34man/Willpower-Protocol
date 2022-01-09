import { testData } from "../data/testData"
import Link from "next/link"
import styles from "./Will.module.scss"
import { useMoralis, useMoralisQuery } from "react-moralis"

import { useState, useEffect } from "react"
import WillTable from "./WillTable"

const Will = ({newDay}) => {
	const { user } = useMoralis();

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

	const valuePerHabit = user.get('allocation') / data.length

	const getDayofWeek = (daysAgo, nameOrNum) => {
		const dateObj = new Date()
		let tempDate = new Date()
		const pastDate = dateObj.getUTCDate() - daysAgo
		tempDate.setUTCDate(pastDate)
		if (nameOrNum == "num") {
			return tempDate.getUTCDay()
		} else {
			return weekdays[tempDate.getUTCDay()]
		}
	}

	const getSum = () => {
		let sumOfFinalDay = 0.0000;
		const dayofWeek = getDayofWeek(6, "num");

		data.map((habit) => {
			const completed = habit.get('completed')
			const days = habit.get('days')
			const count = days.filter(Boolean).length;
			const valuePerDay = valuePerHabit / count;
			if (days[dayofWeek] && completed[dayofWeek]) {
				sumOfFinalDay += valuePerDay
			} else if (days[dayofWeek] ) {
				sumOfFinalDay -= valuePerDay
			}
		});
		return sumOfFinalDay;
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
							<td colSpan={8} className="text-end"><h5>{ "Locked Value for " + getDayofWeek(6, "name") + ":" }</h5></td>
							<td className="text-center align-middle">
								<div className="m-auto d-flex align-items-center justify-content-center position-relative" style={{width:"110px", height:"84px"}}>
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
			<div className="d-md-none d-flex align-items-center justify-content-end me-3 mt-2">
				<div className="text-right">
					<h5>{ "Locked Value for " + getDayofWeek(6, "name") + ":" }</h5>
				</div>
				<div className="text-center align-middle">
					<div className="m-auto d-flex align-items-center justify-content-center position-relative" style={{width:"110px", height:"84px"}}>
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