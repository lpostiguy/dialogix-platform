import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client";

console.log("Main entry point loaded");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
