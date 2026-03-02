import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { WishlistPage } from "./pages/WishlistPage.tsx";
import { CancelPage } from "./pages/CancelPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/wishlist/cancel/:token" element={<CancelPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
