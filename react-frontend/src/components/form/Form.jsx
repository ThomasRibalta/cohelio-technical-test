import React, { useState, useEffect } from "react";
import StarRating from "../global/StarRating";
import "./style.css";

const Form = ({ fields, onSubmit, buttonLabel }) => {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => {
      if (field.type === "checkbox") {
        acc[field.name] = field.multiple
          ? field.initialValue || []
          : field.initialValue || false;
      } else {
        acc[field.name] = field.initialValue || field.value || "";
      }
      return acc;
    }, {})
  );

  useEffect(() => {
    const updatedValues = fields.reduce((acc, field) => {
      if (field.type === "checkbox") {
        acc[field.name] = field.multiple
          ? field.initialValue || []
          : field.initialValue || false;
      } else {
        acc[field.name] = field.initialValue || field.value || "";
      }
      return acc;
    }, {});
    setFormValues(updatedValues);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => {
      if (type === "checkbox" && Array.isArray(prev[name])) {
        const updatedArray = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updatedArray };
      }
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
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
        <div key={field.name} className="form-group">
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
          ) : field.type === "checkbox" && field.multiple ? (
            field.options.map((option) => (
              <div key={option.value}>
                <input
                  type="checkbox"
                  id={`${field.name}_${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={formValues[field.name].includes(option.value)}
                  onChange={handleChange}
                />
                <label htmlFor={`${field.name}_${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))
          ) : field.type === "checkbox" ? (
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formValues[field.name]}
              onChange={handleChange}
            />
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
