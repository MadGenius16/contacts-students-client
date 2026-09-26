import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import Sidebar from "../Sidebar/Sidebar.jsx";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Блокуємо скрол сторінки, коли мобільне меню відкрите
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={css.layout}>
      {/* 1. Верхній мобільний хедер (видимий лише на телефонах та планшетах < 768px) */}
      <header className={css.mobileHeader}>
        <Link to="/" className={css.mobileBrand} onClick={closeMobileMenu}>
          <div className={css.mobileLogoBadge}>
            <span className={css.mobileLogoText}>SC</span>
          </div>
          <span className={css.mobileBrandTitle}>StudentCentral</span>
        </Link>

        <button
          type="button"
          className={css.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <LuMenu className={css.menuIcon} />
        </button>
      </header>

      {/* 2. Напівпрозоре затемнення фону при відкритому меню на телефоні */}
      {isMobileMenuOpen && (
        <div
          className={css.backdrop}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* 3. Бокова панель / Мобільна шторка */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* 4. Головний вміст сторінки */}
      <div className={css.mainWrapper}>
        <main className={css.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
