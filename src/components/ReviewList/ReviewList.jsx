import ReviewCard from "../ReviewCard/ReviewCard";
import css from "./ReviewList.module.css";

const ReviewList = ({
  reviews = [],
  currentUser = null,
  onEditReview,
  onDeleteReview,
  isLoading = false,
}) => {
  if (isLoading && (!reviews || reviews.length === 0)) {
    return (
      <div className={css.loaderWrapper}>
        <div className={css.spinner}></div>
        <p className={css.loaderText}>Loading reviews...</p>
      </div>
    );
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className={css.emptyState}>
        <div className={css.emptyIcon}>💬</div>
        <h3 className={css.emptyTitle}>No reviews yet</h3>
        <p className={css.emptySubtitle}>
          Be the first to share your experience with our platform!
        </p>
      </div>
    );
  }

  return (
    <div className={css.list}>
      {reviews.map((review) => (
        <div key={review._id} className={css.cardWrapper}>
          <ReviewCard
            review={review}
            currentUser={currentUser}
            onEdit={onEditReview}
            onDelete={onDeleteReview}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
