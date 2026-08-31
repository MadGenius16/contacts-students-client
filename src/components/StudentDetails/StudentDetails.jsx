import { LuMail, LuPhone, LuUser, LuGraduationCap, LuCalendar, LuShieldCheck, LuShieldAlert } from "react-icons/lu";
import clsx from "clsx";
import css from "./StudentDetails.module.css";

const StudentDetails = ({ student, onToggleDuty, }) => {
  if (!student) return null;

  const initial = student.name ? student.name.charAt(0).toUpperCase() : "S";

  const handleToggle = () => {
    if (onToggleDuty && student._id) {
      onToggleDuty(student._id, student.onDuty);
    }
  };

  const genderText = student.gender ? student.gender.toUpperCase() : "STUDENT";
  const avgMarkNum = Number(student.avgMark) || 0;


  return (
    <div className={css.detailsCard}>
      {/* 1. Верхній блок 2х: Великий аватар, ім'я та статус */}
      <div className={css.heroSection}>
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

        <div className={css.heroInfo}>
          <div className={css.nameRow}>
            <h2 className={css.name}>{student.name}</h2>
            <span
              className={clsx(
                css.statusPill,
                student.onDuty ? css.dutyOnPill : css.dutyOffPill,
              )}
            >
              {student.onDuty ? (
                <>
                  <LuShieldCheck className={css.pillIcon} /> On Duty
                </>
              ) : (
                <>
                  <LuShieldAlert className={css.pillIcon} /> Off Duty
                </>
              )}
            </span>
          </div>

          <p className={css.subTitle}>Student Profile</p>
        </div>
      </div>

      {/* 2. Блок ключових показників (2x Metric Cards) */}
      <div className={css.metricsContainer}>
        <div className={css.metricCard}>
          <span className={css.metricLabel}>
            <LuUser className={css.metricIcon} /> Gender
          </span>
          <span className={css.metricValue}>{genderText}</span>
        </div>

        <div className={css.metricCard}>
          <span className={css.metricLabel}>
            <LuCalendar className={css.metricIcon} /> Age
          </span>
          <span className={css.metricValue}>
            {student.age ? `${student.age} years` : "—"}
          </span>
        </div>

        <div className={css.metricCard}>
          <span className={css.metricLabel}>
            <LuGraduationCap className={css.metricIcon} /> Avg Mark
          </span>
          <span className={css.metricValueHighlight}>
            {avgMarkNum ? `${avgMarkNum} / 12` : "—"}
          </span>
        </div>
      </div>

     

      {/* 4. Контактні дані */}
      <div className={css.infoGroup}>
        <h4 className={css.sectionHeading}>Contact Details</h4>

        <div className={css.infoRow}>
          <div className={css.iconBubble}>
            <LuMail className={css.infoIcon} />
          </div>
          <div className={css.infoTextWrap}>
            <span className={css.infoLabel}>Email Address</span>
            <a
              href={`mailto:${student.email}`}
              className={css.infoLink}
              title={student.email}
            >
              {student.email || "No email provided"}
            </a>
          </div>
        </div>

        <div className={css.infoRow}>
          <div className={css.iconBubble}>
            <LuPhone className={css.infoIcon} />
          </div>
          <div className={css.infoTextWrap}>
            <span className={css.infoLabel}>Phone Number</span>
            <a
              href={`tel:${student.phone || student.phoneNumber || "+380501234567"}`}
              className={css.infoLink}
            >
              {student.phone || student.phoneNumber || "(555) 123-4567"}
            </a>
          </div>
        </div>
      </div>

      {/* 5. Кнопки керування */}
      <div className={css.actionsRow}>
        <button
          type="button"
          className={clsx(
            css.toggleDutyBtn,
            student.onDuty && css.toggleDutyActive,
          )}
          onClick={handleToggle}
        >
          {student.onDuty ? "Switch to Duty Off" : "Assign to Duty On"}
        </button>

    
      </div>
    </div>
  );
};

export default StudentDetails;
