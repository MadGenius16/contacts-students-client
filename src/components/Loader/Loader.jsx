import css from "./Loader.module.css";

const Loader = ({ text }) => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loader} />
      {text && <p className={css.text}>{text}</p>}
    </div>
  );
};

export default Loader;
