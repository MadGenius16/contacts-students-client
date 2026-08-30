import { useDispatch, useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { selectAuthUser } from "../../redux/auth/selectors";
import { apiLogout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const onLogout = () => {
    dispatch(apiLogout());
  };

  const initial = user?.name ? user.name[0].toUpperCase() : "U";

  return (
    <div className={css.userCard}>
      <div className={css.userInfo}>
        <div className={css.avatar}>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className={css.avatarImg} />
          ) : (
            <span className={css.avatarInitial}>{initial}</span>
          )}
        </div>

        <div className={css.userDetails}>
          <span className={css.userName} title={user?.name || "User"}>
            {user?.name || "User"}
          </span>
          <span className={css.userRole}>Admin</span>
        </div>
      </div>

      <button
        className={css.btnLogout}
        onClick={onLogout}
        type="button"
        title="Log out"
        aria-label="Log out"
      >
        <LuLogOut className={css.logoutIcon} />
      </button>
    </div>
  );
};

export default UserMenu;
