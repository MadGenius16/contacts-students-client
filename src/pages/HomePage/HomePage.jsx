import Section from "../../components/Section/Section";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <Section>
        {" "}
        <h2 className={css.title}>Discover the of Web Apps</h2>
        <p className={css.text}>Fast, secure, and easy to use.</p>
        <div className={css.card}>
          <h3>🚀 Speed</h3>
          <p>Optimized performance for modern browsers.</p>
        </div>
        <div className={css.card}>
          <h3>🔒 Security</h3>
          <p>Reliable authentication and data protection.</p>
        </div>
        <div className={css.card}>
          <h3>⚡ Scalability</h3>
          <p>Grow your project without limits.</p>
        </div>
        <div className={css.card}>
          <h3>📱 Cross-Platform</h3>
          <p>Access your app from anywhere.</p>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
