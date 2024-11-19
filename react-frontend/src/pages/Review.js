import React from "react";
import Form from "../components/form/Form";

const ReviewForm = () => {
  const fields = [
    {
      name: "improvements",
      label: "Choose the service you would like to rate instead",
      type: "select",
      initialValue: "Technical Support",
      options: [
        { label: "Technical Support", value: "Technical Support" },
        { label: "Billing and Payments", value: "Billing and Payments" },
        { label: "Product Inquiries", value: "Product Inquiries" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "comments",
      label: "Comments",
      type: "text",
      placeholder: "Your comments here",
    },
    {
      name: "rating",
      label: "Rating",
      type: "starRating",
      initialValue: "0",
      maxStars: 5,
    },
  ];

  const handleSubmit = (formValues) => {
    console.log("Avis soumis :", formValues);
  };

  return (
    <div>
      <h2>Send your review</h2>
      <Form fields={fields} onSubmit={handleSubmit} buttonLabel="Send review" />
    </div>
  );
};

export default ReviewForm;
