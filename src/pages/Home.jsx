import React, { useState } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

const Home = () => {
  const [editCourse, setEditCourse] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      home page
    </div>
  );
};

export default Home;
