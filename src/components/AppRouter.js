import { Routes, Route, Navigate } from "react-router-dom";
import DocumentPage from "../pages/DocumentPage";
import Home from "../pages/Home";
import Learning from "../pages/Learning"
import Events from "../pages/Events"
import Contacts from "../pages/Contacts"

export default function AppRouter() {
  return <Routes>
    <Route path="pdf" element={< DocumentPage />} />
    <Route path="home" element={< Home />} />
    <Route path="learning" element={<Learning />} />
    <Route path="events" element={<Events />} />
    <Route path="contacts" element={<Contacts />} />
    <Route path="*" element={<Navigate to="/home" />} />
  </Routes>
}