import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import css from "./AppBar.module.css";

const AppBar = () => {
  const isloggedin = useSelector(selectAuthIsLoggedIn);
  return (
    <div className={css.wrapper}>
      <Navigation />
      {isloggedin ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;
