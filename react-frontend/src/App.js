import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import ReviewForm from "./pages/Review";
import Home from "./pages/Home";
import Users from "./pages/Users";
import ProtectedRoute from "./components/global/ProtectedRoute";
import { useAuth } from "./context/Auth";
import Logout from "./components/global/Logout";
import DefaultNavbar from "./components/layout/DefaultNavbar";
import DashboardNavbar from "./components/layout/DashboardNavbar";
import "./App.css";
import AdminRoute from "./components/global/AdminRoute";
import Reviews from "./pages/Reviews";
import AdminPanel from "./pages/AdminPanel";
import UpdateUser from "./pages/User";

function App() {
  const { Auth } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      {isDashboardRoute ? (
        <DashboardNavbar>
          <Routes
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Route
              path="/dashboard"
              element={
                <AdminRoute Auth={Auth}>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <AdminRoute Auth={Auth}>
                  <Users />{" "}
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/reviews"
              element={
                <AdminRoute Auth={Auth}>
                  <Reviews />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/user/:id"
              element={
                <AdminRoute Auth={Auth}>
                  <UpdateUser />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <AdminRoute Auth={Auth}>
                  <h2>Page Not Found</h2>
                </AdminRoute>
              }
            />
          </Routes>
        </DashboardNavbar>
      ) : (
        <>
          <DefaultNavbar Auth={Auth} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route
                path="/review"
                element={
                  <ProtectedRoute Auth={Auth}>
                    <ReviewForm />
                  </ProtectedRoute>
                }
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
