import { useState, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { LuCamera, LuTrash2 } from "react-icons/lu";
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
  email: Yup.string().email("Invalid email address"),
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
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.photo || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (values, actions) => {
    const payload = {
      name: values.name.trim(),
      phoneNumber: values.phoneNumber.trim(),
      contactType: values.contactType || "personal",
      isFavourite: Boolean(values.isFavourite),
    };

    if (values.email && values.email.trim()) {
      payload.email = values.email.trim();
    }

    if (photoFile) {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phoneNumber", payload.phoneNumber);
      if (payload.email) {
        formData.append("email", payload.email);
      }
      formData.append("contactType", payload.contactType);
      formData.append("isFavourite", payload.isFavourite);
      formData.append("photo", photoFile);

      onAddContact(formData);
    } else {
      onAddContact(payload);
    }

    actions.resetForm();
  };

  const initialValues = initialData
    ? {
        name: initialData.name || "",
        phoneNumber: initialData.phoneNumber || "",
        email: initialData.email || "",
        contactType: initialData.contactType || "personal",
        isFavourite: Boolean(initialData.isFavourite),
      }
    : INITIAL_STATE;

  const initial = initialValues.name ? initialValues.name[0].toUpperCase() : "C";

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        {/* Блок завантаження аватара */}
        <div className={css.avatarUploadSection}>
          <div className={css.avatarPreviewWrapper}>
            <div className={css.avatarPreview}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar preview"
                  className={css.avatarImg}
                />
              ) : (
                <span className={css.avatarInitial}>{initial}</span>
              )}
            </div>

            <button
              type="button"
              className={css.cameraBtn}
              onClick={() => fileInputRef.current?.click()}
              title="Upload photo"
              aria-label="Upload photo"
            >
              <LuCamera className={css.cameraIcon} />
            </button>
          </div>

          <div className={css.avatarInfo}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className={css.hiddenInput}
            />
            <div className={css.avatarButtons}>
              <button
                type="button"
                className={css.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? "Change photo" : "Upload photo"}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  className={css.removePhotoBtn}
                  onClick={handleRemovePhoto}
                  title="Remove photo"
                >
                  <LuTrash2 className={css.removeIcon} />
                  <span>Remove</span>
                </button>
              )}
            </div>
            <span className={css.uploadHint}>JPG, PNG or WEBP</span>
          </div>
        </div>

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
