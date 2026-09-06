import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LuUsers,
  LuContact,
  LuMessageSquareQuote,
  LuLogIn,
  LuUserPlus,
} from "react-icons/lu";
import Section from "../../components/Section/Section.jsx";
import DashboardCard from "../../components/DashboardCard/DashboardCard.jsx";
import { fetchStudents } from "../../redux/students/operations.js";
import { fetchContacts } from "../../redux/contacts/operations.js";
import { fetchReviews } from "../../redux/reviews/operations.js";
import { selectTotalItems as selectStudentsCount } from "../../redux/students/selectors.js";
import { selectTotalItems as selectContactsCount } from "../../redux/contacts/selectors.js";
import { selectReviewsTotalItems } from "../../redux/reviews/selectors.js";
import {
  selectAuthUser,
  selectAuthIsLoggedIn,
} from "../../redux/auth/selectors.js";
import dashboardSketch from "../../assets/dashboard-sketch.jpg";
import css from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const user = useSelector(selectAuthUser);

  const studentsCount = useSelector(selectStudentsCount) || 0;
  const contactsCount = useSelector(selectContactsCount) || 0;
  const reviewsCount = useSelector(selectReviewsTotalItems) || 0;

  // Підвантажуємо актуальні лічильники при відкритті головної сторінки
  useEffect(() => {
    dispatch(fetchReviews({ page: 1, perPage: 1 })).catch(() => {});
    if (isLoggedIn) {
      dispatch(fetchStudents({ page: 1, perPage: 1 })).catch(() => {});
      dispatch(fetchContacts({ page: 1, perPage: 1 })).catch(() => {});
    }
  }, [dispatch, isLoggedIn]);

  const userName =
    user?.name ||
    (user?.email ? user.email.split("@")[0] : isLoggedIn ? "Teacher" : "there");

  return (
    <div className={css.pageWrapper}>
      <Section>
        {/* 1. Верхній заголовок сторінки */}
        <div className={css.headerSection}>
          <h1 className={css.mainTitle}>STUDENTCENTRAL</h1>
          {isLoggedIn ? (
            <p className={css.welcomeText}>
              Welcome back, <span className={css.userName}>{userName}</span>!
              Manage your academic ecosystem in one place.
            </p>
          ) : (
            <p className={css.welcomeText}>
              Welcome to StudentCentral! Sign in or register to manage your
              students, contacts, and community reviews.
            </p>
          )}
        </div>

        {/* 2. Рядок з функціональними картками */}
        <div className={css.cardsGrid}>
          {isLoggedIn ? (
            <>
              {/* Картка 1: Студенти */}
              <div className={css.cardCol}>
                <DashboardCard
                  icon={<LuUsers />}
                  title="Students"
                  subtitle={`Manage ${studentsCount} students`}
                  metricsText="Directory & Duty"
                  primaryActionText="Go to Students"
                  onPrimaryAction={() => navigate("/students")}
                />
              </div>

              {/* Картка 2: Контакти */}
              <div className={css.cardCol}>
                <DashboardCard
                  icon={<LuContact />}
                  title="Contacts"
                  subtitle={`Connect ${contactsCount} contacts`}
                  metricsText="Phone & Email"
                  primaryActionText="Go to Contacts"
                  onPrimaryAction={() => navigate("/contacts")}
                />
              </div>

              {/* Картка 3: Відгуки */}
              <div className={css.cardCol}>
                <DashboardCard
                  icon={<LuMessageSquareQuote />}
                  title="Reviews"
                  subtitle={`Explore ${reviewsCount} reviews`}
                  metricsText="Community Feedback"
                  primaryActionText="Go to Reviews"
                  onPrimaryAction={() => navigate("/reviews")}
                />
              </div>
            </>
          ) : (
            <>
              {/* Картка для гостя 1: Вхід */}
              <div className={css.cardColTwo}>
                <DashboardCard
                  icon={<LuLogIn />}
                  title="Sign In"
                  subtitle="Access your academic ecosystem"
                  metricsText="Existing Account"
                  primaryActionText="Go to Login"
                  onPrimaryAction={() => navigate("/login")}
                />
              </div>

              {/* Картка для гостя 2: Реєстрація */}
              <div className={css.cardColTwo}>
                <DashboardCard
                  icon={<LuUserPlus />}
                  title="Create Account"
                  subtitle="Start managing students and contacts"
                  metricsText="New Educator"
                  primaryActionText="Register Now"
                  onPrimaryAction={() => navigate("/register")}
                />
              </div>
            </>
          )}
        </div>

        {/* 3. Нижній блок: Атмосферна навчальна ілюстрація */}
        <div className={css.illustrationSection}>
          <div className={css.illustrationWrapper}>
            <img
              src={dashboardSketch}
              alt="Collaborative learning and classroom analytics"
              className={css.illustrationImg}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
