import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseUpload() {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState({
    courseImage: null,
    courseTitle: "",
    courseAbout: "",
    curriculumLink: "",
    cost: "",
    joiningLink: "",
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCourseUpload = async (event) => {
    event.preventDefault();

    try {
      const userId = JSON.parse(localStorage.getItem('userData'))._id;
      const formData = new FormData();
      formData.append("courseImage", courseData.courseImage);
      formData.append("courseTitle", courseData.courseTitle);
      formData.append("courseAbout", courseData.courseAbout);
      formData.append("curriculumLink", courseData.curriculumLink);
      formData.append("cost", courseData.cost);
      formData.append("joiningLink", courseData.joiningLink);
      formData.append("userId", userId);

      const response = await axios.post(
        "https://coursebay-backend-a1dy.onrender.com/course/upload-course",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept" : "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Course uploaded successfully!");
        navigate('/courses');
      } else {
        console.error("Error uploading course:", response.statusText);
        navigate('/courses');
      }
    } catch (error) {
      console.error("Error uploading course:", error);
      navigate('/courses');
    }
  };

  return (
    <>
      <div className="p-8 w-2/4">
        <h1 className="text-3xl font-bold mb-4">Upload a Course</h1>

        <div className="mb-4 mx-6">
          <label htmlFor="courseImage" className="block text-sm font-medium text-gray-700">
            Course Image
          </label>
          <input
            onChange={handleInputChange}
            type="file"
            id="courseImage"
            name="courseImage"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 mx-6">
          <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            onChange={handleInputChange}
            minLength={1}
            type="text"
            id="courseTitle"
            name="courseTitle"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 mx-6">
          <label htmlFor="courseAbout" className="block text-sm font-medium text-gray-700">
            About
          </label>
          <input
            onChange={handleInputChange}
            minLength={8}
            type="text"
            id="courseAbout"
            name="courseAbout"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 mx-6">
          <label htmlFor="curriculumLink" className="block text-sm font-medium text-gray-700">
            Curriculum Link
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="curriculumLink"
            name="curriculumLink"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 mx-6">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
            Cost
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="cost"
            name="cost"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 mx-6">
          <label htmlFor="joiningLink" className="block text-sm font-medium text-gray-700">
            Joining Link
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="joiningLink"
            name="joiningLink"
            className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleCourseUpload}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default CourseUpload;
