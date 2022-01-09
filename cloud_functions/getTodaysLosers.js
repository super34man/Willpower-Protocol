Moralis.Cloud.define("getTodaysLosers", async () => {
	// const dateObj = new Date()
	// const day = dateObj.getUTCDay()
  const query = new Moralis.Query("Habits");
  const pipeline = [
    {group: {objectId: '$address', habits: {$push: '$$ROOT'}}
		},

    {lookup: {
      from: "_User",
      localField: "address",
      foreignField: "accounts",
      as: "user"
    }}
  ];

	return query.aggregate(pipeline, {useMasterKey:true})
		// .then(function(results) {
		// 	return results
		// 	// results contains unique score values
		// })
		// .catch(function(error) {
		// 	// There was an error.
		// });
});