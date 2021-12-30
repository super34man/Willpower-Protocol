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
				<h1 className="display-5">{ "Stats are coming soon!" }</h1>
				<p className="lead">
					{ "In the meantime, join our" }
					<Link href="/">
						<a className="link-secondary mx-2">
							<i className="fab fa-discord me-1"></i>
							{ "Discord" }
						</a>
					</Link>
					{ "server to see our plans and submit your ideas." }
				</p>
			</span>
		</div>
	)
	
}