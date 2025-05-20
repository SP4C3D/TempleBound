import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./FrontPage";
import TempleBound from "./TempleBound"; // Create this next

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/TempleBound" element={<TempleBound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
