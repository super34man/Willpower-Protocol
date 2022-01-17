Moralis.Cloud.define("getDaysAgoStats", async (request) => {
  // request.params {dayofWeek, dateObj}

  const logger = Moralis.Cloud.getLogger();
  const User = Moralis.Object.extend("_User");
  const query = new Moralis.Query(User);
  query.greaterThan("allocation", 0);

  const users = await query.find({ useMasterKey: true });

  const mappedUsers = await Promise.all(
    users.map(async (loopUser) => {
      try {
        const params = {
          ...request.params,
          allocation: loopUser.get("allocation"),
          address: loopUser.get("ethAddress"),
        };
        let results = await Moralis.Cloud.run("getUserWinLoss", params);
        let userStats = {
          objectId: loopUser.id,
          allocation: loopUser.get("allocation"),
          sumOfFinalDay: results.sumOfFinalDay,
          numHabits: results.numHabits,
          wonAllocation: 0,
          lostAllocation: 0,
        };
        if (userStats.sumOfFinalDay < 0) {
          userStats.lostAllocation = Math.abs(userStats.sumOfFinalDay);
          loopUser.save(
            {
              allocation: userStats.allocation + userStats.sumOfFinalDay,
              lastPayout: userStats.sumOfFinalDay,
            },
            { useMasterKey: true }
          );
        } else {
          userStats.wonAllocation = userStats.sumOfFinalDay;
        }

        return userStats;
      } catch (err) {
        return err;
      }
    })
  );

  function sumReducer(sum, val) {
    return sum + val;
  }

  const stats = {};
  stats.totalAllocation = mappedUsers
    .map((li) => li.allocation)
    .reduce(sumReducer, 0);
  stats.totalLost = mappedUsers
    .map((li) => li.lostAllocation)
    .reduce(sumReducer, 0);
  stats.sumOfFinalDay = mappedUsers
    .map((li) => li.sumOfFinalDay)
    .reduce(sumReducer, 0);
  stats.totalWonAllocation = mappedUsers
    .map((li) => li.wonAllocation)
    .reduce(sumReducer, 0);
  stats.numHabits = mappedUsers.map((li) => li.numHabits).reduce(sumReducer, 0);

  return { ...stats, mappedUsers: mappedUsers };
});
