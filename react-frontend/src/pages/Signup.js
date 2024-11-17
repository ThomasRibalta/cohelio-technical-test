import React from "react";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const SignupForm = () => {
  const { login } = useAuth();
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
    },
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
    fetch("http://localhost:3030/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        console.log(response);
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

  return <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Sign Up" />;
};

export default SignupForm;
