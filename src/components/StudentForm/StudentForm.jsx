import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./StudentForm.module.css";

const INITIAL_STATE = {
  name: "",
  phoneNumber: "",
  email: "",
  age: "",
  gender: "male",
  avgMark: "",
  onDuty: false,
};

const studentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .min(8, "Must be at least 8 digits")
    .max(20, "Too Long!")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(5, "Age must be at least 5")
    .max(100, "Age must be at most 100")
    .required("Age is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),
  avgMark: Yup.number()
    .typeError("Average mark must be a number")
    .min(1, "Mark must be at least 1")
    .max(100, "Mark must be at most 100")
    .required("Average mark is required"),
  onDuty: Yup.boolean(),
});

const StudentForm = ({
  onAddStudent,
  initialData = null,
  isEdit = false,
  onCancel,
}) => {
  const handleSubmit = (values, actions) => {
    const formattedValues = {
      ...values,
      age: Number(values.age),
      avgMark: Number(values.avgMark),
      onDuty: Boolean(values.onDuty),
    };

    onAddStudent(formattedValues);
    actions.resetForm();
  };

  const initialValues = initialData
    ? {
        name: initialData.name || "",
        phoneNumber: initialData.phoneNumber || initialData.phone || "",
        email: initialData.email || "",
        age: initialData.age !== undefined ? initialData.age : "",
        gender: initialData.gender || "male",
        avgMark: initialData.avgMark !== undefined ? initialData.avgMark : "",
        onDuty: Boolean(initialData.onDuty),
      }
    : INITIAL_STATE;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={studentSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldGroup}>
          <label className={css.label}>
            <span className={css.labelText}>Full Name</span>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="Emily Chen"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="span"
            />
          </label>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>
            <span className={css.labelText}>Phone Number</span>
            <Field
              className={css.field}
              name="phoneNumber"
              type="text"
              placeholder="+380501234567"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="phoneNumber"
              component="span"
            />
          </label>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>
            <span className={css.labelText}>Email Address</span>
            <Field
              className={css.field}
              name="email"
              type="email"
              placeholder="emily.c@example.com"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>
        </div>

        <div className={css.row}>
          <div className={css.fieldGroup}>
            <label className={css.label}>
              <span className={css.labelText}>Age</span>
              <Field
                className={css.field}
                name="age"
                type="number"
                placeholder="21"
              />
              <ErrorMessage
                className={css.errorMessage}
                name="age"
                component="span"
              />
            </label>
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label}>
              <span className={css.labelText}>Gender</span>
              <Field as="select" className={css.selectField} name="gender">
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
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label}>
              <span className={css.labelText}>Avg Mark</span>
              <Field
                className={css.field}
                name="avgMark"
                type="number"
                step="0.1"
                placeholder="8"
              />
              <ErrorMessage
                className={css.errorMessage}
                name="avgMark"
                component="span"
              />
            </label>
          </div>
        </div>

        <div className={css.checkboxGroup}>
          <label className={css.checkboxLabel}>
            <Field name="onDuty" type="checkbox" className={css.checkbox} />
            <span className={css.checkboxText}>
              {isEdit ? "Student is on duty" : "Assign to Duty immediately"}
            </span>
          </label>
        </div>

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
            {isEdit ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default StudentForm;
