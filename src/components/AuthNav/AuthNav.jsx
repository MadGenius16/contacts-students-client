import { NavLink } from "react-router-dom";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import clsx from "clsx";
import css from "./AuthNav.module.css";

const AuthNav = ({ onItemClick }) => {
  return (
    <div className={css.authContainer}>
      <NavLink
        to="/login"
        onClick={onItemClick}
        className={({ isActive }) =>
          clsx(css.btn, css.btnLogin, isActive && css.active)
        }
      >
        <LuLogIn className={css.icon} />
        <span>Log In</span>
      </NavLink>

      <NavLink
        to="/register"
        onClick={onItemClick}
        className={({ isActive }) =>
          clsx(css.btn, css.btnRegister, isActive && css.active)
        }
      >
        <LuUserPlus className={css.icon} />
        <span>Register</span>
      </NavLink>
    </div>
  );
};

export default AuthNav;
