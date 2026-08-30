import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.header}>
          {title && <h2 className={css.title}>{title}</h2>}
          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
            title="Close"
          >
            <LuX className={css.closeIcon} />
          </button>
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
