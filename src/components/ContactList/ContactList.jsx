import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({
  contacts,
  onDeleteContact,
  onEditContact,
  onToggleFavourite,
}) => {
  return (
    <div className={css.tableCard}>
      {/* 1. Заголовки колонок таблиці (точно як на скріншоті) */}
      <div className={css.tableHeader}>
        <div className={css.thPhotoName}>Photo & Name</div>
        <div className={css.thContactInfo}>Contact Info</div>
        <div className={css.thRole}>Role</div>
        <div className={css.thStatus}>Status</div>
      </div>

      {/* 2. Тіло списку контактів */}
      <div className={css.tableBody}>
        {(!contacts || contacts.length === 0) && (
          <div className={css.emptyState}>
            <p className={css.emptyText}>No contacts found</p>
          </div>
        )}

        {Array.isArray(contacts) &&
          contacts.map((contact) => (
            <Contact
              key={contact._id}
              contact={contact}
              onDeleteContact={onDeleteContact}
              onEditContact={onEditContact}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
      </div>
    </div>
  );
};

export default ContactList;
