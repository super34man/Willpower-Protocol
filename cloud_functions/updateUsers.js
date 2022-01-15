Moralis.Cloud.define("updateUsers", async (request) => {
	// request.params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, devPayout, totalDistribution, mappedUsers}
	const logger = Moralis.Cloud.getLogger();
	const User = Moralis.Object.extend("_User")
  const query = new Moralis.Query(User);
	// query.greaterThan("allocation", 0)

	// const users = await query.find({ useMasterKey: true })

	const updatedUsers = await Promise.all(request.params.mappedUsers.map(async (loopUser) => {
		try {
			if(loopUser.sumOfFinalDay > 0) {
				let userStats = {
					objectId: loopUser.objectId,
					originalAllocation: loopUser.allocation,
					lastPayout: loopUser.wonAllocation / request.params.totalDistribution
				}
				userStats.newAllocation = userStats.originalAllocation + userStats.lastPayout
				// const userUpdates = {
				// 	filter: { "objectId": loopUser.objectId },
				// 	update: { "allocation": newAllocation, "lastPayout": lastPayout }
				// }
				await query.get(userStats.objectId, {useMasterKey: true})
					.then((youser) => {
						youser.save({
							allocation: userStats.newAllocation,
							lastPayout: userStats.lastPayout
						}, { useMasterKey: true })
					}, (error) => {
						// The object was not retrieved successfully.
						// error is a Moralis.Error with an error code and message.
					});

				return userStats
			}

		} catch (err) {
			console.log(err)
		}
	}))

	// Moralis.bulkUpdate("_User", updatedUsers, {userMasterKey: true})

	return {updatedUsers: updatedUsers}

});