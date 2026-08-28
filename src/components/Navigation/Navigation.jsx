import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <ul className={css.list}>
      <li>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/contacts" className={buildLinkClass}>
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" className={buildLinkClass}>
              Students
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navigation;
