import { testData } from "../data/testData"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import CreateNewHabit from "../components/CreateNewHabit";

export default function NewHabit() {

	const { isAuthenticated } = useMoralis();

	if (isAuthenticated) return <CreateNewHabit></CreateNewHabit>
	
	return (
		<div className="h-100 mt-5">
			<span className="text-center">
				<h1 className="display-5">{ "You need to connect your wallet first!" }</h1>
			</span>
		</div>
	)
	
}