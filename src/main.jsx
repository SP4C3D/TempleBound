import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import TempleBound from "./TempleBound"; // Create this next

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/TempleBound" element={<TempleBound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
