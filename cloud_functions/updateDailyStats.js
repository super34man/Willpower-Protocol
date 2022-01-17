Moralis.Cloud.define("updateDailyStats", async (request) => {
  //request.params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, devPayout, totalDistribution, distributionPercentage, mappedUsers}
  const logger = Moralis.Cloud.getLogger();

  const DailyStat = Moralis.Object.extend("DailyStats");
  let dailyStat = new DailyStat();

  dailyStat
    .save({
      totalAllocation:
        request.params.totalAllocation - request.params.devPayout,
      totalLost: request.params.totalLost,
      totalWonAllocation: request.params.totalWonAllocation,
      date: request.params.dateObj,
      dayofWeek: request.params.dayofWeek,
      devPayout: request.params.devPayout,
      numberHabits: request.params.numHabits,
      totalDistribution: request.params.totalDistribution,
    })
    .then(
      () => {
        let dailyStat2 = new DailyStat();

        dailyStat2.save({
          totalAllocation:
            request.params.totalAllocation - request.params.devPayout,
          totalLost: 0,
          totalWonAllocation: 0,
          date: request.params.dateObj,
          dayofWeek: request.params.dayofWeek,
          devPayout: 0,
          numberHabits: request.params.numHabits,
          totalDistribution: 0,
        });
        // return;
      },
      (error) => {
        console.log(error.message);
      }
    );
});
