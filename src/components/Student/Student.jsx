import clsx from "clsx";
import css from "./Student.module.css";

const Student = ({ student, onDeleteStudent, onToggleDuty }) => {
  return (
    <div className={css.card}>
      <div className={css.info}>
        <h3 className={css.name}>{student.name}</h3>
        <div className={css.details}>
          <span>👤 {student.gender}</span>
          <span>🎂 {student.age} y.o.</span>
          <span>⭐ Avg: {student.avgMark}</span>
          {student.email && <span>✉️ {student.email}</span>}
        </div>
        <div>
          <span
            onClick={() =>
              onToggleDuty && onToggleDuty(student._id, student.onDuty)
            }
            style={{ cursor: "pointer", userSelect: "none" }}
            title="Click to toggle duty status"
            className={clsx(
              css.badge,
              student.onDuty ? css.dutyBadge : css.notDutyBadge,
            )}
          >
            {student.onDuty
              ? "✅ On Duty (Click to Off)"
              : "🛡️ Off Duty (Click to Assign)"}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDeleteStudent(student._id)}
        className={css.btn}
        type="button"
        title="Delete student"
      >
        ❌
      </button>
    </div>
  );
};

export default Student;
