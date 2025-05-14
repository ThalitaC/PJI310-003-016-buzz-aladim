import React, { createContext, useState, useContext } from "react";

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(100); // 100%

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize((prev) => prev + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize((prev) => prev - 10);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
