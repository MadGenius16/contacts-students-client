import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const INITIAL_STATE = {
  name: "",
  phoneNumber: "",
  email: "",
  contactType: "personal",
  isFavourite: false,
};

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Too Long!")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .min(3, "Phone number must be at least 3 characters")
    .max(20, "Too Long!")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address"),
  contactType: Yup.string()
    .oneOf(["work", "home", "personal"])
    .required("Contact type is required"),
  isFavourite: Yup.boolean(),
});

const ContactForm = ({
  onAddContact,
  initialData = null,
  isEdit = false,
  onCancel,
}) => {
  const handleSubmit = (values, actions) => {
    const payload = {
      name: values.name.trim(),
      phoneNumber: values.phoneNumber.trim(),
      contactType: values.contactType || "personal",
      isFavourite: Boolean(values.isFavourite),
    };

    // Додаємо email тільки якщо він не порожній (щоб уникнути помилки валідації порожнього рядка)
    if (values.email && values.email.trim()) {
      payload.email = values.email.trim();
    }

    onAddContact(payload);
    actions.resetForm();
  };

  const initialValues = initialData
    ? {
        name: initialData.name || "",
        phoneNumber: initialData.phoneNumber || initialData.phone || "",
        email: initialData.email || "",
        contactType: initialData.contactType || "personal",
        isFavourite: Boolean(initialData.isFavourite),
      }
    : INITIAL_STATE;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldGroup}>
          <label className={css.label}>
            <span className={css.labelText}>Full Name</span>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="Sarah Jenkins"
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
              placeholder="sarah.j@example.com"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>
            <span className={css.labelText}>Category / Role</span>
            <Field as="select" className={css.selectField} name="contactType">
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
            </Field>
            <ErrorMessage
              className={css.errorMessage}
              name="contactType"
              component="span"
            />
          </label>
        </div>

        <div className={css.checkboxGroup}>
          <label className={css.checkboxLabel}>
            <Field
              name="isFavourite"
              type="checkbox"
              className={css.checkbox}
            />
            <span className={css.checkboxText}>
              Add to Favourite contacts ⭐
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
            {isEdit ? "Save Changes" : "Add Contact"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
