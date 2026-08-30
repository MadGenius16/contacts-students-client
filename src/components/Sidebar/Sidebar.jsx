import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Sidebar.module.css";

const Sidebar = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <aside className={css.sidebar}>
      <div className={css.topSection}>
        <Link to="/" className={css.brand}>
          <div className={css.logoBadge}>
            <span className={css.logoText}>SC</span>
          </div>
          <span className={css.brandTitle}>StudentCentral</span>
        </Link>

        <nav className={css.navSection}>
          <Navigation />
        </nav>
      </div>

      <div className={css.bottomSection}>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </aside>
  );
};

export default Sidebar;
