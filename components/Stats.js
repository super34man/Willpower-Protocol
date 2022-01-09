import Countdown from "./Countdown"
import styles from './Stats.module.scss'
import { useEffect, useState } from "react"
import { useMoralis, useMoralisQuery, useMoralisCloudFunction, useWeb3Transfer, useNativeBalance, useNewMoralisObject } from "react-moralis"

const Stats = ({remainingTime, setRemainingTime, newDay, setNewDay}) => {
	const [depositAmount, setDepositAmount] = useState(0)
	const [myBalance, setMyBalance] = useState(0)

	useEffect(() => {
		if(!pendingBalanceIsLoading && !balanceIsLoading && balance[0]) {
			if(pendingBalance.length == 0) {
				setMyBalance(Moralis.Units.FromWei(balance[0].attributes.balance))
			} else {
				setMyBalance(Moralis.Units.FromWei(pendingBalance[0].attributes.balance))
			}
		}
	})

	const { user, Moralis, setUserData } = useMoralis();
	// const { data: totalTreasuryValue } = useMoralisCloudFunction('getTotalTreasuryValue')
	// const { isSaving: dailyStatsIsSaving, save: dailyStatsSave, error: dailyStatsError } = useNewMoralisObject('DailyStats');

	const {fetch, error, isFetching} = useWeb3Transfer({
		amount: Moralis.Units.ETH(depositAmount),
		receiver: "0x7249eb92e800C9fd1a48C438bB9Ec810c86Df038",
		type: "native",
	});

	const deposit = () => {
		fetch().then(() => {
			let newAllocation = Number(user.get('allocation')) + Number(depositAmount)
			setUserData({allocation: newAllocation})
			let newTotalValue = Number(dailyStats[0].attributes.totalValue) + Number(depositAmount)
			dailyStats[0].set('totalValue', newTotalValue)
			dailyStats[0].save()
		})
	}

	const depositAmountValidation = (e) => {
		const inputValue = e.target.value;
		if (inputValue == '') {inputValue = 0}
		setDepositAmount(inputValue);
	}

	const maxClicked = (e) => {
		setDepositAmount(myBalance);
		e.target.previousElementSibling.value = myBalance;
	}

	const { data: balance, isLoading: balanceIsLoading, error: balanceError } = useMoralisQuery("EthBalance", query =>
		query
			.equalTo('address', user.get('ethAddress')),
			[],
			{live: true}
	);

	const { data: pendingBalance, isLoading: pendingBalanceIsLoading } = useMoralisQuery("EthBalancePending", query =>
		query
			.equalTo('address', user.get('ethAddress'))
			.descending("createdAt")
			.limit(1),
			[],
			{live: true}
	);

	const { data: dailyStats, isLoading: dailyStatsIsLoading } = useMoralisQuery("DailyStats", query =>
		query
			.descending("date")
			.limit(2),
			[],
			{live: true}
	);


	if (!dailyStats[0]) return <div></div>

	// async function fun () {
	// 	const ratings = await Moralis.Cloud.run("testCloud", 'empty params');
	// 	return ratings
	// }
	// console.log(fun())

	// const { data, error, isLoading } = useMoralisCloudFunction("testCloud");
	// console.log(data)

	return (
		<div className="container-fluid bg-light border-bottom border-black-50">
			<div className="row row-cols-1 row-cols-md-3 g-2 py-3">
				<div className="col col-md-3 order-2 order-md-1">
				<div className="card h-100">
							<div className="card-body p-2 text-center">
								<span className="card-text fw-light">{ "Countdown to Next Payout" }</span>
								<h5><Countdown
									remainingTime={remainingTime}
									setRemainingTime={setRemainingTime}
									newDay={newDay}
									setNewDay={setNewDay}
								></Countdown></h5>
								<span className="card-text fw-light">{ "My Latest Payout" }</span>
								<h5 className="card-title">{ user.get('lastPayout').toFixed(4) + " ROP" }</h5>
							</div>
					</div>
				</div>
				<div className="col col-md-6 order-1 order-md-2">
					<div className="card bg-dark text-light border-danger rounded-pill">
						<div className="card-body p-2 text-center justify-content-center">
							<span className="card-text fw-light d-block lead">{ "Stake Now" }</span>
							<div className="input-group mb-2 w-75 mx-auto">
								<span className="input-group-text bg-dark border-secondary text-secondary">Amount Eth</span>
								<input type="number" className={`form-control bg-dark border-secondary text-light ${styles.depositInput}`} placeholder="0" min='0' inputMode="numeric" onChange={(e) => depositAmountValidation(e)}></input>
								<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => maxClicked(e)}>Max</button>
							</div>
							<div className="row justify-content-center px-5">
								<div className="col justify-content-center">
									<button className="btn btn-danger text-dark gradientButton" onClick={() => deposit()}>{ "Deposit" }</button>
									<span className="card-text fw-light d-block">{ "Wallet Balance" }</span>
									<h5 className="card-title">{ myBalance.toFixed(4) + " ROP" }</h5>
								</div>
								<div className="col justify-content-center">
									<button className="btn btn-light">Withdraw</button>
									<span className="card-text fw-light d-block">{ "My Account Value" }</span>
									<h5 className="card-title">{ user.get('allocation').toFixed(4) + " ROP" }</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col col-md-3 order-3 order-md-3">
					<div className="card h-100">
						<div className="card-body p-2 text-center">
							<span className="card-text fw-light">{ "Total Value Locked" }</span>
							<h5 className="card-title">{ dailyStats[0].attributes.totalValue + ' ROP' }</h5>
							<span className="card-text fw-light">{ "Total Value of Latest Payout" }</span>
							<h5 className="card-title">{ dailyStats[1].attributes.valueLosers + ' ROP' }</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Stats