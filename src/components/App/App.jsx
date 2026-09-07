import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRefresh } from "../../redux/auth/operations.js";
import { selectAuthIsRefreshing } from "../../redux/auth/selectors.js";
import Layout from "../Layout/Layout.jsx";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute.jsx";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";
const ReviewsPage = lazy(
  () => import("../../pages/ReviewsPage/ReviewsPage.jsx"),
);
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
const ResetPasswordPage = lazy(
  () => import("../../pages/ResetPasswordPage/ResetPasswordPage.jsx"),
);
const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  // const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  // const user = useSelector(selectAuthUser);
  useEffect(() => {
    dispatch(apiRefresh());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader text="Refreshing user..." />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
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
            path="/reset-password"
            element={<RestrictedRoute component={<ResetPasswordPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={<ContactsPage />} />}
          />
          <Route
            path="/students"
            element={<PrivateRoute component={<StudentsPage />} />}
          />
          <Route
            path="/reviews"
            element={<PrivateRoute component={<ReviewsPage />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
