import { useSelector } from "react-redux";
import { selectFilteredStudents } from "../../redux/students/selectors";
import Student from "../Student/Student";
import css from "./StudentList.module.css";

const StudentList = ({ students, onDeleteStudent, onToggleDuty }) => {
  const storeStudents = useSelector(selectFilteredStudents);
  const studentList = students !== undefined ? students : storeStudents;

  return (
    <ul className={css.list}>
      {(!studentList || studentList.length === 0) && (
        <p className={css.empty}>No students found</p>
      )}
      {Array.isArray(studentList) &&
        studentList.map((student) => {
          return (
            <li className={css.item} key={student._id}>
              <Student
                student={student}
                onDeleteStudent={onDeleteStudent}
                onToggleDuty={onToggleDuty}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default StudentList;
