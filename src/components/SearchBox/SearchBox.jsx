import { useSelector } from "react-redux";
import css from "./Searchbox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter.name);
  const handleFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div>
      <h3 className={css.text}>Find contacts by name</h3>
      <input
        className={css.field}
        type="text"
        name="search"
        value={filterValue}
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBox;
