import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";

const INITIAL_STATE = {
  name: "",
  phoneNumber: "",
  email: "",
  contactType: "personal",
};

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .min(8, "Must be at least 8 digits")
    .max(20, "Too Long!")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactType: Yup.string()
    .oneOf(["work", "home", "personal"])
    .required("Contact type is required"),
});

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, actions) => {
    onAddContact(values);
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_STATE}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        <Form className={css.form}>
          <h2 className={css.title}>Add New Contact</h2>

          <label className={css.label}>
            <span>Name</span>
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="John Doe"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Phone Number</span>
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

          <label className={css.label}>
            <span>Email</span>
            <Field
              className={css.field}
              name="email"
              type="email"
              placeholder="john@example.com"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Type</span>
            <Field as="select" className={css.field} name="contactType">
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

          <button className={css.btn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
