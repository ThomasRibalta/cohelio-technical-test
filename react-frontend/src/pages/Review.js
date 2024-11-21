import React from "react";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const fields = [
    {
      name: "type",
      label: "Choose the service you would like to rate instead",
      type: "select",
      initialValue: "Technical Support",
      options: [
        { label: "Technical Support", value: "Technical Support" },
        { label: "Billing and Payments", value: "Billing and Payments" },
        { label: "Product Inquiries", value: "Product Inquiries" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      name: "content",
      label: "Comments",
      type: "text",
      placeholder: "Your comments here",
    },
    {
      name: "rate",
      label: "Rating",
      type: "starRating",
      initialValue: 1,
      maxStars: 5,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = (formValues) => {
    fetch("http://localhost:3030/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Avis soumis avec succès", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission de l'avis", error);
        navigate("/");
      });
    console.log("Avis soumis :", formValues);
  };

  return (
    <div className="content">
      <h2>Send your review</h2>
      <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Send review" />
    </div>
  );
};

export default ReviewForm;
