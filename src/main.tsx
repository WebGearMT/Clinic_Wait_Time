import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TicketProvider } from "./context/TicketContext";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketProvider>
        <App />
      </TicketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
