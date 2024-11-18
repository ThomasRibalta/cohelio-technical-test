import React, { useState } from "react";
import StarRating from "../global/StarRating";
import "./style.css";

const Form = ({ fields, onSubmit, buttonLabel }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue || "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStarChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === "radio" ? (
            field.options.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name={field.name}
                  value={option.value}
                  checked={formValues[field.name] === option.value}
                  onChange={handleChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formValues[field.name]}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "starRating" ? (
            <StarRating
              maxStars={field.maxStars || 5}
              onChange={(value) => handleStarChange(field.name, value)}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formValues[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default Form;
