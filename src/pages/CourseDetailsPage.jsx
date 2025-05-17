import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourse,
  enrollCourse,
  updateProgress,
  addNote,
  toggleNoteCompletion,
} from "../services/courseService";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [noteText, setNoteText] = useState("");

  const fetchCourse = async () => {
    console.log("Fetching course with ID:", id);
    const res = await getCourse(id);
    setCourse(res.data);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleEnroll = async () => {
    await enrollCourse(id);
    fetchCourse();
  };

  const handleProgressUpdate = async () => {
    const progress = prompt("Enter new progress (0-100):");
    if (progress) {
      await updateProgress(id, progress);
      fetchCourse();
    }
  };

  const handleAddNote = async () => {
    if (noteText.trim()) {
      await addNote(id, { text: noteText, done: false });
      setNoteText("");
      fetchCourse();
    }
  };

  const handleToggleNote = async (index) => {
    await toggleNoteCompletion(id, index);
    fetchCourse();
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
      <p>{course.description}</p>

      <div className="mt-4 space-x-2">
        {!course.enrolled && (
          <button onClick={handleEnroll} className="bg-blue-500 text-white px-4 py-2 rounded">
            Enroll
          </button>
        )}
        <button onClick={handleProgressUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
          Update Progress
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-1 font-semibold">Progress:</p>
        <div className="w-full bg-gray-300 rounded h-6">
          <div
            className="bg-green-600 h-6 rounded text-white text-sm text-center"
            style={{ width: `${course.progress}%` }}
          >
            {course.progress}%
          </div>
        </div>
        {course.completed && <p className="text-green-700 mt-2">🎉 Achievement Unlocked: Course Completed!</p>}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Daily Tracking Notes</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Add a note..."
          />
          <button onClick={handleAddNote} className="bg-blue-600 text-white px-4 rounded-r">
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {course.notes.map((note, index) => (
            <li
              key={index}
              className={`p-2 border rounded flex justify-between items-center ${
                note.done ? "bg-green-100 line-through" : "bg-white"
              }`}
            >
              {note.text}
              <button onClick={() => handleToggleNote(index)} className="text-sm px-2 py-1 bg-gray-200 rounded">
                {note.done ? "✔ Done" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
