import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DailyUpdates from "./pages/DailyUpdates";
import Business from "./pages/Business";
import Issues from "./pages/Issues";
import Notification from "./pages/Notification";
import Alert from "./pages/Alert";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Home Page */}
        <Route path="/daily-updates" element={<DailyUpdates />} />
        <Route path="/business" element={<Business />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
