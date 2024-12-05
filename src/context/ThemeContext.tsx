import React, { createContext, useContext, useMemo } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  oppositeTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  oppositeTheme: "dark",
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
  oppositeTheme: Theme;
}> = ({ children, theme, toggleTheme, oppositeTheme }) => {
  const value = useMemo(
    () => ({ theme, toggleTheme, oppositeTheme }),
    [theme, toggleTheme, oppositeTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export default ThemeContext;
