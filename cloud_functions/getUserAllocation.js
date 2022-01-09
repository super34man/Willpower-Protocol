Moralis.Cloud.define("getUserAllocation", async (request) => {
  const query = new Moralis.Query("_User");
  query.equalTo("ethAddress", request.params.address);
	const results = await query.find({useMasterKey:true});
	return results.get('allocation');
	// query.find({useMasterKey:true})
	// 	.then(function(results) {
	// 		return results;
	// 		// return results
	// 		// results contains unique score values
	// 	})
	// 	.catch(function(error) {
	// 		// There was an error.
	// 	});
});