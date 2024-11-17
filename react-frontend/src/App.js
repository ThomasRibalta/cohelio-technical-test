import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import ProtectedRoute from "./components/global/ProtectedRoute";
import { useAuth } from "./context/Auth";
import Logout from "./components/global/Logout";
import DefaultNavbar from "./components/layout/DefaultNavbar";
import "./App.css";
import AdminRoute from "./components/global/AdminRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

const Home = () => <h2>Home</h2>;
const Reviews = () => <h2>Reviews</h2>;

function App() {
  const { Auth } = useAuth();

  const isDashboardRoute = window.location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      {!isDashboardRoute && <DefaultNavbar Auth={Auth} />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute Auth={Auth}>
                <Reviews />
              </ProtectedRoute>
            }
          />
          {!Auth.isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </>
          ) : (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/dashboard/*"
                element={
                  <AdminRoute Auth={Auth}>
                    <DashboardLayout />
                    <h2>Admin Dashboard</h2>
                  </AdminRoute>
                }
              />
            </>
          )}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
