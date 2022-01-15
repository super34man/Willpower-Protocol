Moralis.Cloud.define("getDaysAgoStats", async (request) => {
	// request.params {dayofWeek, dateObj}

	const logger = Moralis.Cloud.getLogger();
	const User = Moralis.Object.extend("_User")
  const query = new Moralis.Query(User);
	query.greaterThan("allocation", 0)

	const users = await query.find({useMasterKey: true})

	const mappedUsers = await Promise.all(users.map(async (loopUser) => {
		try {
			const params = {...request.params, allocation: loopUser.get('allocation'), address: loopUser.get('ethAddress')}
			let results = await Moralis.Cloud.run("getUserWinLoss", params)
			let userStats = {
				objectId: loopUser.id,
				allocation: loopUser.get('allocation'),
				// lostAllocation: results.lostAllocation,
				sumOfFinalDay: results.sumOfFinalDay,
				// wonAllocation: results.wonAllocation,
				numHabits: results.numHabits,
				wonAllocation: 0,
				lostAllocation: 0
			}
			if(userStats.sumOfFinalDay < 0) {
				userStats.lostAllocation = Math.abs(userStats.sumOfFinalDay)
				loopUser.save({
					allocation: userStats.allocation + userStats.sumOfFinalDay,
					lastPayout: userStats.sumOfFinalDay
				}, { useMasterKey: true })
			} else if (userStats.sumOfFinalDay > 0) {
				userStats.wonAllocation = userStats.sumOfFinalDay
			}

			return userStats
		} catch (err) {
			console.log(err)
		}
	}))

	const stats = mappedUsers.reduce((prev, curr) => {
		return {
			totalAllocation: prev.allocation + curr.allocation,
			totalLost: prev.lostAllocation + curr.lostAllocation,
			sumOfFinalDay: prev.sumOfFinalDay + curr.sumOfFinalDay,
			totalWonAllocation: prev.wonAllocation + curr.wonAllocation,
			numHabits: prev.numHabits + curr.numHabits
		}
	})

	return {...stats, mappedUsers: mappedUsers}

});