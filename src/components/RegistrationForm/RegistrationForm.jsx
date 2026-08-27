import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { apiRegister } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const INITIAL_STATE = { name: "", email: "", password: "" };

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string()
    .required("Email address is required")
    .email("Invalid email address"),
  password: Yup.string()
    .min(8, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);

    dispatch(apiRegister(values));
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        <Form className={css.form}>
          <h3 className={css.title}>Registration</h3>
          <label className={css.label}>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="name"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="span"
            />
          </label>
          <label className={css.label}>
            <Field
              className={css.field}
              name="email"
              type="text"
              placeholder="email"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label className={css.label}>
            <Field
              className={css.field}
              name="password"
              type="password"
              placeholder="password"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="span"
            />
          </label>
          <button className={css.btn} type="submit">
            register
          </button>
          {error && (
            <p className={css.errorMessage}>
              Oops, some error occured...{error}
            </p>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
