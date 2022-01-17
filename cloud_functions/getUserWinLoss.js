Moralis.Cloud.define("getUserWinLoss", async (request) => {
  // request.params {dayofWeek, dateObj, allocation, address}

  const thisUser = {
    allocation: request.params.allocation,
    address: request.params.address,
  };

  const query = new Moralis.Query("Habits");
  query.equalTo("address", thisUser.address);

  const habits = await query.find({ useMasterKey: true });

  let sumOfFinalDay = 0;
  const valuePerHabit = thisUser.allocation / habits.length;

  habits.map((habit) => {
    const completed = habit.get("completed");
    const days = habit.get("days");
    const count = days.filter(Boolean).length;
    const valuePerDay = valuePerHabit / count;
    if (days[request.params.dayofWeek] && completed[request.params.dayofWeek]) {
      sumOfFinalDay += valuePerDay;
    } else if (days[request.params.dayofWeek]) {
      sumOfFinalDay -= valuePerDay;
    }
  });

  return { sumOfFinalDay: sumOfFinalDay, numHabits: habits.length };
});
