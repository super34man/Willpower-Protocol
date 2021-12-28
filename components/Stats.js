import { testData } from "../data/testData"
import Countdown from "./Countdown"
import styles from './Stats.module.scss'

const loggedUser = testData.users[0]

const Stats = () => {
	return (
		<div className="container-fluid bg-light border-bottom border-black-50">
			<div className="row row-cols-1 row-cols-lg-3 g-2 py-3">
				<div className="col order-2 order-lg-1">
				<div className="card h-100">
							<div className="card-body p-2 text-center">
								<span className="card-text fw-light">{ "Countdown to Next Payout" }</span>
								<h5><Countdown></Countdown></h5>
								<span className="card-text fw-light">{ "My Latest Payout" }</span>
								<h5 className="card-title">{ loggedUser.lastPayout }</h5>
							</div>
					</div>
				</div>
				<div className="col order-1 order-lg-2">
					<div className="card bg-dark text-light border-danger rounded-pill">
						<div className="card-body p-2 text-center">
							<span className="card-text fw-light">{ "Stake Now" }</span>
							<p><button className="btn btn-danger text-dark gradientButton">{ "Deposit" }</button><button className="btn btn-light ms-4">Withdraw</button></p>
							<span className="card-text fw-light">{ "My Account Value" }</span>
							<h5 className="card-title">{ loggedUser.treasuryAllocation }</h5>
						</div>
					</div>
				</div>
				<div className="col order-3 order-lg-3">
					<div className="card h-100">
						<div className="card-body p-2 text-center">
							<span className="card-text fw-light">{ "Total Value Locked" }</span>
							<h5 className="card-title">{ testData.treasuryValue }</h5>
							<span className="card-text fw-light">{ "Total Value of Latest Payout" }</span>
							<h5 className="card-title">{ testData.lastPayout }</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Stats