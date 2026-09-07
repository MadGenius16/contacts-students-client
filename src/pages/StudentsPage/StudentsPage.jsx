import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPlus, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import clsx from "clsx";
import Section from "../../components/Section/Section.jsx";
import {
  addStudents,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "../../redux/students/operations.js";
import {
  selectError,
  selectLoading,
  selectFilteredStudents,
  selectTotalPages,
  selectTotalItems,
  selectHasNextPage,
  selectHasPrevPage,
} from "../../redux/students/selectors.js";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import StudentList from "../../components/StudentList/StudentList.jsx";
import StudentForm from "../../components/StudentForm/StudentForm.jsx";
import StudentDetails from "../../components/StudentDetails/StudentDetails.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./StudentsPage.module.css";

const StudentsPage = () => {
  const dispatch = useDispatch();

  // Дані з Redux
  const students = useSelector(selectFilteredStudents);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalPages = useSelector(selectTotalPages) || 1;
  const totalItems = useSelector(selectTotalItems) || 0;
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPrevPage = useSelector(selectHasPrevPage);

  // Локальний стейт для серверної пагінації та фільтрації
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(12);
  const [dutyFilter, setDutyFilter] = useState("all"); // "all" | "dutyOn" | "dutyOff"

  // Стейт модальних вікон
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null);

  // Конвертуємо стейт фільтра у булеве значення для сервера
  const onDutyParam =
    dutyFilter === "dutyOn"
      ? true
      : dutyFilter === "dutyOff"
        ? false
        : undefined;

  // Серверний запит щоразу при зміні сторінки, ліміту на сторінку або статусу чергування
  useEffect(() => {
    dispatch(
      fetchStudents({
        page: currentPage,
        perPage: currentPerPage,
        onDuty: onDutyParam,
      }),
    )
      .unwrap()
      .catch(() => {});
  }, [dispatch, currentPage, currentPerPage, onDutyParam]);

  const onAddStudent = (studentObject) => {
    dispatch(addStudents(studentObject))
      .unwrap()
      .then(() => {
        toast.success("Student added successfully! 🎉");
        setIsModalOpen(false);
        // Оновлюємо поточну сторінку з сервера
        dispatch(
          fetchStudents({
            page: currentPage,
            perPage: currentPerPage,
            onDuty: onDutyParam,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to add student");
      });
  };

  const onUpdateStudent = (updatedValues) => {
    if (!selectedStudentForEdit?._id) return;
    dispatch(
      updateStudent({
        studentId: selectedStudentForEdit._id,
        updateData: updatedValues,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Student updated successfully! ✏️");
        setSelectedStudentForEdit(null);
        // Оновлюємо поточну сторінку з сервера
        dispatch(
          fetchStudents({
            page: currentPage,
            perPage: currentPerPage,
            onDuty: onDutyParam,
          }),
        );
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update student");
      });
  };

  const onDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId))
      .unwrap()
      .then(() => {
        toast.success("Student deleted 📙");
        // Якщо на сторінці був лише 1 студент і ми видалили його на сторінці > 1
        if (students.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          dispatch(
            fetchStudents({
              page: currentPage,
              perPage: currentPerPage,
              onDuty: onDutyParam,
            }),
          );
        }
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to delete student");
      });
  };

  const onToggleDuty = (studentId, currentStatus) => {
    dispatch(
      updateStudent({
        studentId,
        updateData: { onDuty: !currentStatus },
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Duty status updated! 🛡️");
        if (selectedStudentForView && selectedStudentForView._id === studentId) {
          setSelectedStudentForView((prev) => ({
            ...prev,
            onDuty: !currentStatus,
          }));
        }
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update duty");
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

  return (
    <div className={css.pageWrapper}>
      <Section>
        {/* 1. Верхній заголовок сторінки */}
        <div className={css.headerRow}>
          <div className={css.titleWrapper}>
            <h1 className={css.pageTitle}>Students</h1>
            <span className={css.totalBadge}>{totalItems} Total</span>
          </div>
          {error && <p className={css.errorText}>Error: {error}</p>}
        </div>

        {/* 2. Рядок пошуку та кнопка + Add Student */}
        <div className={css.searchBarRow}>
          <SearchBox placeholder="Search students..." />
          <button
            type="button"
            className={css.btnAddStudent}
            onClick={() => setIsModalOpen(true)}
          >
            <LuPlus className={css.plusIcon} />
            <span>Add Student</span>
          </button>
        </div>

        {/* 3. Рядок активних Pill-чіпів фільтрації та вибору кількості */}
        <div className={css.filterRow}>
          <div className={css.filterChips}>
            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "all" && css.activeChip,
              )}
              onClick={() => {
                setDutyFilter("all");
                setCurrentPage(1);
              }}
            >
              All
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "dutyOn" && css.activeChip,
              )}
              onClick={() => {
                setDutyFilter(dutyFilter === "dutyOn" ? "all" : "dutyOn");
                setCurrentPage(1);
              }}
            >
              <span>On Duty</span>
              {dutyFilter === "dutyOn" && <LuX className={css.chipClose} />}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "dutyOff" && css.activeChip,
              )}
              onClick={() => {
                setDutyFilter(dutyFilter === "dutyOff" ? "all" : "dutyOff");
                setCurrentPage(1);
              }}
            >
              <span>Duty Off</span>
              {dutyFilter === "dutyOff" && <LuX className={css.chipClose} />}
            </button>
          </div>

          <div className={css.rightControls}>
            {/* Випадаючий список вибору кількості карток на сторінку (12, 16, 24) */}
            <div className={css.perPageWrapper}>
              <label htmlFor="perPageSelect" className={css.perPageLabel}>
                Show:
              </label>
              <select
                id="perPageSelect"
                className={css.perPageSelect}
                value={currentPerPage}
                onChange={handlePerPageChange}
              >
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Список карток студентів з поточної сторінки сервера */}
        {isLoading && (!students || students.length === 0) ? (
          <Loader text="Loading students..." />
        ) : (
          <StudentList
            students={students}
            onDeleteStudent={onDeleteStudent}
            onToggleDuty={onToggleDuty}
            onViewStudent={(student) => setSelectedStudentForView(student)}
            onEditStudent={(student) => setSelectedStudentForEdit(student)}
          />
        )}

        {/* 5. Плаваючий капсульний пагінатор (Floating Pagination) */}
        {totalItems > 0 && (
          <div className={css.floatingPaginationContainer}>
            <div className={css.floatingPagination}>
              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage && currentPage === 1}
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
                disabled={!hasNextPage && currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* 1. Модальне вікно додавання студента */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Student"
        >
          <StudentForm
            onAddStudent={onAddStudent}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>

        {/* 2. Модальне вікно перегляду картки студента 2х */}
        <Modal
          isOpen={Boolean(selectedStudentForView)}
          onClose={() => setSelectedStudentForView(null)}
          title="Student Profile"
        >
          <StudentDetails
            student={selectedStudentForView}
            onToggleDuty={onToggleDuty}
            onClose={() => setSelectedStudentForView(null)}
          />
        </Modal>

        {/* 3. Модальне вікно редагування студента */}
        <Modal
          isOpen={Boolean(selectedStudentForEdit)}
          onClose={() => setSelectedStudentForEdit(null)}
          title="Edit Student Profile"
        >
          <StudentForm
            initialData={selectedStudentForEdit}
            isEdit={true}
            onAddStudent={onUpdateStudent}
            onCancel={() => setSelectedStudentForEdit(null)}
          />
        </Modal>
      </Section>
    </div>
  );
};

export default StudentsPage;
