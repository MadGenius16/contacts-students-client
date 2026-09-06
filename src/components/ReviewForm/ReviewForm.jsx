import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ReviewForm.module.css";

const reviewSchema = Yup.object().shape({
  comment: Yup.string()
    .min(5, "Comment must be at least 5 characters")
    .max(250, "Comment cannot exceed 250 characters")
    .required("Comment text is required"),
});

const ReviewForm = ({
  onSubmitReview,
  initialData = null,
  isEdit = false,
  onCancel,
}) => {
  const initialValues = {
    comment: initialData?.comment || "",
  };

  const handleSubmit = (values, actions) => {
    onSubmitReview({
      comment: values.comment.trim(),
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={reviewSchema}
    >
      {({ values }) => (
        <Form className={css.form}>
          {/* Текстове поле для коментаря */}
          <div className={css.fieldGroup}>
            <div className={css.labelHeader}>
              <span className={css.labelText}>Your Feedback</span>
              <span className={css.charCounter}>
                {values.comment.length} / 250
              </span>
            </div>

            <Field
              as="textarea"
              className={css.textarea}
              name="comment"
              rows="8"
              placeholder="Write your impressions, thoughts or suggestions about the platform..."
            />
            <ErrorMessage
              className={css.errorMessage}
              name="comment"
              component="span"
            />
          </div>

          {/* Кнопки дій */}
          <div className={css.btnRow}>
            {onCancel && (
              <button
                type="button"
                className={css.cancelBtn}
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <button className={css.submitBtn} type="submit">
              {isEdit ? "Save Changes" : "Publish Review"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
