Moralis.Cloud.define("getTodaysLosers", async (request) => {
	const logger = Moralis.Cloud.getLogger();
	const dateObj = new Date()
	const pastDate = dateObj.getUTCDate() - 6
	dateObj.setUTCDate(pastDate)
  const query = new Moralis.Query("_User");
	query.greaterThan("allocation", 0)
  // const pipeline = [
	// 	{match: {allocation: {$gt: 0}}},
	// 	{lookup: {
  //     from: "Habits",
  //     localField: "ethAddress",
  //     foreignField: "address",
  //     as: "habits"
  //   }}
  // ];

	const users = await query.find({useMasterKey: true})


	let stats = {
		totalLost: 0,
		sumOfFinalDay: 0,
		totalWon: 0,
		totalAllocation: 0
	}

	for (const loopUser of users) {
		stats.totalAllocation += loopUser.get('allocation')
		const params = {allocation: loopUser.get('allocation'), address: loopUser.get('ethAddress')}
		const results = await Moralis.Cloud.run("getUserDistribution", params)
		stats.totalLost += results.lostAllocation
		stats.sumOfFinalDay += results.sumOfFinalDay
		stats.totalWon += results.wonAllocation
	}

	return stats
	
	// }

	// const allPromise = Promise.all([getHabits])
		// return stats;
	// getHabits.then((val) => {return val})
	// return resolved
	// return await Promise.all(getHabits).then((stats) => {
	// 	return stats
	// });

	// const data = await query.aggregate(pipeline, {useMasterKey:true})
		// .then((results) => {
		// 	return results;
		// 	// results contains unique score values
		// })
		// .catch((error) => {
		// 	return error;
		// 	// There was an error.
		// });
	// return data;
	// let users = []
	// data.map((user) => {
	// 	let sumOfFinalDay = 0.0000;
	// 	users.push(user)
		// const valuePerHabit = user.allocation / user.habits.length

		// user.habits.map((habit) => {
		// 	const completed = habit.get('completed')
		// 	const days = habit.get('days')
		// 	const count = days.filter(Boolean).length;
		// 	const valuePerDay = valuePerHabit / count;
		// 	return valuePerDay
		// 	if (days[dayofWeek] && completed[dayofWeek]) {
		// 		sumOfFinalDay += valuePerDay
		// 	} else if (days[dayofWeek] ) {
		// 		sumOfFinalDay -= valuePerDay
		// 	}
		// });
		// return sumOfFinalDay;
	// })
	// return users
});