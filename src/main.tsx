import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ContentPage from "./pages/ContentPage";
import ScrapbookPage from "./pages/ScrapbookPage";
import ScrapbookDuyPage from "./pages/ScrapbookDuyPage";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/content/:feelingId/:type" element={<ContentPage />} />
        <Route path="/special/scrapbook" element={<ScrapbookPage />} />
        <Route path="/special/scrapbook/ducduy" element={<ScrapbookDuyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
