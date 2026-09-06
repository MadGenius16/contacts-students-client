import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  LuUser,
  LuMail,
  LuLock,
  LuEye,
  LuEyeOff,
  LuUserPlus,
} from "react-icons/lu";
import { apiRegister } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import css from "./RegistrationForm.module.css";

const INITIAL_STATE = { name: "", email: "", password: "" };

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(apiRegister(values));
    actions.resetForm();
  };

  return (
    <div className={css.formCard}>
      {/* 1. Верхній блок з іконкою та заголовком */}
      <div className={css.header}>
        <div className={css.iconWrapper}>
          <LuUserPlus className={css.headerIcon} />
        </div>
        <h2 className={css.title}>Create Account</h2>
        <p className={css.subtitle}>
          Join StudentCentral to manage students, contacts, and reviews
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
        validationSchema={registerSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            {/* Поле Name */}
            <div className={css.inputGroup}>
              <label htmlFor="reg-name" className={css.label}>
                Full Name
              </label>
              <div className={css.fieldWrapper}>
                <LuUser className={css.inputIcon} />
                <Field
                  id="reg-name"
                  className={css.field}
                  name="name"
                  type="text"
                  placeholder="John Snow"
                />
              </div>
              <ErrorMessage
                className={css.errorMessage}
                name="name"
                component="span"
              />
            </div>

            {/* Поле Email */}
            <div className={css.inputGroup}>
              <label htmlFor="reg-email" className={css.label}>
                Email Address
              </label>
              <div className={css.fieldWrapper}>
                <LuMail className={css.inputIcon} />
                <Field
                  id="reg-email"
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
              <label htmlFor="reg-password" className={css.label}>
                Password
              </label>
              <div className={css.fieldWrapper}>
                <LuLock className={css.inputIcon} />
                <Field
                  id="reg-password"
                  className={css.field}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password (min 6 chars)"
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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>

      {/* 4. Посилання на сторінку логіну */}
      <div className={css.footer}>
        <p className={css.footerText}>
          Already have an account?{" "}
          <Link to="/login" className={css.footerLink}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
