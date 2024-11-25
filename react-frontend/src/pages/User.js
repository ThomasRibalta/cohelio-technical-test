import React, { useEffect, useState } from "react";
import Form from "../components/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";

const UpdateUser = () => {
  const { login } = useAuth();
  const [user, setUser] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://51.254.125.168:3030/user/${id}`, {
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
        navigate("/");
      })
      .then((data) => {
        setUser(data.response);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate, id]);

  const fields = [
    {
      name: "username",
      label: "Username",
      value: user.username || "",
      type: "text",
      placeholder: "Enter new username",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      initialValue: user.role || "user",
      options: [
        { label: "admin", value: "admin" },
        { label: "user", value: "user" },
      ],
    },
    {
      name: "email",
      label: "Email",
      value: user.email || "",
      type: "email",
      placeholder: "Enter new email",
    },
    {
      name: "updatePassword",
      label: "Update Password",
      type: "checkbox",
      initialValue: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter new password",
    },
  ];

  const handleSubmit = (formValues) => {
    console.log("Updating user", formValues);
    fetch(`http://51.254.125.168:3030/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        navigate("/");
      })
      .then((data) => {
        if (data.status === 200) {
          login(data.response.client);
          navigate("/review");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/");
      });
  };

  return (
    <div className="content">
      <h2>Update user {id}</h2>
      <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Update user" />
    </div>
  );
};

export default UpdateUser;
