import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

function Compare() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://coursebay-backend-a1dy.onrender.com/course/get-course-data",{
            method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({})
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelect = (course) => {
    if (selectedCourses.length < 2) {
      setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, course]);
    } else {
      alert("You can only select two courses for comparison.");
    }
  };

  const handleCourseDeselect = (course) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.filter((c) => c._id !== course._id)
    );
  };

  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="compare-container p-4">
        <h1 className="text-3xl font-bold mb-4">Compare Courses</h1>
        <div className="mb-4">
          <input
            type="text"
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            placeholder="Search for courses..."
            className="p-2 border rounded w-full"
          />
        </div>

        <div className="course-list mb-4">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className={`course-item p-2 border mb-2 rounded cursor-pointer ${
                selectedCourses.some((c) => c._id === course._id)
                  ? "bg-green-200"
                  : ""
              }`}
              onClick={() =>
                selectedCourses.some((c) => c._id === course._id)
                  ? handleCourseDeselect(course)
                  : handleCourseSelect(course)
              }
            >
              {course.courseTitle} - ${course.cost}
            </div>
          ))}
        </div>

        {selectedCourses.length === 2 && (
          <div className="comparison-section p-4 border rounded bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Comparison</h2>
            <div className="comparison-grid grid grid-cols-2 gap-4">
              {selectedCourses.map((course) => (
                <div key={course._id} className="comparison-item">
                  <h3 className="text-lg font-bold">{course.courseTitle}</h3>
                  <p><strong>Cost:</strong> ${course.cost}</p>
                  <p><strong>About:</strong> {course.courseAbout}</p>
                  <p><strong>Curriculum:</strong> <a href={course.curriculumLink} className="text-blue-600">View</a></p>
                  <p><strong>Joining Link:</strong> <a href={course.joiningLink} className="text-blue-600">Join</a></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Compare;
