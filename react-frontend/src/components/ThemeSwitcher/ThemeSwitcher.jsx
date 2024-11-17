import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{ background: "transparent", border: "none" }}
    >
      {isDarkMode ? (
        <MoonIcon size={24} className="icon" />
      ) : (
        <SunIcon size={24} className="icon" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
