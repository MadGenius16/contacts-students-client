import { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import clsx from "clsx";
import css from "./ReviewCard.module.css";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const [imgError, setImgError] = useState(false);

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

      {/* 4. Футер дій (іконки як у Student.jsx) */}
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

        <button
          type="button"
          className={clsx(css.actionIconBtn, css.deleteIconBtn)}
          onClick={() => onDelete && onDelete(review._id)}
          title="Delete review"
          aria-label="Delete review"
        >
          <LuTrash2 className={css.actionIcon} />
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
