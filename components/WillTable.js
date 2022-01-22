import DailyButton from "./DailyButton";
import { testData } from "../data/testData";
// import { useMoralis } from "react-moralis"

function WillTable({ newDay, getDayofWeek, data, isLoading, valuePerHabit }) {
  if (data.length === 0 || isLoading) return <tr></tr>;

  return data.map((habit, index) => {
    const days = habit.get("days");
    const count = days.filter(Boolean).length;
    const valuePerDay = valuePerHabit / count;

    return (
      <tr key={index}>
        <th scope="row">{habit.get("description")}</th>
        <td className="text-center">{+parseFloat(valuePerHabit.toFixed(4))}</td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(0, "num")}
            date={getDayofWeek(0, "date")}
            col={0}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(1, "num")}
            date={getDayofWeek(1, "date")}
            col={1}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(2, "num")}
            date={getDayofWeek(2, "date")}
            col={2}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(3, "num")}
            date={getDayofWeek(3, "date")}
            col={3}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(4, "num")}
            date={getDayofWeek(4, "date")}
            col={4}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(5, "num")}
            date={getDayofWeek(5, "date")}
            col={5}
          ></DailyButton>
        </td>
        <td className="text-center">
          <DailyButton
            valuePerDay={valuePerDay}
            habit={habit}
            dayofWeek={getDayofWeek(6, "num")}
            date={getDayofWeek(6, "date")}
            col={6}
          ></DailyButton>
        </td>
      </tr>
    );
  });
}

export default WillTable;
