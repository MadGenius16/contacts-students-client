import { useEffect, useRef, useState } from "react";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import clsx from "clsx";
import css from "./Student.module.css";

const Student = ({
  student,
  onDeleteStudent,
  onViewStudent,
  onEditStudent,
}) => {
  const [imgError, setImgError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const confirmRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (confirmRef.current && !confirmRef.current.contains(e.target)) {
        setShowDeleteConfirm(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowDeleteConfirm(false);
      }
    };

    if (showDeleteConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDeleteConfirm]);

  if (!student) return null;

  const initial = student.name ? student.name.charAt(0).toUpperCase() : "S";

  const handleDelete = () => {
    if (onDeleteStudent && student._id) {
      onDeleteStudent(student._id);
    }
    setShowDeleteConfirm(false);
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

  // Форматування значень для капсульних бейджів
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
          {student.photo && !imgError ? (
            <img
              src={student.photo}
              alt={student.name}
              className={css.avatarImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={css.avatarInitial}>{initial}</span>
          )}
        </div>
        <h3 className={css.name} title={student.name}>
          {student.name}
        </h3>
      </div>

      {/* 2. Рядок капсульних бейджів: MALE | 15 YRS | 10.6 AVG | ON DUTY */}
      <div className={css.badgesRow}>
        <span className={css.badge}>{genderText}</span>
        <span className={css.badge}>{ageText}</span>
        <span className={css.badge}>{avgText}</span>
        <span
          className={clsx(
            css.badge,
            student.onDuty ? css.dutyBadgeOn : css.dutyBadgeOff,
          )}
        >
          {student.onDuty ? "ON DUTY" : "DUTY OFF"}
        </span>
      </div>

      {/* 3. Роздільник */}
      <hr className={css.divider} />

      {/* 4. Інформаційний блок: Email та Phone */}
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
            {student.phoneNumber || student.phone || "(555) 123-4567"}
          </span>
        </div>
      </div>

      {/* 5. Роздільник */}
      <hr className={css.divider} />

      {/* 6. Футер з трьома іконками дій: Перегляд, Редагування, Видалення */}
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

        {/* Кнопка видалення з поповером-підтвердженням як у contacts та reviews */}
        <div className={css.deleteWrapper} ref={confirmRef}>
          <button
            type="button"
            className={clsx(
              css.actionIconBtn,
              css.deleteIconBtn,
              showDeleteConfirm && css.deleteBtnActive,
            )}
            onClick={() => setShowDeleteConfirm((prev) => !prev)}
            title="Delete student"
            aria-label="Delete student"
          >
            <LuTrash2 className={css.actionIcon} />
          </button>

          {showDeleteConfirm && (
            <div className={css.popover}>
              <p className={css.popoverTitle}>Delete?</p>
              <div className={css.popoverActions}>
                <button
                  type="button"
                  className={css.popoverCancelBtn}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={css.popoverDeleteBtn}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <span className={css.popoverArrow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
