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
} from "../../redux/students/selectors.js";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import StudentList from "../../components/StudentList/StudentList.jsx";
import StudentForm from "../../components/StudentForm/StudentForm.jsx";
import StudentDetails from "../../components/StudentDetails/StudentDetails.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import css from "./StudentsPage.module.css";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredStudents = useSelector(selectFilteredStudents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [dutyFilter, setDutyFilter] = useState("all"); // "all" | "dutyOn" | "dutyOff" | "topMarks"

  // Стейт для пагінації (10, 16 або 24 на сторінку)
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchStudents())
      .unwrap()
      .then(() => {
        toast.success("Students loaded 📗");
      })
      .catch(() => {});
  }, [dispatch]);

  const onAddStudent = (studentObject) => {
    dispatch(addStudents(studentObject))
      .unwrap()
      .then(() => {
        toast.success("Student added successfully! 🎉");
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to add student");
      });
  };

  const onDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId))
      .unwrap()
      .then(() => {
        toast.success("Student deleted 📙");
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
        // Якщо зараз відкрита модалка 2х для цього студента, оновлюємо і її
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

  // Підрахунок кількості студентів за категоріями для бейджів
  const allCount = Array.isArray(filteredStudents)
    ? filteredStudents.length
    : 0;
  const dutyOnCount = Array.isArray(filteredStudents)
    ? filteredStudents.filter((s) => s.onDuty).length
    : 0;
  const dutyOffCount = Array.isArray(filteredStudents)
    ? filteredStudents.filter((s) => !s.onDuty).length
    : 0;

  // Фільтрація
  const displayedStudents = Array.isArray(filteredStudents)
    ? filteredStudents.filter((student) => {
        if (dutyFilter === "dutyOn") return Boolean(student.onDuty);
        if (dutyFilter === "dutyOff") return !student.onDuty;
        if (dutyFilter === "topMarks") return Number(student.avgMark) >= 10;
        return true;
      })
    : [];

  // Розрахунок пагінації
  const totalStudents = displayedStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalStudents / perPage));
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = (activePage - 1) * perPage;
  const paginatedStudents = displayedStudents.slice(
    startIndex,
    startIndex + perPage,
  );

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
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
        {/* Верхній заголовок сторінки */}
        <div className={css.headerRow}>
          <div className={css.titleWrapper}>
            <h1 className={css.pageTitle}>Students</h1>
            <span className={css.totalBadge}>{allCount} Total</span>
          </div>
          {isLoading && <p className={css.statusText}>Loading...</p>}
          {error && <p className={css.errorText}>Error: {error}</p>}
        </div>

        {/* Рядок пошуку та кнопка + Add Student */}
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

        {/* Рядок активних Pill-чіпів фільтрації та селектора Per page */}
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
              All ({allCount})
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
              <span>On Duty ({dutyOnCount})</span>
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
              <span>Duty Off ({dutyOffCount})</span>
              {dutyFilter === "dutyOff" && <LuX className={css.chipClose} />}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "topMarks" && css.activeChip,
              )}
              onClick={() => {
                setDutyFilter(dutyFilter === "topMarks" ? "all" : "topMarks");
                setCurrentPage(1);
              }}
            >
              <span>Top Marks (10+)</span>
              {dutyFilter === "topMarks" && <LuX className={css.chipClose} />}
            </button>
          </div>

          <div className={css.rightControls}>
            {/* Випадаючий список вибору кількості карток (10, 16, 24) */}
            <div className={css.perPageWrapper}>
              <label htmlFor="perPageSelect" className={css.perPageLabel}>
                Show:
              </label>
              <select
                id="perPageSelect"
                className={css.perPageSelect}
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value={10}>10</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>
        </div>

        {/* Список карток студентів */}
        <StudentList
          students={paginatedStudents}
          onDeleteStudent={onDeleteStudent}
          onToggleDuty={onToggleDuty}
          onViewStudent={(student) => setSelectedStudentForView(student)}
        />

        {/* Плаваючий капсульний пагінатор (Floating Pagination) */}
        {totalStudents > 0 && (
          <div className={css.floatingPaginationContainer}>
            <div className={css.floatingPagination}>
              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
              >
                Prev
              </button>

              <span className={css.floatingDivider} />

              <span className={css.floatingPageInfo}>
                Page {activePage} of {totalPages}
              </span>

              <span className={css.floatingDivider} />

              <button
                type="button"
                className={css.floatingBtn}
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* 1. Модальне вікно з формою додавання студента */}
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
      </Section>
    </div>
  );
};

export default StudentsPage;
