import React, { createContext, useContext } from "react";

export const defaultTheme = {
  palette: {
    primary: {
      main: "#47727B",
      dark: "#3E445B",
      light: "#81979A"
    },
    secondary: {
      light: "#F5F0E7",
      main: "#CFA161"
    }
  }
};

const ThemeContext = createContext({});
export const ThemeProvider = ThemeContext.Provider;

export const withTheme = Component => ({ ...props }) => (
  <ThemeContext.Consumer>
    {value => <Component theme={value} {...props} />}
  </ThemeContext.Consumer>
);

const useTheme = () => useContext(ThemeContext);
export default useTheme;
