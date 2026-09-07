import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  LuLock,
  LuEye,
  LuEyeOff,
  LuKeyRound,
  LuCircleAlert,
  LuArrowLeft,
} from "react-icons/lu";
import Section from "../../components/Section/Section.jsx";
import { apiResetPassword } from "../../redux/auth/operations.js";
import css from "./ResetPasswordPage.module.css";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

const INITIAL_STATE = { password: "", confirmPassword: "" };

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        apiResetPassword({
          token,
          password: values.password,
        }),
      ).unwrap();

      toast.success("Password has been successfully reset! Please sign in.");
      actions.resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(
        error || "Failed to reset password. The link might be invalid or expired.",
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={css.pageContainer}>
      <Section>
        <div className={css.card}>
          {/* Якщо токен відсутній у URL */}
          {!token ? (
            <div className={css.noTokenContainer}>
              <div className={css.alertIconWrapper}>
                <LuCircleAlert className={css.alertIcon} />
              </div>
              <h2 className={css.title}>Invalid Reset Link</h2>
              <p className={css.description}>
                The password reset link is missing a valid security token or has
                expired. Please request a new password reset link.
              </p>
              <Link to="/login" className={css.backToLoginBtn}>
                <LuArrowLeft className={css.btnIcon} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Верхній блок з іконкою та заголовком */}
              <div className={css.header}>
                <div className={css.iconWrapper}>
                  <LuKeyRound className={css.headerIcon} />
                </div>
                <h1 className={css.title}>Set New Password</h1>
                <p className={css.subtitle}>
                  Create a new secure password for your StudentCentral account.
                </p>
              </div>

              {/* Форма встановлення нового пароля */}
              <Formik
                initialValues={INITIAL_STATE}
                validationSchema={resetPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className={css.form} noValidate>
                    {/* Поле New Password */}
                    <div className={css.inputGroup}>
                      <label htmlFor="reset-password" className={css.label}>
                        New Password
                      </label>
                      <div className={css.fieldWrapper}>
                        <LuLock className={css.inputIcon} />
                        <Field
                          id="reset-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className={css.field}
                          placeholder="Enter new password (min 6 chars)"
                          autoFocus
                        />
                        <button
                          type="button"
                          className={css.togglePasswordBtn}
                          onClick={() => setShowPassword((prev) => !prev)}
                          title={showPassword ? "Hide password" : "Show password"}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <LuEyeOff /> : <LuEye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="span"
                        className={css.errorMessage}
                      />
                    </div>

                    {/* Поле Confirm Password */}
                    <div className={css.inputGroup}>
                      <label
                        htmlFor="reset-confirm-password"
                        className={css.label}
                      >
                        Confirm New Password
                      </label>
                      <div className={css.fieldWrapper}>
                        <LuLock className={css.inputIcon} />
                        <Field
                          id="reset-confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={css.field}
                          placeholder="Re-enter your new password"
                        />
                        <button
                          type="button"
                          className={css.togglePasswordBtn}
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          title={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="span"
                        className={css.errorMessage}
                      />
                    </div>

                    {/* Кнопка дії */}
                    <button
                      type="submit"
                      className={css.submitBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Resetting Password..."
                        : "Reset Password"}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Нижня частина з посиланням на вхід */}
              <div className={css.footer}>
                <Link to="/login" className={css.footerLink}>
                  <LuArrowLeft className={css.footerIcon} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </Section>
    </div>
  );
};

export default ResetPasswordPage;
