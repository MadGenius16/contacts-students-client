import { NavLink } from "react-router-dom";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import clsx from "clsx";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={css.authContainer}>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          clsx(css.btn, css.btnLogin, isActive && css.active)
        }
      >
        <LuLogIn className={css.icon} />
        <span>Log In</span>
      </NavLink>

      <NavLink
        to="/register"
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
