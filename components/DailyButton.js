import styles from "./DailyButton.module.scss"

const DailyButton = ({ valuePerDay, habit, dayofWeek, col }) => {
	const completed = habit.get('completed')
	const days = habit.get('days')
	return (
		<button className={ completed[dayofWeek] ? "btn btn-danger position-relative" : "btn btn-outline-danger position-relative" }>
			{ days[dayofWeek] ? +parseFloat(valuePerDay).toFixed(4) : 0 }
			<span className="position-absolute top-0 start-100 translate-middle fa-stack">
					<i className="fas fa-circle fa-stack-1x text-light"></i>
					<i className={
						"fas fa-stack-1x " +
						(
							col !=6 ?
								( completed[dayofWeek] ?
									"fa-check-circle text-success fa-sm" :
									"fa-arrow-circle-right text-secondary fa-sm"
								) :
								( completed[dayofWeek] ?
									"fa-coins text-warning fa-xs" :
									"fa-clock text-dark fa-sm"
								)
						)
					}></i>
				<span className="visually-hidden">{ completed ? "Complete" : "Not Complete" }</span>
			</span>
		</button>
	)
}

export default DailyButton