import Link from "next/link"
import TestCloud from "../components/TestCloud"

export default function Stats() {
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
				<TestCloud></TestCloud>
			</span>
		</div>
	)
}