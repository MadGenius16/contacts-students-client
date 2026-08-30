import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import clsx from "clsx";
import css from "./Student.module.css";

const Student = ({
  student,
  onDeleteStudent,
  onToggleDuty,
  onViewStudent,
  onEditStudent,
}) => {
  if (!student) return null;

  const initial = student.name ? student.name.charAt(0).toUpperCase() : "S";

  const handleToggle = () => {
    if (onToggleDuty && student._id) {
      onToggleDuty(student._id, student.onDuty);
    }
  };

  const handleDelete = () => {
    if (onDeleteStudent && student._id) {
      onDeleteStudent(student._id);
    }
  };

  const handleView = () => {
    if (onViewStudent) {
      onViewStudent(student);
    }
  };

  const handleEdit = () => {
    if (onEditStudent) {
      onEditStudent(student);
    }
  };

  // Форматування значень для капсульних бейджів точно як на скріншоті
  const genderText = student.gender ? student.gender.toUpperCase() : "STUDENT";
  const ageText = student.age ? `${student.age} YRS` : "— YRS";
  const avgText =
    student.avgMark !== undefined && student.avgMark !== null
      ? `${student.avgMark} AVG`
      : "— AVG";

  return (
    <div className={css.card}>
      {/* 1. Верхній рядок: Аватарка + Ім'я */}
      <div className={css.header}>
        <div className={css.avatar}>
          {student.avatar ? (
            <img
              src={student.avatar}
              alt={student.name}
              className={css.avatarImg}
            />
          ) : (
            <span className={css.avatarInitial}>{initial}</span>
          )}
        </div>
        <h3 className={css.name} title={student.name}>
          {student.name}
        </h3>
      </div>

      {/* 2. Рядок капсульних бейджів: FEMALE | 21 YRS | 88% AVG */}
      <div className={css.badgesRow}>
        <span className={css.badge}>{genderText}</span>
        <span className={css.badge}>{ageText}</span>
        <span className={css.badge}>{avgText}</span>
      </div>

      {/* 3. Рядок статусу чергування (Duty On / Off) з великим перемикачем */}
      <div className={css.dutyRow}>
        <span className={css.dutyLabel}>
          {student.onDuty ? "Duty On" : "Duty Off"}
        </span>
        <button
          type="button"
          onClick={handleToggle}
          className={clsx(css.toggleBtn, student.onDuty && css.toggleActive)}
          aria-label={student.onDuty ? "Turn duty off" : "Turn duty on"}
          title="Toggle duty status"
        >
          <span className={css.toggleKnob} />
        </button>
      </div>

      {/* 4. Роздільник */}
      <hr className={css.divider} />

      {/* 5. Інформаційний блок: Email та Phone */}
      <div className={css.infoSection}>
        <div className={css.infoRow}>
          <span className={css.infoKey}>Email:</span>
          <span className={css.infoVal} title={student.email}>
            {student.email || "—"}
          </span>
        </div>
        <div className={css.infoRow}>
          <span className={css.infoKey}>Phone:</span>
          <span className={css.infoVal}>
            {student.phone || "(555) 123-4567"}
          </span>
        </div>
      </div>

      {/* 6. Роздільник */}
      <hr className={css.divider} />

      {/* 7. Футер з трьома іконками дій: Перегляд, Редагування, Видалення */}
      <div className={css.footerActions}>
        <button
          type="button"
          className={css.actionIconBtn}
          onClick={handleView}
          title="View details"
          aria-label="View details"
        >
          <LuEye className={css.actionIcon} />
        </button>

        <button
          type="button"
          className={css.actionIconBtn}
          onClick={handleEdit}
          title="Edit student"
          aria-label="Edit student"
        >
          <LuPencil className={css.actionIcon} />
        </button>

        <button
          type="button"
          className={clsx(css.actionIconBtn, css.deleteIconBtn)}
          onClick={handleDelete}
          title="Delete student"
          aria-label="Delete student"
        >
          <LuTrash2 className={css.actionIcon} />
        </button>
      </div>
    </div>
  );
};

export default Student;
