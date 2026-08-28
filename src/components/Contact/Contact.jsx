import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const Contact = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <ul className={css.wrap}>
        <li className={css.item}>
          <FaUser />
          <b className={css.text}>{contacts.name}</b>
        </li>
        <li className={css.item}>
          <IoIosCall />
          <b className={css.text}>{contacts.phoneNumber}</b>
        </li>
        {contacts.email && (
          <li className={css.item}>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {contacts.email}
            </span>
          </li>
        )}
      </ul>
      <button
        onClick={() => onDeleteContact(contacts._id)}
        className={css.btn}
        type="button"
      >
        ❌
      </button>
    </>
  );
};

export default Contact;
