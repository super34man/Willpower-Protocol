Moralis.Cloud.job("dayEnd", async () => {
	const logger = Moralis.Cloud.getLogger()
	const dateObj = new Date()
	const pastDate = dateObj.getUTCDate() - 7		// 7 days ago
	dateObj.setUTCDate(pastDate)
	const dayofWeek = dateObj.getUTCDay()
	let params = {
		dayofWeek: dayofWeek,
		dateObj: dateObj
	}

	try {
		// params {dayofWeek, dateObj}
		const stats = await Moralis.Cloud.run("getDaysAgoStats", params)
		params = {...params, ...stats}

		// params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, mappedUsers}

		const distribution = await Moralis.Cloud.run("payoutDev", params)
		params = {...params, ...distribution}

		// params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, devPayout, totalDistribution, mappedUsers}
		await Moralis.Cloud.run("updateDailyStats", params)

		// params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, devPayout, totalDistribution, mappedUsers}
		const updatedUsers = await Moralis.Cloud.run("updateUsers", params)
		params = {...params, ...updatedUsers}
		logger.info(JSON.stringify(params))

		logger.info('dayEnd completed')

	} catch (err) {
		logger.info('dayEnd: ' + err)
	}


	// TODO - iterate through users and update allocation and habit completion



});