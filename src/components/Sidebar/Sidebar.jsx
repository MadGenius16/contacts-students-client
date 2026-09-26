import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuX } from "react-icons/lu";
import clsx from "clsx";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <aside className={clsx(css.sidebar, isOpen && css.open)}>
      <div className={css.topSection}>
        <div className={css.headerRow}>
          <Link to="/" className={css.brand} onClick={onClose}>
            <div className={css.logoBadge}>
              <span className={css.logoText}>SC</span>
            </div>
            <span className={css.brandTitle}>StudentCentral</span>
          </Link>
          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <LuX className={css.closeIcon} />
          </button>
        </div>

        <nav className={css.navSection}>
          <Navigation onItemClick={onClose} />
        </nav>
      </div>

      <div className={css.bottomSection}>
        {isLoggedIn ? (
          <UserMenu onItemClick={onClose} />
        ) : (
          <AuthNav onItemClick={onClose} />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
