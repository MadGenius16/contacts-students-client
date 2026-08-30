import Sidebar from "../Sidebar/Sidebar.jsx";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <Sidebar />
      <div className={css.mainWrapper}>
        <main className={css.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
