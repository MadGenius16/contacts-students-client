import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/selectors";
import { IoMdExit } from "react-icons/io";
import css from "./UserMenu.module.css";
import { apiLogout } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(apiLogout());
  const user = useSelector(selectAuthUser);
  return (
    <div className={css.wrapper}>
      <button className={css.btnLogout} onClick={onLogout} type="button">
        {user && <p className={css.userName}>{user.name}</p>}
        <IoMdExit className={css.icon} />
      </button>
    </div>
  );
};

export default UserMenu;
