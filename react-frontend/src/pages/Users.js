import React from "react";
import { useNavigate } from "react-router-dom";
import TableWithPaginationAndSorting from "../components/TableWithPaginationAndSorting/TableWithPaginationAndSorting";

const Users = () => {
  const navigate = useNavigate();

  const fetchUsers = async (page, sortType, filter) => {
    const response = await fetch(
      `http://51.254.125.168:3030/admin/users?page=${page}&sortby=${sortType.key}&order=${sortType.order}&only=${filter.only}&onlyname=${filter.onlyName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status !== 200) {
      navigate("/login");
      return { items: {}, totalPages: 1 };
    }
    const data = await response.json();
    return {
      items: data.response.clients,
      totalPages: data.response.totalPages,
    };
  };

  const userColumns = [
    { header: "Username", accessor: "username", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    { header: "Role", accessor: "role", sortable: false },
  ];

  const userActions = [
    {
      label: "Edit",
      onClick: (id) => {
        console.log(`Editing user ${id}`);
        navigate(`/dashboard/user/${id}`);
      },
      className: "btn btn-primary btn-sm",
    },
    {
      label: "Delete",
      onClick: (id) => {
        console.log(`Deleting user ${id}`);
        fetch(`http://51.254.125.168:3030/user/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User deleted successfully", data);
            navigate("/dashboard/users");
          })
          .catch((error) => {
            console.error("Error deleting user", error);
          });
      },
      className: "btn btn-danger btn-sm",
    },
  ];

  const selecter = [
    {
      name: "role",
      options: [
        { label: "All", value: "" },
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ];

  return (
    <div className="container">
      <h2>Users</h2>
      <TableWithPaginationAndSorting
        columns={userColumns}
        fetchData={fetchUsers}
        dataKey="_id"
        actions={userActions}
        selecter={selecter}
      />
    </div>
  );
};

export default Users;
