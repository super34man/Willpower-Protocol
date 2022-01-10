import { useMoralis, useMoralisCloudFunction, useMoralisQuery } from "react-moralis"

function TestCloud() {
	const { Moralis, user } = useMoralis();
	// const params = {address: '0x179ca48f47ddd8ddbf06a220f31aed1413a5f116'}

	let {data: car} = useMoralisCloudFunction('getTodaysLosers')
	// let { data: bike} = useMoralisQuery("Habits");
	console.log(car)
	// console.log(bike)

	// async function fun () {
	// 	const ratings = await Moralis.Cloud.run("testCloud", 'empty params');
	// 	return ratings
	// }
	// console.log(fun())
	return <div></div>
}

export default TestCloud
