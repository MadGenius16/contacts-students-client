import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";

// import { addContact } from "../../redux/contactsSlice.js";

const INITIAL_STATE = { name: "", number: "" };
const phoneRegExp = /[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  number: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone Format: XXX-XX-XX"),
});

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, actions) => {
    // console.log(values);
    const contactObject = {
      name: values.name,
      number: values.number,
    };
    onAddContact(contactObject);
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
          <h2 className={css.title}>PhoneBook</h2>
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
              name="number"
              type="text"
              placeholder="number"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="number"
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
