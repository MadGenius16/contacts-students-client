import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Section from "../Section/Section.jsx";
import { useDispatch, useSelector } from "react-redux";
import { apiRefresh } from "../../redux/auth/operations.js";
import {
  selectAuthIsRefreshing,
  selectAuthToken,
} from "../../redux/auth/selectors.js";
import Layout from "../Layout/Layout.jsx";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute.jsx";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute.jsx";
import css from "./App.module.css";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage.jsx"),
);
const ContactsPage = lazy(
  () => import("../../pages/ContactsPage/ContactsPage.jsx"),
);
const StudentsPage = lazy(
  () => import("../../pages/StudentsPage/StudentsPage.jsx"),
);
const NotFound = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage.jsx"),
);
const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const token = useSelector(selectAuthToken);
  // const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  // const user = useSelector(selectAuthUser);
  useEffect(() => {
    if (!token) return;
    dispatch(apiRefresh());
  }, [dispatch, token]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>;
  }

  return (
    <div>
      <header>
        <Section>
          <Layout />
        </Section>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/contacts"
              element={<PrivateRoute component={<ContactsPage />} />}
            />
            <Route
              path="/students"
              element={<PrivateRoute component={<StudentsPage />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer className={css.footer}>
        <Section>
          <p>© 2026 MyApp. Crafted with ❤️</p>
        </Section>
      </footer>
    </div>
  );
};

export default App;
