Moralis.Cloud.define("payoutDev", async (request) => {
	//request.params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, mappedUsers}
	const logger = Moralis.Cloud.getLogger();

	const devPayout = Math.abs(request.params.totalLost * 0.07);

	const totalDistribution = Math.abs(request.params.totalLost) - devPayout;

	// transact to dev wallet

	return {devPayout: devPayout, totalDistribution: totalDistribution}
	
});