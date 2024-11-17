import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      fetch("http://localhost:3030/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response.json();
          }
          navigate("/");
        })
        .then((data) => {
          if (data.status === 201 || data.status === 200) {
            logout();
            navigate("/reviews");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          navigate("/");
        });
    };

    performLogout();
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
