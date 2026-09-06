export const selectReviews = (state) => state.reviews.reviews.items;
export const selectReviewsLoading = (state) => state.reviews.reviews.loading;
export const selectReviewsError = (state) => state.reviews.reviews.error;
export const selectReviewsTotalItems = (state) =>
  state.reviews.reviews.totalItems;
export const selectReviewsTotalPages = (state) =>
  state.reviews.reviews.totalPages;
export const selectReviewsHasNextPage = (state) =>
  state.reviews.reviews.hasNextPage;
export const selectReviewsHasPreviousPage = (state) =>
  state.reviews.reviews.hasPreviousPage;
export const selectReviewsPage = (state) => state.reviews.reviews.page;
export const selectReviewsPerPage = (state) => state.reviews.reviews.perPage;
