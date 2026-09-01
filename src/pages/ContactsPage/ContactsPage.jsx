import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPlus, LuStar, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import clsx from "clsx";
import Section from "../../components/Section/Section.jsx";
import ContactList from "../../components/ContactList/ContactList.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../../redux/contacts/operations.js";
import {
  selectContacts,
  selectError,
  selectLoading,
  selectTotalItems,
  selectTotalPages,
  selectHasNextPage,
  selectHasPrevPage,
} from "../../redux/contacts/selectors.js";
import { selectFilter } from "../../redux/filters/slice.js";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const totalItems = useSelector(selectTotalItems);
  const totalPages = useSelector(selectTotalPages);
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPrevPage = useSelector(selectHasPrevPage);
  const filterValue = useSelector(selectFilter);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Фільтр категорій / улюблених
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "favourites" | "personal" | "work" | "home"

  // Стейт серверної пагінації (Show та сторінки)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(10);

  // Стейт модальних вікон
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContactForEdit, setSelectedContactForEdit] = useState(null);

  // Запит контактів з бекенду при зміні сторінки, ліміту, фільтра чи пошуку
  useEffect(() => {
    const params = {
      page: currentPage,
      perPage: currentPerPage,
    };

    if (activeFilter === "favourites") {
      params.isFavourite = true;
    } else if (activeFilter !== "all") {
      params.contactType = activeFilter;
    }

    if (filterValue && filterValue.trim()) {
      params.search = filterValue.trim();
    }

    dispatch(fetchContacts(params))
      .unwrap()
      .catch(() => {});
  }, [dispatch, currentPage, currentPerPage, activeFilter, filterValue]);

  const onAddContact = (contactObject) => {
    dispatch(addContact(contactObject))
      .unwrap()
      .then(() => {
        toast.success("Contact added successfully! 🎉");
        setIsAddModalOpen(false);
        // Оновлюємо поточну сторінку
        dispatch(
          fetchContacts({
            page: currentPage,
            perPage: currentPerPage,
            ...(activeFilter === "favourites"
              ? { isFavourite: true }
              : activeFilter !== "all"
                ? { contactType: activeFilter }
                : {}),
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to add contact");
      });
  };

  const onUpdateContact = (updatedValues) => {
    if (!selectedContactForEdit?._id) return;
    dispatch(
      updateContact({
        contactId: selectedContactForEdit._id,
        updateData: updatedValues,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully! ✏️");
        setSelectedContactForEdit(null);
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update contact");
      });
  };

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted 📙");
        // Якщо на поточній сторінці залишився 1 контакт і це не перша сторінка — переходимо назад
        if (contacts.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          dispatch(
            fetchContacts({
              page: currentPage,
              perPage: currentPerPage,
              ...(activeFilter === "favourites"
                ? { isFavourite: true }
                : activeFilter !== "all"
                  ? { contactType: activeFilter }
                  : {}),
            }),
          );
        }
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to delete contact");
      });
  };

  const onToggleFavourite = (contactId, currentStatus) => {
    dispatch(
      updateContact({
        contactId,
        updateData: { isFavourite: !currentStatus },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success(
          !currentStatus ? "Added to favourites ⭐" : "Removed from favourites",
        );
        // Якщо ми у вкладці Favourites і зняли зірочку — оновлюємо список
        if (activeFilter === "favourites") {
          dispatch(
            fetchContacts({
              page: currentPage,
              perPage: currentPerPage,
              isFavourite: true,
            }),
          );
        }
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update status");
      });
  };

  const handlePerPageChange = (e) => {
    setCurrentPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFilterChange = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? "all" : filterName));
    setCurrentPage(1);
  };

  return (
    <div className={css.pageWrapper}>
      <Section>
        {/* 1. Верхній заголовок сторінки */}
        <div className={css.headerRow}>
          <div className={css.titleWrapper}>
            <h1 className={css.pageTitle}>Contacts</h1>
            <span className={css.totalBadge}>{totalItems} Total</span>
          </div>
          {isLoading && <p className={css.statusText}>Loading...</p>}
          {error && <p className={css.errorText}>Error: {error}</p>}
        </div>

        {/* 2. Рядок пошуку та кнопка + Add Contact */}
        <div className={css.searchBarRow}>
          <SearchBox placeholder="Search contacts..." />
          <button
            type="button"
            className={css.btnAddContact}
            onClick={() => setIsAddModalOpen(true)}
          >
            <LuPlus className={css.plusIcon} />
            <span>Add Contact</span>
          </button>
        </div>

        {/* 3. Рядок активних чіпів фільтрації та вибору Show */}
        <div className={css.filterRow}>
          <div className={css.filterChips}>
            <button
              type="button"
              className={clsx(
                css.filterChip,
                activeFilter === "all" && css.activeChip,
              )}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                activeFilter === "favourites" && css.activeChip,
                css.favChip,
              )}
              onClick={() => handleFilterChange("favourites")}
            >
              <LuStar className={css.chipStarIcon} />
              <span>Favourites</span>
              {activeFilter === "favourites" && (
                <LuX className={css.chipClose} />
              )}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                activeFilter === "personal" && css.activeChip,
              )}
              onClick={() => handleFilterChange("personal")}
            >
              <span>Personal</span>
              {activeFilter === "personal" && (
                <LuX className={css.chipClose} />
              )}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                activeFilter === "work" && css.activeChip,
              )}
              onClick={() => handleFilterChange("work")}
            >
              <span>Work</span>
              {activeFilter === "work" && <LuX className={css.chipClose} />}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                activeFilter === "home" && css.activeChip,
              )}
              onClick={() => handleFilterChange("home")}
            >
              <span>Home</span>
              {activeFilter === "home" && <LuX className={css.chipClose} />}
            </button>
          </div>

          {/* Випадаючий список вибору кількості рядків на сторінку (Show: 10, 15, 20, 30, 50) */}
          <div className={css.rightControls}>
            <div className={css.perPageWrapper}>
              <label htmlFor="contactsPerPageSelect" className={css.perPageLabel}>
                Show:
              </label>
              <select
                id="contactsPerPageSelect"
                className={css.perPageSelect}
                value={currentPerPage}
                onChange={handlePerPageChange}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Табличний список контактів поточної серверної сторінки */}
        <ContactList
          contacts={contacts}
          onDeleteContact={onDeleteContact}
          onEditContact={(contact) => setSelectedContactForEdit(contact)}
          onToggleFavourite={onToggleFavourite}
        />

        {/* 5. Плаваючий капсульний пагінатор (Prev / Next) */}
        {totalItems > 0 && (
          <div className={css.floatingPaginationContainer}>
            <div className={css.floatingPagination}>
              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || !hasPrevPage}
              >
                Prev
              </button>

              <span className={css.floatingDivider} />

              <span className={css.floatingPageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <span className={css.floatingDivider} />

              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || !hasNextPage}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Модальне вікно створення контакту */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Contact"
        >
          <ContactForm
            onAddContact={onAddContact}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        {/* Модальне вікно редагування контакту */}
        <Modal
          isOpen={Boolean(selectedContactForEdit)}
          onClose={() => setSelectedContactForEdit(null)}
          title="Edit Contact Profile"
        >
          <ContactForm
            initialData={selectedContactForEdit}
            isEdit={true}
            onAddContact={onUpdateContact}
            onCancel={() => setSelectedContactForEdit(null)}
          />
        </Modal>
      </Section>
    </div>
  );
};

export default ContactsPage;
