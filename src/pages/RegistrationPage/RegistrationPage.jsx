import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Section from "../../components/Section/Section";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={css.pageContainer}>
      <Section>
        <RegistrationForm />
      </Section>
    </div>
  );
};

export default RegistrationPage;
