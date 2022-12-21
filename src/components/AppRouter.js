import { Routes, Route, Navigate } from "react-router-dom";
import DocumentPage from "../pages/DocumentPage";
import Home from "../pages/Home";

export default function AppRouter() {
  return <Routes>
    <Route path="pdf" element={< DocumentPage />} />
    <Route path="home" element={< Home />} />
    <Route path="*" element={<Navigate to="/home" />} />
  </Routes>
}