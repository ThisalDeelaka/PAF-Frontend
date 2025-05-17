import React from "react";
import CourseList from "../components/CourseList";

const ViewCoursesPage = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <CourseList onEdit={() => {}} />
    </div>
  );
};

export default ViewCoursesPage;
