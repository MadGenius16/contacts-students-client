import { Link, useNavigate } from "react-router-dom";
import { LuCompass, LuArrowLeft, LuLayoutDashboard } from "react-icons/lu";
import Section from "../../components/Section/Section.jsx";
import css from "./NotFoundPage.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={css.pageContainer}>
      <Section>
        <div className={css.card}>
          {/* 1. Іконка та великий номер помилки 404 */}
          <div className={css.iconContainer}>
            <div className={css.iconGlow} />
            <div className={css.iconWrapper}>
              <LuCompass className={css.icon} />
            </div>
          </div>

          <span className={css.errorCode}>404</span>

          {/* 2. Заголовок та пояснення */}
          <h1 className={css.title}>Page Not Found</h1>
          <p className={css.description}>
            Oops! The page you are looking for might have been moved, deleted, or
            does not exist in StudentCentral.
          </p>

          {/* 3. Кнопки дій */}
          <div className={css.actions}>
            <button
              type="button"
              className={css.backBtn}
              onClick={() => navigate(-1)}
            >
              <LuArrowLeft className={css.btnIcon} />
              <span>Go Back</span>
            </button>

            <Link to="/" className={css.homeBtn}>
              <LuLayoutDashboard className={css.btnIcon} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default NotFound;
