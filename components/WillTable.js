import DailyButton from "./DailyButton";
import { testData } from "../data/testData"
// import { useMoralis } from "react-moralis"


function WillTable({newDay, getDayofWeek, data, isLoading, valuePerHabit}) {

	if (data.length === 0 || isLoading) return <tr></tr>

	return (
		data.map((habit, index) => {
			const days = habit.get('days')
			const count = days.filter(Boolean).length;
			const valuePerDay = valuePerHabit / count;

			return (
				<tr key={index}>
					<th scope="row">{habit.description}</th>
					<td className="text-center">{+parseFloat(valuePerHabit.toFixed(4))}</td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(0, "num")} col={0}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(1, "num")} col={1}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(2, "num")} col={2}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(3, "num")} col={3}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(4, "num")} col={4}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(5, "num")} col={5}></DailyButton></td>
					<td className="text-center"><DailyButton valuePerDay={valuePerDay} habit={habit} dayofWeek={getDayofWeek(6, "num")} col={6}></DailyButton></td>
				</tr>
			)
		})
	)
}

export default WillTable
