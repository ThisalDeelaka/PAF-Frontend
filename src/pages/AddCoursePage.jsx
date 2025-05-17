import React from "react";
import CourseForm from "../components/CourseForm";

const AddCoursePage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <CourseForm fetchCourses={() => {}} clearEdit={() => {}} />
    </div>
  );
};

export default AddCoursePage;
