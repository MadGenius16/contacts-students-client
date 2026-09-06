import { useEffect, useRef, useState } from "react";
import {
  LuStar,
  LuPhone,
  LuMail,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";
import clsx from "clsx";
import css from "./Contact.module.css";

const Contact = ({
  contact,
  onDeleteContact,
  onEditContact,
  onToggleFavourite,
}) => {

  const [imgError, setImgError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const confirmRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (confirmRef.current && !confirmRef.current.contains(e.target)) {
        setShowDeleteConfirm(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowDeleteConfirm(false);
      }
    };

    if (showDeleteConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDeleteConfirm]);

  if (!contact) return null;

  const initial = contact.name ? contact.name.charAt(0).toUpperCase() : "C";
  const roleType = contact.contactType ? contact.contactType.toLowerCase() : "personal";

  const handleToggleFav = () => {
    if (onToggleFavourite && contact._id) {
      onToggleFavourite(contact._id, contact.isFavourite);
    }
  };

  const handleEdit = () => {
    if (onEditContact) {
      onEditContact(contact);
    }
  };

  const handleDelete = () => {
    if (onDeleteContact && contact._id) {
      onDeleteContact(contact._id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className={clsx(css.row, contact.isFavourite && css.rowFavourite)}>
      {/* 1. Колонка: Photo & Name */}
      <div className={css.colPhotoName}>
        <div className={css.avatar}>
          {contact.photo && !imgError ? (
            <img src={contact.photo}
             alt={contact.name}
              className={css.avatarImg}
              onError={() => setImgError(true)}  
              />
          ) : (
            <span className={css.avatarInitial}>{initial}</span>
          )}
        </div>
        <span className={css.name} title={contact.name}>
          {contact.name}
        </span>
      </div>

      {/* 2. Колонка: Contact Info (Phone & Email у 2 рядки з іконками) */}
      <div className={css.colContactInfo}>
        <div className={css.infoGroup}>
          <a
            href={contact.phoneNumber ? `tel:${contact.phoneNumber}` : undefined}
            className={css.infoItem}
            title={contact.phoneNumber || "No phone"}
          >
            <LuPhone className={css.infoIcon} />
            <span className={css.infoText}>
              {contact.phoneNumber || "—"}
            </span>
          </a>

          <a
            href={contact.email ? `mailto:${contact.email}` : undefined}
            className={css.infoItem}
            title={contact.email || "No email"}
          >
            <LuMail className={css.infoIcon} />
            <span className={css.infoText}>
              {contact.email || "—"}
            </span>
          </a>
        </div>
      </div>

      {/* 3. Колонка: Role / Category Pill Badge */}
      <div className={css.colRole}>
        <span
          className={clsx(
            css.roleBadge,
            roleType === "work" && css.roleWork,
            roleType === "home" && css.roleHome,
            roleType === "personal" && css.rolePersonal,
          )}
        >
          {contact.contactType || "Personal"}
        </span>
      </div>

      {/* 4. Колонка: Status (⭐ Favourite, ✏️ Edit, 🗑️ Delete) */}
      <div className={css.colStatus}>
        <button
          type="button"
          className={clsx(css.starBtn, contact.isFavourite && css.starActive)}
          onClick={handleToggleFav}
          title={contact.isFavourite ? "Remove from favourites" : "Add to favourites"}
          aria-label={contact.isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <LuStar className={css.starIcon} />
        </button>

        <button
          type="button"
          className={css.actionIconBtn}
          onClick={handleEdit}
          title="Edit contact"
          aria-label="Edit contact"
        >
          <LuPencil className={css.actionIcon} />
        </button>

        {/* Кнопка видалення з поповером-підтвердженням */}
        <div className={css.deleteWrapper} ref={confirmRef}>
          <button
            type="button"
            className={clsx(
              css.actionIconBtn,
              css.deleteIconBtn,
              showDeleteConfirm && css.deleteBtnActive,
            )}
            onClick={() => setShowDeleteConfirm((prev) => !prev)}
            title="Delete contact"
            aria-label="Delete contact"
          >
            <LuTrash2 className={css.actionIcon} />
          </button>

          {showDeleteConfirm && (
            <div className={css.popover}>
              <p className={css.popoverTitle}>Delete?</p>
              <div className={css.popoverActions}>
                <button
                  type="button"
                  className={css.popoverCancelBtn}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={css.popoverDeleteBtn}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <span className={css.popoverArrow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
