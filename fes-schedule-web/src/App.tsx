import { Routes, Route, Navigate } from "react-router-dom";
import EventDaysPage from "./pages/EventDaysPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/event-days" element={<EventDaysPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
