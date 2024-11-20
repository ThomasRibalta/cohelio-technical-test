import React, { useState, useEffect } from "react";
import "./TableWithPaginationAndSorting.css";

const TableWithPaginationAndSorting = ({
  columns,
  fetchData,
  dataKey,
  actions,
}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortType, setSortType] = useState({ key: "createdAt", order: "asc" });

  useEffect(() => {
    fetchData(currentPage, sortType).then(({ items, totalPages }) => {
      setData(items);
      setTotalPages(totalPages);
    });
  }, [fetchData, currentPage, sortType]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (key) => {
    if (sortType.key === key) {
      setSortType({
        key,
        order: sortType.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortType({ key, order: "asc" });
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (key) => {
    if (sortType.key !== key) return null;
    return sortType.order === "asc" ? (
      <span style={{ marginLeft: "5px" }}>▲</span>
    ) : (
      <span style={{ marginLeft: "5px" }}>▼</span>
    );
  };

  const getNestedValue = (obj, accessor) => {
    return accessor.split(".").reduce((acc, key) => acc[key], obj);
  };

  const renderStars = (rate) => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, index) => (
      <span key={index} style={{ color: index < rate ? "#FFD700" : "#CCC" }}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns &&
              columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={col.sortable ? () => handleSort(col.accessor) : null}
                  style={col.sortable ? { cursor: "pointer" } : null}
                >
                  {col.header} {col.sortable && renderSortIcon(col.accessor)}
                </th>
              ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item[dataKey]}>
                {columns &&
                  columns.map((col) => (
                    <td key={col.accessor}>
                      {col.accessor === "rate"
                        ? renderStars(getNestedValue(item, col.accessor))
                        : getNestedValue(item, col.accessor)}
                    </td>
                  ))}
                {actions && (
                  <td>
                    <div className="actions">
                      {actions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => action.onClick(item[dataKey])}
                          className={action.className}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-secondary"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithPaginationAndSorting;
