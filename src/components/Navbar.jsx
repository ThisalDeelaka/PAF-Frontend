import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center p-4 shadow"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)", // translucent white
        backdropFilter: "blur(10px)", // frosted glass blur
        WebkitBackdropFilter: "blur(10px)", // Safari support
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <h1 className="text-2xl font-bold text-gray-800">BrainBoost</h1>
      <div className="space-x-4">
        <Link
          to="/add"
          className={`px-4 py-2 rounded font-medium transition-colors duration-300 ${
            pathname === "/add"
              ? "text-white"
              : "text-[#FF7350]"
          }`}
          style={{
            backgroundColor: pathname === "/add"
              ? "rgba(255, 115, 80, 0.8)" // orange with opacity for glass feel
              : "rgba(255, 115, 80, 0.15)", // light translucent orange
            backdropFilter: "blur(10px)",
          }}
        >
          Add Course
        </Link>
        <Link
          to="/courses"
          className={`px-4 py-2 rounded font-medium transition-colors duration-300 ${
            pathname === "/courses"
              ? "text-white"
              : "text-[#125875]"
          }`}
          style={{
            backgroundColor: pathname === "/courses"
              ? "rgba(18, 88, 117, 0.8)" 
              : "rgba(18, 88, 117, 0.15)", 
            backdropFilter: "blur(10px)",
          }}
        >
          All Courses
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
