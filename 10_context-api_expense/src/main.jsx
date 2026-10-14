import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ExpenseContext from "./context/ExpenseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExpenseContext>
      <App />
    </ExpenseContext>
  </StrictMode>,
);
