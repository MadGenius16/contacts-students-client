import css from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <ul className={css.wrapper}>
      <li>
        {" "}
        <NavLink to="/register" className={buildLinkClass}>
          register
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={buildLinkClass}>
          login
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
