import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddCoursePage from "./pages/AddCoursePage";
import ViewCoursesPage from "./pages/ViewCoursesPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseDetailsPage from "./pages/CourseDetailsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<AddCoursePage />} />
          <Route path="/courses" element={<ViewCoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
