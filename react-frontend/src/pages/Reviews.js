import React from "react";
import { useNavigate } from "react-router-dom";
import TableWithPaginationAndSorting from "../components/TableWithPaginationAndSorting/TableWithPaginationAndSorting";

const Reviews = () => {
  const navigate = useNavigate();

  const fetchReviews = async (page, sortType) => {
    const response = await fetch(
      `http://localhost:3030/reviews?page=${page}&sortby=${sortType.key}&order=${sortType.order}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status !== 200) navigate("/dashboard");
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

  const reviewActions = [
    {
      label: "Delete",
      onClick: (id) => console.log(`Deleting review ${id}`),
      className: "btn btn-danger btn-sm",
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
      />
    </div>
  );
};

export default Reviews;
