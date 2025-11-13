import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContentPage from "./pages/ContentPage";
import SpecialDayPage from "./pages/SpecialDayPage"; // 🔥 thêm dòng này
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/special/:slug" element={<SpecialDayPage />} />{" "}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
