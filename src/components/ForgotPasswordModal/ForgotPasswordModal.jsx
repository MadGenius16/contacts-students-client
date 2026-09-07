import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { LuMail, LuSend } from "react-icons/lu";
import Modal from "../Modal/Modal.jsx";
import { apiRequestResetEmail } from "../../redux/auth/operations.js";
import css from "./ForgotPasswordModal.module.css";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email address is required")
    .email("Please enter a valid email address"),
});

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(apiRequestResetEmail(values)).unwrap();
      toast.success("Password reset email sent! Check your inbox.");
      actions.resetForm();
      onClose();
    } catch (error) {
      toast.error(error || "Failed to send reset email. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Password">
      <div className={css.formContainer}>
        <p className={css.description}>
          Enter your email address and we will send you a link to reset your
          password.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form} noValidate>
              <div className={css.inputGroup}>
                <label htmlFor="forgot-email" className={css.label}>
                  Email Address
                </label>
                <div className={css.fieldWrapper}>
                  <LuMail className={css.inputIcon} />
                  <Field
                    id="forgot-email"
                    name="email"
                    type="email"
                    className={css.field}
                    placeholder="teacher@example.com"
                    autoFocus
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.actions}>
                <button
                  type="button"
                  className={css.cancelBtn}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={css.submitBtn}
                  disabled={isSubmitting}
                >
                  <LuSend className={css.btnIcon} />
                  <span>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;