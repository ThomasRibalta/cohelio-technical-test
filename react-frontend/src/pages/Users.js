import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Users = () => {
  const { Auth } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(
    (page) => {
      fetch(`http://localhost:3030/users?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          navigate("/dashboard");
        })
        .then((data) => {
          setUsers(data.response.clients);
          setTotalPages(data.response.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          navigate("/dashboard");
        });
    },
    [navigate]
  );

  useEffect(() => {
    if (!Auth.isAuthenticated || Auth.user.role !== "admin") {
      navigate("/login");
    }

    fetchUsers(currentPage);
  }, [currentPage, Auth, navigate, fetchUsers]);

  const handleEditUser = (userId) => {
    // Logic for editing a user
    console.log(`Editing user ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Logic for deleting a user
    console.log(`Deleting user ${userId}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="td-btn">
                <button
                  onClick={() => handleEditUser(user._id)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-secondary"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
