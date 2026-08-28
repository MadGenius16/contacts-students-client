import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Section from "../../components/Section/Section.jsx";
import {
  addStudents,
  deleteStudent,
  fetchStudents,
  updateStudent,
} from "../../redux/students/operations.js";
import toast from "react-hot-toast";
import { selectError, selectLoading } from "../../redux/students/selectors.js";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import StudentList from "../../components/StudentList/StudentList.jsx";
import StudentForm from "../../components/StudentForm/StudentForm.jsx";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchStudents())
      .unwrap()
      .then(() => {
        toast.success("Students loaded📗");
      });
  }, [dispatch]);

  const onAddStudent = (studentObject) => {
    dispatch(addStudents(studentObject))
      .unwrap()
      .then(() => {
        toast.success("Student added📗");
      });
  };

  const onDeleteStudent = (studentId) => {
    dispatch(deleteStudent(studentId))
      .unwrap()
      .then(() => {
        toast.success("Student deleted📙");
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
      });
  };

  return (
    <>
      <Section>
        <StudentForm onAddStudent={onAddStudent} />
        <SearchBox title="Students" />
        {isLoading && <p>Loading students...</p>}
        {error && <p>Error: {error}</p>}
        <StudentList
          onDeleteStudent={onDeleteStudent}
          onToggleDuty={onToggleDuty}
        />
      </Section>
    </>
  );
};

export default StudentsPage;
