Moralis.Cloud.define("updateUsers", async (request) => {
  // request.params {dayofWeek, dateObj, totalAllocation, totalLost,	sumOfFinalDay, totalWonAllocation, numHabits, devPayout, totalDistribution, distributionPercentage, mappedUsers}
  const logger = Moralis.Cloud.getLogger();

  const updatedUsers = await Promise.all(
    request.params.mappedUsers.map(async (loopUser) => {
      if (loopUser.sumOfFinalDay >= 0) {
        try {
          let userStats = {
            objectId: loopUser.objectId,
            originalAllocation: loopUser.allocation,
            lastPayout: 0,
          };
          if (
            loopUser.sumOfFinalDay > 0 &&
            request.params.totalDistribution > 0
          ) {
            userStats.lastPayout =
              loopUser.wonAllocation * request.params.distributionPercentage;
          }
          userStats.newAllocation =
            userStats.originalAllocation + userStats.lastPayout;

          const User = Moralis.Object.extend("_User");
          const query = new Moralis.Query(User);

          await query.get(userStats.objectId, { useMasterKey: true }).then(
            (youser) => {
              // logger.info(JSON.stringify(youser));
              youser.save(
                {
                  allocation: userStats.newAllocation,
                  lastPayout: userStats.lastPayout,
                },
                { useMasterKey: true }
              );
            },
            (error) => {
              return error;
            }
          );

          return userStats;
        } catch (err) {
          return err;
        }
      }
    })
  );

  return { updatedUsers: updatedUsers };
});
