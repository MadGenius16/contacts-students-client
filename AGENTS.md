# AGENTS.md — Fullstack Project Constitution

This document defines the architectural standards, technology stack, coding conventions, and agent protocols for the **Contacts & Students Management** application.

---

## 1. Agent Protocols & Behavioral Guidelines

- **Communication Language:** Always communicate with the user, provide explanations, write implementation plans, and format commit messages in **Ukrainian** (`uk-UA`).
- **Code Quality & Hygiene:**
  - Strictly adhere to ESLint (`eslint.config.js`) and Prettier rules.
  - Avoid leaving temporary `console.log` statements in production code; keep them only when strictly necessary for debugging.
  - Before completing tasks or proposing commits, ensure linting passes cleanly (run `/check-code` or `npm run lint`).

---

## 2. Project Overview & Business Domain

The application is a fullstack web platform for managing contacts, students, and user reviews with comprehensive authentication:
- **Authentication & Authorization:** Registration, Login, Token Refresh (JWT Bearer tokens), Password Reset flow via email, and route protection.
- **Students Management:** Full CRUD operations for student records, detailed profile views, and filtering.
- **Contacts Management:** Contact list management, real-time search, filters, and modal-based edit/delete workflows.
- **Reviews:** User testimonials and review creation/listing.

---

## 3. Frontend Architecture (React 19 + Vite)

### 3.1. Tech Stack
- **Framework & Build Tool:** React 19, Vite (`@vitejs/plugin-react-swc`).
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`), `redux-persist` for persisting authentication credentials.
- **Routing:** `react-router-dom` v7 with `PrivateRoute` and `RestrictedRoute` guards.
- **HTTP Client:** `axios` with Bearer token authentication and interceptors.
- **Forms & Validation:** `formik` with `yup` schemas.
- **UI & Utilities:** `react-hot-toast` (notifications), `react-icons`, `clsx`, `nanoid`, `modern-normalize`.

### 3.2. Component Conventions
- **Component Style:** Use **functional components** and modern React Hooks exclusively (no class components).
- **Naming & File Structure:**
  - Component names and files must be in `PascalCase` (e.g., `StudentList.jsx`, `ContactForm.jsx`).
  - Keep each component isolated in its own directory with its associated styles (e.g., `src/components/StudentCard/StudentCard.jsx` and `StudentCard.module.css`).
- **Safe Rendering:**
  - Always guard array iterations before calling `.map()` using `Array.isArray(data)` or optional chaining `data?.map(...)`.

### 3.3. Styling Constraints
- **Allowed:** Standard CSS Modules (`*.module.css`) and global `.css` baseline styles.
- **Strictly Prohibited:** **NO Tailwind CSS**.
- **Strictly Prohibited:** **NO CSS Grid** (Use Flexbox, box-model layouts, and standard positioning instead).

### 3.4. Redux Store Organization
Slice modules in `src/redux/<domain>/` must adhere to the 3-file pattern:
- `operations.js` — Async thunk actions (`createAsyncThunk`) using `rejectWithValue` for structured error handling.
- `slice.js` — State slice definition, synchronous reducers, and `extraReducers` using the builder callback pattern.
- `selectors.js` — Memoized and base selectors for component consumption.

---

## 4. Backend Architecture (Node.js & Express)

### 4.1. Architecture & Layering
- **Platform:** Node.js, Express.js REST API.
- **Database:** MongoDB with Mongoose ODM.
- **Layered Architecture:** 
  `Routes` -> `Middlewares (Auth, Validation)` -> `Controllers` -> `Services / Models`

### 4.2. Error Handling & Stability
- Wrap all asynchronous route controllers in `try/catch` blocks or use a controller wrapper middleware (e.g., `ctrlWrapper`) to catch unhandled promise rejections.
- The server process must never crash on unhandled errors.

### 4.3. API Response Format & HTTP Status Codes
All responses must return valid JSON with appropriate HTTP status codes:
- `200 OK` — Successful GET, PATCH, PUT, or DELETE with payload.
- `201 Created` — Successful POST resource creation.
- `204 No Content` — Successful DELETE without body content.
- `400 Bad Request` — Validation errors or malformed payload.
- `401 Unauthorized` — Missing, invalid, or expired JWT Bearer token.
- `403 Forbidden` — Access to resources owned by another user is denied.
- `404 Not Found` — Resource or route not found.
- `500 Internal Server Error` — Unhandled server exceptions.
