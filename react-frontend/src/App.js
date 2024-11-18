import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import NoticeForm from "./pages/Notice";
import Users from "./pages/Users";
import ProtectedRoute from "./components/global/ProtectedRoute";
import { useAuth } from "./context/Auth";
import Logout from "./components/global/Logout";
import DefaultNavbar from "./components/layout/DefaultNavbar";
import DashboardNavbar from "./components/layout/DashboardNavbar";
import "./App.css";
import AdminRoute from "./components/global/AdminRoute";

const Home = () => <h2>Home</h2>;

function App() {
  const { Auth } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="App">
      {console.log(Auth, isDashboardRoute)}
      {isDashboardRoute ? (
        <DashboardNavbar>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <AdminRoute Auth={Auth}>
                  <h2>Admin Dashboard</h2>
                </AdminRoute>
              }
            />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/reviews" element={"salut"} />
            <Route path="/dashboard/*" element={<h2>Page Not Found</h2>} />
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
                path="/notice"
                element={
                  <ProtectedRoute Auth={Auth}>
                    <NoticeForm />
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
