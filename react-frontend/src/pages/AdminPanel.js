import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CirclePourcent from "../components/Pourcentage/CirclePourcent";

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3030/admin/stats", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.response) {
          if (data.status !== 200) {
            navigate("/login");
            return;
          }
          setStats(data.response);
        }
      })
      .catch((error) => {
        navigate("/login");
        console.error("Erreur de récupération des données", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Admin Panel</h1>
      <div className="content-admin">
        <div className="block">
          <div className="header">
            <h2>Users</h2>
          </div>
          <div className="body">
            <h3>
              total users:{" "}
              {stats && stats.usersStats && stats.usersStats[0]
                ? stats.usersStats[0].totalUsers
                : 0}
            </h3>
          </div>
          <div className="footer">
            {stats &&
              stats.usersStats &&
              stats.usersStats[0] &&
              stats.usersStats[0].statisticsByRole.map((role, index) => (
                <div className="role" key={index}>
                  <p>{role.role}</p>
                  <p>{role.count}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="block">
          <div className="header">
            <h2>Reviews</h2>
          </div>
          <div className="body">
            <CirclePourcent
              size={120}
              strokeWidth={10}
              maxPercentage={
                stats && stats.reviewsStats && stats.reviewsStats[0]
                  ? (100 / 5) * stats.reviewsStats[0].globalAvgRate.toFixed(1)
                  : 0
              }
              text={
                stats && stats.reviewsStats[0]
                  ? stats.reviewsStats[0].globalAvgRate.toFixed(1) + "/5"
                  : 0 + "/5"
              }
            />
            <h4>
              total reviews:{" "}
              {stats && stats.reviewsStats[0]
                ? stats.reviewsStats[0].totalReviews
                : 0}
            </h4>
          </div>
          <div className="footer">
            {stats &&
              stats.reviewsStats &&
              stats.reviewsStats[0] &&
              stats.reviewsStats[0].statisticsByType.map((review, index) => (
                <div className="type" key={index}>
                  <p>{review.type}</p>
                  <p>{review.count}</p>
                  <p>{review.avgRate.toFixed(1)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
