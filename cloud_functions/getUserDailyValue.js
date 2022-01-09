Moralis.Cloud.define("getUserDailyValue", async (address) => {
	const dateObj = new Date()
	const day = dateObj.getUTCDay()
  const query = new Moralis.Query("Habits");
  query.equalTo("address", address)

	query.find({useMasterKey:true})
		.then(function(results) {
			let sum = 0;
			for (let i = 0; i < results.length; ++i) {
				sum += results[i].get("allocation");
			}
			return sum;
			// return results
			// results contains unique score values
		})
		.catch(function(error) {
			// There was an error.
		});
});