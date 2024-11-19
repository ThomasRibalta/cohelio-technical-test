import React from "react";
import { useNavigate } from "react-router-dom";
import TableWithPaginationAndSorting from "../components/TableWithPaginationAndSorting/TableWithPaginationAndSorting";

const Users = () => {
  const navigate = useNavigate();

  const fetchUsers = async (page, sortType) => {
    const response = await fetch(
      `http://localhost:3030/users?page=${page}&sortby=${sortType.key}&order=${sortType.order}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status !== 200) navigate("/dashboard");
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
      onClick: (id) => console.log(`Editing user ${id}`),
      className: "btn btn-primary btn-sm",
    },
    {
      label: "Delete",
      onClick: (id) => console.log(`Deleting user ${id}`),
      className: "btn btn-danger btn-sm",
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
      />
    </div>
  );
};

export default Users;
