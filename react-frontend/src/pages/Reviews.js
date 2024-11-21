import React from "react";
import { useNavigate } from "react-router-dom";
import TableWithPaginationAndSorting from "../components/TableWithPaginationAndSorting/TableWithPaginationAndSorting";

const Reviews = () => {
  const navigate = useNavigate();

  const fetchReviews = async (page, sortType, filter) => {
    const response = await fetch(
      `http://localhost:3030/admin/reviews?page=${page}&sortby=${sortType.key}&order=${sortType.order}&only=${filter.only}&onlyname=${filter.onlyName}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status !== 200) {
      navigate("/dashboard");
      return { items: [], totalPages: 1 };
    }
    const data = await response.json();
    return {
      items: data.response.reviews,
      totalPages: data.response.totalPages,
    };
  };

  const reviewColumns = [
    { header: "Email", accessor: "client.email", sortable: true },
    { header: "Service", accessor: "type", sortable: true },
    { header: "Content", accessor: "content", sortable: true },
    { header: "Rating", accessor: "rate", sortable: true },
  ];

  const selecter = [
    {
      name: "rate",
      options: [
        { value: "", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
      ],
    },
    {
      name: "type",
      options: [
        { label: "All", value: "" },
        { label: "Technical Support", value: "Technical Support" },
        { label: "Billing and Payments", value: "Billing and Payments" },
        { label: "Product Inquiries", value: "Product Inquiries" },
        { label: "Other", value: "Other" },
      ],
    },
  ];

  const reviewActions = [
    {
      label: "Delete",
      onClick: (id) => {
        console.log(`Deleting review ${id}`);
        fetch(`http://localhost:3030/review/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Review deleted successfully", data);
            navigate("/dashboard/reviews");
          })
          .catch((error) => {
            console.error("Error deleting review", error);
          });
      },
      className: "btn btn-danger btn-sm btn-review-delete",
    },
  ];

  return (
    <div className="container">
      <h2>Reviews</h2>
      <TableWithPaginationAndSorting
        columns={reviewColumns}
        fetchData={fetchReviews}
        dataKey="_id"
        actions={reviewActions}
        selecter={selecter}
      />
    </div>
  );
};

export default Reviews;
