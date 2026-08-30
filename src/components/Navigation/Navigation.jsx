import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuLayoutDashboard, LuUsers, LuContact, LuStar } from "react-icons/lu";
import clsx from "clsx";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.navItem, isActive && css.active);
  };
  return (
    <ul className={css.list}>
      <li>
        <NavLink to="/" end className={buildLinkClass}>
              <div className={css.iconWrapper}>
                <LuLayoutDashboard className={css.icon} />
              </div>
              <div className={css.textWrapper}>
                <span className={css.title}>Dashboard</span>
              </div>
        </NavLink>
      </li>

      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/students" className={buildLinkClass}>
                  <div className={css.iconWrapper}>
                    <LuUsers className={css.icon} />
                  </div>
                  <div className={css.textWrapper}>
                    <span className={css.title}>Students</span>
                  </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/contacts" className={buildLinkClass}>
                  <div className={css.iconWrapper}>
                    <LuContact className={css.icon} />
                  </div>
                  <div className={css.textWrapper}>
                    <span className={css.title}>Contacts</span>
                  </div>
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/reviews" className={buildLinkClass}>
              <div className={css.iconWrapper}>
                <LuStar className={css.icon} />
              </div>
              <div className={css.textWrapper}>
                <span className={css.title}>Reviews</span>
              </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
