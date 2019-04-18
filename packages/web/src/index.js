import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ThemeProvider, defaultTheme } from "./useTheme";

const AppConnected = () => (
  <ThemeProvider value={defaultTheme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<AppConnected />, document.getElementById("root"));
