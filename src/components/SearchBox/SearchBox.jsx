import { useDispatch, useSelector } from "react-redux";
import { LuSearch, LuX } from "react-icons/lu";
import { changeFilter, selectFilter } from "../../redux/filters/slice.js";
import css from "./Searchbox.module.css";

const SearchBox = ({ placeholder = "Search students..." }) => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter) || "";

  const handleFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  const handleClear = () => {
    dispatch(changeFilter(""));
  };

  return (
    <div className={css.searchWrapper}>
      <input
        className={css.field}
        type="text"
        placeholder={placeholder}
        value={filterValue}
        onChange={handleFilter}
        aria-label="Search"
      />
      {filterValue ? (
        <button
          type="button"
          onClick={handleClear}
          className={css.clearBtn}
          aria-label="Clear search"
          title="Clear search"
        >
          <LuX className={css.searchIcon} />
        </button>
      ) : (
        <LuSearch className={css.searchIcon} />
      )}
    </div>
  );
};

export default SearchBox;
