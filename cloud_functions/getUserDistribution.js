Moralis.Cloud.define("getUserDistribution", async (request) => {
	const thisUser = {allocation: request.params.allocation, address: request.params.address};
	const dateObj = new Date()
	const pastDate = dateObj.getUTCDate() - 7
	dateObj.setUTCDate(pastDate)
	const dayofWeek = dateObj.getUTCDay()

  const query = new Moralis.Query("Habits");
	query.equalTo("address", thisUser.address)

	const habits = await query.find({useMasterKey:true})

	let lostAllocation = 0
	let sumOfFinalDay = 0
	let wonAllocation = 0
	const valuePerHabit = thisUser.allocation / habits.length

	habits.map((habit) => {
		const completed = habit.get('completed')
		const days = habit.get('days')
		const count = days.filter(Boolean).length;
		const valuePerDay = valuePerHabit / count;
		if (days[dayofWeek] && completed[dayofWeek]) {
			sumOfFinalDay += valuePerDay;
			wonAllocation += valuePerDay;
		} else if (days[dayofWeek] ) {
			sumOfFinalDay -= valuePerDay;
			lostAllocation -= valuePerDay;
		}
	})

	return {sumOfFinalDay: sumOfFinalDay,	lostAllocation: lostAllocation,	wonAllocation: wonAllocation}

});