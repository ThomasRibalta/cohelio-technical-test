import React from "react";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const LoginForm = () => {
  const { login } = useAuth();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = (formValues) => {
    fetch("http://localhost:3030/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        }
        navigate("/");
      })
      .then((data) => {
        if (data.status === 201 || data.status === 200) {
          login();
          navigate("/reviews");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
      });
  };

  return <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Login" />;
};

export default LoginForm;
