import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Course Manager</h1>
      <div className="space-x-4">
        <Link
          to="/add"
          className={`px-4 py-2 rounded ${
            pathname === "/add" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          Add Course
        </Link>
        <Link
          to="/courses"
          className={`px-4 py-2 rounded ${
            pathname === "/courses" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"
          }`}
        >
          All Courses
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
