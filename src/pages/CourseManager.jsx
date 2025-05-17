import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes, FaBook } from 'react-icons/fa';

// Color palette
const colors = {
  orange: "#FF7350",
  teal: "#125875",
};

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/courses');
      setCourses(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      setSuccess('Course successfully deleted!');
      fetchCourses();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to delete course. Please try again.');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse({ ...course });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/courses/${editingCourse.id}`, editingCourse);
      setEditingCourse(null);
      setSuccess('Course successfully updated!');
      fetchCourses();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to update course. Please try again.');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 mb-6">
          <div 
            style={{ 
              background: `linear-gradient(to right, ${colors.teal}, ${colors.orange})`,
              padding: '1.5rem'
            }} 
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-white">Course Management</h1>
            <p className="text-white text-opacity-80 mt-1">Add, edit, and manage your BrainBoost courses</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                <p className="font-medium flex items-center">
                  <span className="mr-2">✓</span>
                  {success}
                </p>
              </div>
            )}
            
            {editingCourse && (
              <div className="mb-6 border border-gray-200 p-5 rounded-lg shadow-sm bg-gray-50">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <FaEdit className="mr-2" style={{ color: colors.teal }} />
                  Edit Course
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Course Name</label>
                    <input
                      type="text"
                      placeholder="Enter course name"
                      value={editingCourse.name}
                      onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 transition-all"
                      style={{ 
                        boxShadow: `0 0 0 ${editingCourse.name ? '2px' : '0'} ${colors.teal}`,
                        borderColor: editingCourse.name ? colors.teal : 'rgb(209, 213, 219)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                    <textarea
                      placeholder="Enter course description"
                      value={editingCourse.description}
                      onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 transition-all h-32"
                      style={{ 
                        boxShadow: `0 0 0 ${editingCourse.description ? '2px' : '0'} ${colors.teal}`,
                        borderColor: editingCourse.description ? colors.teal : 'rgb(209, 213, 219)'
                      }}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleUpdate} 
                      className="flex items-center py-2 px-4 border rounded-lg shadow-sm text-white hover:opacity-90 transition-all"
                      style={{ 
                        backgroundColor: colors.orange,
                        borderColor: 'transparent',
                      }}
                    >
                      <FaSave className="mr-2" /> Save Changes
                    </button>
                    
                    <button 
                      onClick={() => setEditingCourse(null)} 
                      className="flex items-center py-2 px-4 border rounded-lg shadow-sm hover:bg-gray-100 transition-all text-gray-700"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.teal }}></div>
              </div>
            ) : (
              <div className="grid gap-5">
                {courses.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FaBook className="mx-auto text-4xl mb-3 opacity-30" />
                    <p>No courses available. Create your first course now!</p>
                  </div>
                ) : (
                  courses.map((course) => (
                    <div key={course.id} className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                            title="Edit course"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-red-50 transition-colors text-red-500"
                            title="Delete course"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <button 
            onClick={() => setEditingCourse({ id: null, name: '', description: '' })} 
            className="inline-flex items-center py-2 px-4 border rounded-lg shadow-sm text-white hover:opacity-90 transition-all"
            style={{ 
              backgroundColor: colors.teal,
              borderColor: 'transparent',
            }}
          >
            <FaBook className="mr-2" /> Create New Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseManager;