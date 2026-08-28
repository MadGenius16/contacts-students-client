import { useSelector } from "react-redux";
import { selectFilteredStudents } from "../../redux/students/selectors";
import Student from "../Student/Student";
import css from "./StudentList.module.css";

const StudentList = ({ onDeleteStudent, onToggleDuty }) => {
  const filteredStudents = useSelector(selectFilteredStudents);
  return (
    <ul className={css.list}>
      {filteredStudents?.length === 0 && <p>No students</p>}
      {Array.isArray(filteredStudents) &&
        filteredStudents.map((student) => {
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
