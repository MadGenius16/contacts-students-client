import Section from "../../components/Section/Section.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addContact,
  deleteContact,
  fetchContacts,
} from "../../redux/contacts/operations.js";
import { selectError, selectLoading } from "../../redux/contacts/selectors.js";
import toast from "react-hot-toast";
// import { selectFilter } from "../../redux/filtersSlice.js";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        toast.success("Contacts loaded📗");
      });
  }, [dispatch]);

  const onAddContact = (contactObject) => {
    dispatch(addContact(contactObject))
      .unwrap()
      .then(() => {
        toast.success("Contact added📗");
      });
  };
  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted📙");
      });
  };
  return (
    <>
      <Section>
        <ContactForm onAddContact={onAddContact} />
        <SearchBox title="Contacts" />
        {isLoading && <p>Loading contacts...</p>}
        {error && <p>Error: {error}</p>}
        <ContactList onDeleteContact={onDeleteContact} />
      </Section>
    </>
  );
};

export default ContactsPage;
