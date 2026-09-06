import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPlus, LuMessageSquarePlus } from "react-icons/lu";
import toast from "react-hot-toast";
import Section from "../../components/Section/Section.jsx";
import {
  addReview,
  deleteReview,
  fetchReviews,
  updateReview,
} from "../../redux/reviews/operations.js";
import {
  selectReviews,
  selectReviewsLoading,
  selectReviewsError,
  selectReviewsTotalPages,
  selectReviewsTotalItems,
  selectReviewsHasNextPage,
  selectReviewsHasPreviousPage,
} from "../../redux/reviews/selectors.js";
import { selectAuthUser } from "../../redux/auth/selectors.js";
import ReviewList from "../../components/ReviewList/ReviewList.jsx";
import ReviewForm from "../../components/ReviewForm/ReviewForm.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import css from "./ReviewsPage.module.css";

const ReviewsPage = () => {
  const dispatch = useDispatch();

  // Дані з Redux
  const reviews = useSelector(selectReviews) || [];
  const isLoading = useSelector(selectReviewsLoading);
  const error = useSelector(selectReviewsError);
  const totalPages = useSelector(selectReviewsTotalPages) || 1;
  const totalItems = useSelector(selectReviewsTotalItems) || 0;
  const hasNextPage = useSelector(selectReviewsHasNextPage);
  const hasPrevPage = useSelector(selectReviewsHasPreviousPage);
  const currentUser = useSelector(selectAuthUser);

  // Стейт пагінації
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(12);

  // Стейт модальних вікон
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReviewForEdit, setSelectedReviewForEdit] = useState(null);

  // Завантаження відгуків з сервера при зміні сторінки або ліміту
  useEffect(() => {
    dispatch(
      fetchReviews({
        page: currentPage,
        perPage: currentPerPage,
      }),
    )
      .unwrap()
      .catch(() => {});
  }, [dispatch, currentPage, currentPerPage]);

  // Додавання нового відгуку
  const handleAddReview = (reviewData) => {
    dispatch(addReview(reviewData))
      .unwrap()
      .then(() => {
        toast.success("Thank you! Your review has been published 🎉");
        setIsAddModalOpen(false);
        // Оновлюємо список
        dispatch(
          fetchReviews({
            page: currentPage,
            perPage: currentPerPage,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to post review");
      });
  };

  // Редагування існуючого відгуку
  const handleUpdateReview = (updatedData) => {
    if (!selectedReviewForEdit?._id) return;

    dispatch(
      updateReview({
        reviewId: selectedReviewForEdit._id,
        updateData: updatedData,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Review updated successfully! ✏️");
        setSelectedReviewForEdit(null);
        dispatch(
          fetchReviews({
            page: currentPage,
            perPage: currentPerPage,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update review");
      });
  };

  // Видалення відгуку (підтвердження в інлайн-поповері картки)
  const handleDeleteReview = (reviewId) => {
    if (!reviewId) return;

    dispatch(deleteReview(reviewId))
      .unwrap()
      .then(() => {
        toast.success("Review deleted 🗑️");
        if (reviews.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          dispatch(
            fetchReviews({
              page: currentPage,
              perPage: currentPerPage,
            }),
          );
        }
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to delete review");
      });
  };

  const handlePerPageChange = (e) => {
    setCurrentPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={css.pageWrapper}>
      <Section>
        {/* 1. Верхній блок: Заголовок + Лічильник + Кнопка додавання */}
        <div className={css.headerRow}>
          <div className={css.titleWrapper}>
            <h1 className={css.pageTitle}>Reviews & Testimonials</h1>
            <span className={css.totalBadge}>{totalItems} Total</span>
          </div>

          <div className={css.actionsGroup}>
            {/* Випадаючий список вибору кількості */}
            <div className={css.perPageWrapper}>
              <label htmlFor="reviewsPerPage" className={css.perPageLabel}>
                Show:
              </label>
              <select
                id="reviewsPerPage"
                className={css.perPageSelect}
                value={currentPerPage}
                onChange={handlePerPageChange}
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>

            <button
              type="button"
              className={css.btnAddReview}
              onClick={() => setIsAddModalOpen(true)}
            >
              <LuPlus className={css.plusIcon} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Статус завантаження та помилки */}
        {error && <div className={css.errorAlert}>Error: {error}</div>}

        {/* 2. Список карток відгуків */}
        <div className={css.contentSection}>
          <ReviewList
            reviews={reviews}
            currentUser={currentUser}
            isLoading={isLoading}
            onEditReview={(review) => setSelectedReviewForEdit(review)}
            onDeleteReview={handleDeleteReview}
          />
        </div>

        {/* 3. Плаваючий капсульний пагінатор (Floating Pagination) */}
        {totalItems > 0 && (
          <div className={css.floatingPaginationContainer}>
            <div className={css.floatingPagination}>
              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage && currentPage === 1}
              >
                Prev
              </button>

              <span className={css.floatingDivider} />

              <span className={css.floatingPageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <span className={css.floatingDivider} />

              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage && currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* 1. Модалка додавання відгуку */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Write a Review"
        >
          <ReviewForm
            onSubmitReview={handleAddReview}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        {/* 2. Модалка редагування відгуку */}
        <Modal
          isOpen={Boolean(selectedReviewForEdit)}
          onClose={() => setSelectedReviewForEdit(null)}
          title="Edit Your Review"
        >
          <ReviewForm
            initialData={selectedReviewForEdit}
            isEdit={true}
            onSubmitReview={handleUpdateReview}
            onCancel={() => setSelectedReviewForEdit(null)}
          />
        </Modal>
      </Section>
    </div>
  );
};

export default ReviewsPage;