const GettingStarted = () => {
	return (
		<div>
			<div className="container-fluid gradientBackground text-dark">
				<div className="row text-center">
					<a data-bs-toggle="collapse" href="#gettingStarted" role="button" aria-expanded="false" aria-controls="gettingStarted">
						<p className="lead mb-2">
							<strong>{ "Getting Started?" }</strong>
						</p>
					</a>
				</div>
				<div className="collapse" id="gettingStarted">
					<div className="row p-4">
						<figure>
							<blockquote className="blockquote">
								<p>{ "“Willpower is but the unflinching purpose to carry a task you set for yourself to fulfillment. " }
									{ "If I set for myself a task, be it ever so trifling, I shall see it through. " }"
									{ "How else should I have the confidence in myself to do important things?”" }</p>
							</blockquote>
							<figcaption className="blockquote-footer">
								{ "George S Clason - " }<cite title="Source Title">{ "The Richest Man in Babylon - Original Edition" }</cite>
							</figcaption>
						</figure>
						<h4>
							{ "Improving our mind, body, and spirit is rewarding, but sometimes the motivation tank drains to empty. " }
							{ "Willpower Protocol aims to help our community stay on the wagon using one of the best motivators of all - money." }
						</h4>
						<p className="lead mt-1">
							{ "This protocol is powered by Web3 and allows anyone to put their Willpower to the test against all other stakers. " }
							{ "If you stay dedicated to accomplishing everything that you say you will, you'll win big - in this dApp and in life." }
						</p>
					</div>

					<div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-6">
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 1" }</h5>
									<p className="card-text">{ "Connect your wallet using MetaMask or WalletConnect above." }</p>
								</div>
							</div>
						</div>
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 2" }</h5>
									<p className="card-text">{ "Fund your account by clicking the deposit button below." }</p>
								</div>
							</div>
						</div>
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 3" }</h5>
									<p className="card-text">{ "Click the 'Add a New Habit' and follow the instructions." }</p>
								</div>
							</div>
						</div>
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 4" }</h5>
									<p className="card-text">{ "Come back each day to mark your habits complete. " }
									{ "You have 6 days to check off an item if you miss a day." }</p>
								</div>
							</div>
						</div>
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 5" }</h5>
									<p className="card-text">{ "Once the countdown hits 00:00:00 each day, " }
									{ "the allocated funds in the day column furthest to the right will be locked in." }</p>
								</div>
							</div>
						</div>
						<div className="col-md mb-4 d-flex">
							<div className="card flex-fill">
								<div className="card-body">
									<h5 className="card-title">{ "Step 6" }</h5>
									<p className="card-text">{ "Watch your account grow (or shrink) based on the strength of your Willpower." }</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GettingStarted