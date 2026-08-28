import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./StudentForm.module.css";
import * as Yup from "yup";

const INITIAL_STATE = {
  name: "",
  email: "",
  age: "",
  gender: "male",
  avgMark: "",
  onDuty: false,
};

const studentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(6, "Age must be at least 6 years old")
    .max(100, "Age must be at most 100 years old")
    .required("Age is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),
  avgMark: Yup.number()
    .typeError("Average mark must be a number")
    .min(1, "Mark must be at least 1")
    .max(12, "Mark must be at most 12")
    .required("Average mark is required"),
  onDuty: Yup.boolean(),
});

const StudentForm = ({ onAddStudent }) => {
  const handleSubmit = (values, actions) => {
    // Перетворюємо рядкові значення чисел у справжні числа перед відправкою на бекенд
    const formattedValues = {
      ...values,
      age: Number(values.age),
      avgMark: Number(values.avgMark),
      onDuty: Boolean(values.onDuty),
    };

    onAddStudent(formattedValues);
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={handleSubmit}
        validationSchema={studentSchema}
      >
        <Form className={css.form}>
          <h2 className={css.title}>Add New Student</h2>

          <label className={css.label}>
            <span>Name</span>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="Harry Potter"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Email</span>
            <Field
              className={css.field}
              name="email"
              type="email"
              placeholder="harry@hogwarts.edu"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Age</span>
            <Field
              className={css.field}
              name="age"
              type="number"
              placeholder="15"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="age"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Gender</span>
            <Field as="select" className={css.field} name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage
              className={css.errorMessage}
              name="gender"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Average Mark (1 - 12)</span>
            <Field
              className={css.field}
              name="avgMark"
              type="number"
              step="0.1"
              placeholder="10.5"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="avgMark"
              component="span"
            />
          </label>

          <label className={css.checkboxLabel || css.label}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Field name="onDuty" type="checkbox" />
              <span>On Duty </span>
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="onDuty"
              component="span"
            />
          </label>

          <button className={css.btn} type="submit">
            Add student
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default StudentForm;
