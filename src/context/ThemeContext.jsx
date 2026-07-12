import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) ?? true;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "purple";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const colors = {
    purple: {
      primary: "from-indigo-700 via-purple-700 to-pink-600",
      button: "from-indigo-600 to-purple-600",
    },

    blue: {
      primary: "from-blue-700 via-cyan-700 to-sky-600",
      button: "from-blue-600 to-cyan-600",
    },

    green: {
      primary: "from-green-700 via-emerald-700 to-lime-600",
      button: "from-green-600 to-emerald-600",
    },

    orange: {
      primary: "from-orange-700 via-amber-700 to-yellow-600",
      button: "from-orange-600 to-yellow-600",
    },

    red: {
      primary: "from-red-700 via-rose-700 to-pink-600",
      button: "from-red-600 to-rose-600",
    },
  };

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        theme,
        setTheme,
        colors,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {
  return useContext(ThemeContext);
}