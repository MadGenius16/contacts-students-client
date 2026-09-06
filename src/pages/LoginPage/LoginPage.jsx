import LoginForm from "../../components/LoginForm/LoginForm";
import Section from "../../components/Section/Section";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={css.pageContainer}>
      <Section>
        <LoginForm />
      </Section>
    </div>
  );
};

export default LoginPage;
