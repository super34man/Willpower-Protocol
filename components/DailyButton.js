import styles from "./DailyButton.module.scss";

const DailyButton = ({ valuePerDay, habit, dayofWeek, date, col }) => {
  const completed = habit.get("completed");
  const days = habit.get("days");
  const createdAt = habit.get("createdAt");

  const dailyToggle = (e) => {
    completed[dayofWeek] = !completed[dayofWeek];
    habit.set("completed", completed);

    habit.save().then(
      () => {
        // console.log();
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  return (
    <button
      onClick={(e) => dailyToggle(e)}
      className={
        completed[dayofWeek]
          ? `btn btn-danger position-relative ${styles.darkGradientButton}`
          : `btn border-secondary position-relative ${styles.lightGradientButton}`
      }
      disabled={createdAt >= date}
    >
      {days[dayofWeek] ? +parseFloat(valuePerDay).toFixed(4) : 0}
      <span
        className={
          createdAt >= date
            ? `d-none`
            : `position-absolute top-0 start-100 translate-middle fa-stack`
        }
      >
        <i className="fas fa-circle fa-stack-1x text-light"></i>
        <i
          className={
            "fas fa-stack-1x " +
            (col != 6
              ? completed[dayofWeek]
                ? "fa-check-circle text-success fa-sm"
                : "fa-arrow-circle-right text-secondary fa-sm"
              : completed[dayofWeek]
              ? "fa-coins text-warning fa-xs"
              : "fa-clock text-dark fa-sm")
          }
        ></i>
        <span className="visually-hidden">
          {completed ? "Complete" : "Not Complete"}
        </span>
      </span>
    </button>
  );
};

export default DailyButton;
