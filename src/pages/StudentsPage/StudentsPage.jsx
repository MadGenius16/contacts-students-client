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
import Modal from "../../components/Modal/Modal.jsx";
import css from "./StudentsPage.module.css";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredStudents = useSelector(selectFilteredStudents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dutyFilter, setDutyFilter] = useState("all"); // "all" | "dutyOn" | "dutyOff"

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
      })
      .catch((err) => {
        toast.error(typeof err === "string" ? err : "Failed to update duty");
      });
  };

  // Фільтрація по dutyFilter (якщо активовано чіп)
  const displayedStudents = Array.isArray(filteredStudents)
    ? filteredStudents.filter((student) => {
        if (dutyFilter === "dutyOn") return Boolean(student.onDuty);
        if (dutyFilter === "dutyOff") return !student.onDuty;
        return true;
      })
    : [];

  return (
    <div className={css.pageWrapper}>
      <Section>
        {/* Заголовок сторінки */}
        <div className={css.headerRow}>
          <h1 className={css.pageTitle}>Students</h1>
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

        {/* Рядок фільтрів та пагінації */}
        <div className={css.filterRow}>
          <div className={css.filterChips}>
            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "all" && css.activeChip,
              )}
              onClick={() => setDutyFilter("all")}
            >
              All
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "dutyOn" && css.activeChip,
              )}
              onClick={() =>
                setDutyFilter(dutyFilter === "dutyOn" ? "all" : "dutyOn")
              }
            >
              <span>Duty On</span>
              {dutyFilter === "dutyOn" && <LuX className={css.chipClose} />}
            </button>

            <button
              type="button"
              className={clsx(
                css.filterChip,
                dutyFilter === "dutyOff" && css.activeChip,
              )}
              onClick={() =>
                setDutyFilter(dutyFilter === "dutyOff" ? "all" : "dutyOff")
              }
            >
              <span>Duty Off</span>
              {dutyFilter === "dutyOff" && <LuX className={css.chipClose} />}
            </button>

            <button
              type="button"
              className={css.addFilterChip}
              onClick={() => setDutyFilter("all")}
            >
              +Add Filter
            </button>
          </div>

          <div className={css.paginationInfo}>
            <span>
              {displayedStudents.length} of {filteredStudents?.length || 0}{" "}
              students
            </span>
          </div>
        </div>

        {/* Стан завантаження або помилки */}
        {isLoading && <p className={css.statusText}>Loading students...</p>}
        {error && <p className={css.errorText}>Error: {error}</p>}

        {/* Список карток студентів */}
        <StudentList
          students={displayedStudents}
          onDeleteStudent={onDeleteStudent}
          onToggleDuty={onToggleDuty}
        />

        {/* Модальне вікно з формою додавання студента */}
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
      </Section>
    </div>
  );
};

export default StudentsPage;
