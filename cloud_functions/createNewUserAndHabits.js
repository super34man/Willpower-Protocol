Moralis.Cloud.job("createNewUserAndHabits", async (request) => {
  const logger = Moralis.Cloud.getLogger();

  let user = new Moralis.User();

  const address = "0x" + Date.now();
  const maxAllocation = 1;
  const minAllocation = 0.0001;
  const allocation =
    Math.random() * (maxAllocation - minAllocation) + minAllocation;
  const lastPayout = 0;
  // let habitsArray = [];
  const maxHabits = Math.ceil(5);
  const minHabits = Math.floor(1);
  const numHabits = Math.floor(
    Math.random() * (maxHabits - minHabits) + minHabits
  );
  let habitsArray = Array.apply(null, Array(numHabits)).map(function () {});
  // for (const habit of habitsArray) {
  // 	habit.description = "Habit"
  // 	habit.days = []
  // }
  // return habitsArray;

  const randomDays = () => {
    let days = [];
    days.length = 7;
    for (let day = 0; day < 7; day++) {
      days[day] = Math.random() < 0.5;
    }
    return days;
  };

  const randomCompletion = (days) => {
    let completed = [...days];
    for (let day = 0; day < 7; day++) {
      if (days[day]) {
        completed[day] = Math.random() < 0.6;
      }
    }
    return completed;
  };

  const addHabits = await Promise.all(
    habitsArray.map(async (habit, index) => {
      try {
        let tempHabit = {
          address: address,
          description: "Habit " + (index + 1),
          days: randomDays(),
        };
        tempHabit.completed = randomCompletion(tempHabit.days);
        let Habits = Moralis.Object.extend("Habits");
        let habits = new Habits();

        habits.save(tempHabit).then(() => {
          return tempHabit;
        }),
          (error) => {
            return error;
          };
      } catch (err) {
        return err;
      }
    })
  );

  user.set("username", address);
  user.set("password", address);
  user.set("ethAddress", address);
  user.set("allocation", allocation);
  user.set("lastPayout", lastPayout);

  try {
    // let newUser = await user.signUp();
    let newUser = await user.signUp().then(async (user) => {
      const DailyStats = Moralis.Object.extend("DailyStats");
      const query = new Moralis.Query(DailyStats);
      query.descending("createdAt");
      query.limit(1);
      const dailyStats = await query.first();
      const totalAllocation = await dailyStats.get("totalAllocation");
      const userAllocation = await user.get("allocation");
      const newAllocation = totalAllocation + userAllocation;
      dailyStats.set("totalAllocation", newAllocation);
      const numberHabits = await dailyStats.get("numberHabits");
      const newNumberHabits = numberHabits + numHabits;
      dailyStats.set("numberHabits", newNumberHabits);
      await dailyStats.save();
    });

    return { newUser: newUser, updatedHabits: addHabits };
  } catch (error) {
    logger.info(error.message);
    return error;
  }
});
