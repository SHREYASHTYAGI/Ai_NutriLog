import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);