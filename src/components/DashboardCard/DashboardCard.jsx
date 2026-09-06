import { Link } from "react-router-dom";
import css from "./DashboardCard.module.css";

const DashboardCard = ({
  icon,
  title,
  subtitle,
  metricsText,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  secondaryActionTo,
}) => {
  return (
    <div className={css.card}>
      {/* 1. Верхня іконка модуля */}
      <div className={css.iconContainer}>
        <div className={css.iconWrapper}>{icon}</div>
      </div>

      {/* 2. Заголовок та опис з лічильником */}
      <div className={css.textBlock}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.subtitle}>{subtitle}</p>
        {metricsText && <span className={css.metricsBadge}>{metricsText}</span>}
      </div>

      {/* 3. Кнопки дій */}
      <div className={css.actions}>
        {primaryActionText && (
          <button
            type="button"
            className={css.primaryBtn}
            onClick={onPrimaryAction}
          >
            {primaryActionText}
          </button>
        )}

        {secondaryActionText && secondaryActionTo && (
          <Link to={secondaryActionTo} className={css.secondaryBtn}>
            {secondaryActionText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
