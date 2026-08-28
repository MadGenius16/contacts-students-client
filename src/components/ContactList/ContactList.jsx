import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = ({ onDeleteContact }) => {
  const filteredContacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.list}>
      {filteredContacts?.length === 0 && <p>No contacts</p>}
      {Array.isArray(filteredContacts) &&
        filteredContacts.map((contact) => {
          return (
            <li className={css.item} key={contact._id}>
              <Contact contacts={contact} onDeleteContact={onDeleteContact} />
            </li>
          );
        })}
    </ul>
  );
};

export default ContactList;
