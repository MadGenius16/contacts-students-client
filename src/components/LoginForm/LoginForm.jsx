import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LuMail, LuLock, LuEye, LuEyeOff, LuLogIn } from "react-icons/lu";
import { apiLogin } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal.jsx";
import css from "./LoginForm.module.css";

const INITIAL_STATE = { email: "", password: "" };

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(apiLogin(values));
    actions.resetForm();
  };

  return (
    <div className={css.formCard}>
      {/* 1. Верхній блок з іконкою та заголовком */}
      <div className={css.header}>
        <div className={css.iconWrapper}>
          <LuLogIn className={css.headerIcon} />
        </div>
        <h2 className={css.title}>Welcome Back</h2>
        <p className={css.subtitle}>
          Sign in to access your students and contacts
        </p>
      </div>

      {/* 2. Повідомлення про помилку з бекенду */}
      {error && (
        <div className={css.serverErrorBadge}>
          <span>{error}</span>
        </div>
      )}

      {/* 3. Форма */}
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            {/* Поле Email */}
            <div className={css.inputGroup}>
              <label htmlFor="login-email" className={css.label}>
                Email Address
              </label>
              <div className={css.fieldWrapper}>
                <LuMail className={css.inputIcon} />
                <Field
                  id="login-email"
                  className={css.field}
                  name="email"
                  type="email"
                  placeholder="teacher@example.com"
                />
              </div>
              <ErrorMessage
                className={css.errorMessage}
                name="email"
                component="span"
              />
            </div>

            {/* Поле Password */}
            <div className={css.inputGroup}>
              <div className={css.labelRow}>
                <label htmlFor="login-password" className={css.label}>
                  Password
                </label>
                <button
                  type="button"
                  className={css.forgotBtn}
                  onClick={() => setIsForgotModalOpen(true)}
                >
                  Forgot password?
                </button>
              </div>
              
              <div className={css.fieldWrapper}>
                <LuLock className={css.inputIcon} />
                <Field
                  id="login-password"
                  className={css.field}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className={css.togglePasswordBtn}
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              <ErrorMessage
                className={css.errorMessage}
                name="password"
                component="span"
              />
            </div>

            {/* Головна кнопка дії */}
            <button
              className={css.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>

      {/* 4. Посилання на сторінку реєстрації */}
      <div className={css.footer}>
        <p className={css.footerText}>
          Don&apos;t have an account?{" "}
          <Link to="/register" className={css.footerLink}>
            Create Account
          </Link>
        </p>
      </div>

      {/* 5. Модальне вікно відновлення пароля */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};

export default LoginForm;

