import { useEffect, useRef, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import clsx from "clsx";
import css from "./ReviewCard.module.css";

const ReviewCard = ({ review, onEdit, onDelete }) => {
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

  if (!review) return null;

  const authorName = review.authorName || review.name || "Anonymous";
  const initial = authorName.charAt(0).toUpperCase();

  // Форматування дати створення (наприклад, 12 Oct 2025)
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const handleDelete = () => {
    if (onDelete && review._id) {
      onDelete(review._id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className={css.card}>
      {/* 1. Хедер картки: Аватар з градієнтним сяйвом + Ім'я + Дата */}
      <div className={css.header}>
        <div className={css.avatarWrapper}>
          <div className={css.avatarGlow}></div>
          <div className={css.avatar}>
            {review.photo && !imgError ? (
              <img
                src={review.photo}
                alt={authorName}
                className={css.avatarImg}
                onError={() => setImgError(true)}
              />
            ) : (
              <span className={css.avatarInitial}>{initial}</span>
            )}
          </div>
        </div>

        <div className={css.authorInfo}>
          <h3 className={css.authorName} title={authorName}>
            {authorName}
          </h3>
          <span className={css.date}>{formatDate(review.createdAt)}</span>
        </div>
      </div>

      {/* 2. Текст відгуку в лапках */}
      <div className={css.commentBody}>
        <p className={css.commentText}>
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* 3. Роздільник */}
      <hr className={css.divider} />

      {/* 4. Футер дій */}
      <div className={css.footerActions}>
        <button
          type="button"
          className={css.actionIconBtn}
          onClick={() => onEdit && onEdit(review)}
          title="Edit review"
          aria-label="Edit review"
        >
          <LuPencil className={css.actionIcon} />
        </button>

        {/* Кнопка видалення з поповером-підтвердженням як у contacts */}
        <div className={css.deleteWrapper} ref={confirmRef}>
          <button
            type="button"
            className={clsx(
              css.actionIconBtn,
              css.deleteIconBtn,
              showDeleteConfirm && css.deleteBtnActive,
            )}
            onClick={() => setShowDeleteConfirm((prev) => !prev)}
            title="Delete review"
            aria-label="Delete review"
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

export default ReviewCard;
