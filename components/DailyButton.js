import styles from "./DailyButton.module.scss"

const DailyButton = ({ valuePerDay, task, dayofWeek, col }) => {
	return (
		<button className={ task.completed[dayofWeek] ? "btn btn-danger position-relative" : "btn btn-outline-danger position-relative" }>
			{ task.days[dayofWeek] ? valuePerDay : 0 }
			<span className="position-absolute top-0 start-100 translate-middle fa-stack">
					<i className="fas fa-circle fa-stack-1x text-light"></i>
					<i className={
						"fas fa-stack-1x " +
						(
							col !=6 ?
								( task.completed[dayofWeek] ?
									"fa-check-circle text-success fa-sm" :
									"fa-arrow-circle-right text-secondary fa-sm"
								) :
								( task.completed[dayofWeek] ?
									"fa-coins text-warning fa-xs" :
									"fa-clock text-dark fa-sm"
								)
						)
					}></i>
				<span className="visually-hidden">{ task.completed ? "Complete" : "Not Complete" }</span>
			</span>
		</button>
	)
}

export default DailyButton