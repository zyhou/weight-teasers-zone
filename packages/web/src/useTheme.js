import { createContext, useContext } from "react";

export const defaultTheme = {
  palette: {
    primary: {
      light: "#81979A",
      main: "#47727B",
      dark: "#3E445B"
    },
    secondary: {
      light: "#F5F0E7",
      main: "#CFA161"
    }
  }
};

const ThemeContext = createContext({});
export let ThemeProvider = ThemeContext.Provider;

const useTheme = () => useContext(ThemeContext);
export default useTheme;
