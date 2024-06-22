import React from "react";

export const ThemeContext = React.createContext(null);

const ThemeContextProvivder: React.FC<{ childeren: React.ReactNode }> = ({
  childeren,
}) => {
  return (
    <ThemeContext.Provider value={null}>{childeren}</ThemeContext.Provider>
  );
};

export default ThemeContextProvivder;
