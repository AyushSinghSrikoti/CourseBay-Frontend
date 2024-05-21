import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Sorter from './sorter';
import DiscussionThread from './discussionThread';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({ topic: '', cost: '' });
    const [showDiscussionThread, setShowDiscussionThread] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://coursebay-backend-a1dy.onrender.com/course/get-course-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setCourses(responseData);
                setFilteredCourses(responseData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const handleApplyFilter = (criteria) => {
        setFilterCriteria(criteria);
        const filtered = courses.filter((course) => {
            const matchesTopic = course.courseTitle.toLowerCase().includes(criteria.topic.toLowerCase());
            const matchesCost = criteria.cost === '' || course.cost <= parseFloat(criteria.cost);
            return matchesTopic && matchesCost;
        });
        setFilteredCourses(filtered);
    };

    const handleViewDiscussionThread = (course) => {
        setSelectedCourse(course);
        setShowDiscussionThread(true);
    };

    const handleBackToCourses = () => {
        setShowDiscussionThread(false);
        setSelectedCourse(null);
    };

    return (
        <>
            <Navbar />
            <hr />
            <h1 className="text-3xl font-bold mb-4 mx-4">Courses</h1>
            <div className="flex flex-col-reverse md:flex-row gap-4 m-4 w-auto">
                <Sorter onApplyFilter={handleApplyFilter} />
                <div className="m-auto h-full w-4/5 flex flex-col gap-12">
                    {showDiscussionThread && selectedCourse ? (
                        <div>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 focus:outline-none mb-4"
                                onClick={handleBackToCourses}
                            >
                                Back to Courses
                            </button>
                            <DiscussionThread course={selectedCourse} />
                        </div>
                    ) : (
                        filteredCourses.map((course) => (
                            <div key={course._id} className="bg-gray-100 mb-4 p-4">
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    <div
                                        className="h-16 w-16 /*bg-yellow-200*/ border-2 rounded-full inline-block"
                                        style={{
                                            backgroundImage: `url(./images/${course.userId.avatar})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div>{course.courseTitle} by {course.userId.username}</div>
                                </div>
                                <hr />
                                <div className="flex">
                                    <div
                                        className="h-96 w-3/6 /*bg-orange-500*/"
                                        style={{
                                            backgroundImage: `url(./course/${course.courseImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="w-3/6 flex flex-col gap-6 p-4 h-96 overflow-y-scroll">
                                        <div className="flex flex-col">
                                            <div className="text-xl font-bold mb-2">About</div>
                                            <div>{course.courseAbout}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-xl font-bold mb-2">Curriculum</div>
                                            <div>
                                                View the curriculum from the following link:{" "}
                                                <a className="text-blue-600" href={course.curriculumLink}>
                                                    Curriculum Link
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-xl font-bold mb-2">Cost</div>
                                            <div>{`$${course.cost}`}</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-xl font-bold mb-2">Enroll buttons</div>
                                            <div className="flex gap-4">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none"
                                                    onClick={() => window.open(course.joiningLink, '_blank')}
                                                >
                                                    Enroll
                                                </button>
                                                <button
                                                    className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 focus:outline-none"
                                                    onClick={() => handleViewDiscussionThread(course)}
                                                >
                                                    View Discussion Thread
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Courses;
