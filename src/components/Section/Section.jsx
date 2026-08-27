import css from "./Section.module.css";

const Section = ({ children, title }) => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        {title && <h2 className={css.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
};

export default Section;
