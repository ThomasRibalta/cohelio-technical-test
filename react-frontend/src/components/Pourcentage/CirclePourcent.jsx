import React, { useState, useEffect } from "react";

const CirclePourcent = ({
  size = 120,
  strokeWidth = 10,
  maxPercentage = 70,
  text = "Loading...",
}) => {
  const [percentage, setPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < maxPercentage) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [maxPercentage]);

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#00bcd4"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.35s" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="20"
        fill="#333"
      >
        {`${text}`}
      </text>
    </svg>
  );
};

export default CirclePourcent;
