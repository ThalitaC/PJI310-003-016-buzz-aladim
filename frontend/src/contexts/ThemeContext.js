import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const lightTheme = {
  background: "#f8f9fa",
  text: "#212529",
  primary: "#0D6EFD",
  primaryHover: "#0b5ed7",
  buttonText: "#ffffff",
  inputBackground: "#ffffff"
};

const darkTheme = {
  background: "#121212",
  text: "#f1f1f1",
  primary: "#0D6EFD",
  primaryHover: "#0b5ed7",
  buttonText: "#ffffff",
  inputBackground: "#1f1f1f"
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

