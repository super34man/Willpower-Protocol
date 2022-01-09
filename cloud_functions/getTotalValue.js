Moralis.Cloud.define("getTotalTreasuryValue", async () => {
  const query = new Moralis.Query("_User");
  const results = await query.find({useMasterKey:true});
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i].get("allocation");
  }
  return sum;
});