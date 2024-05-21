import React, { useState, useEffect } from 'react';

function DiscussionThread({ course }) {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const userData = JSON.parse(localStorage.getItem('userData'));


    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         const mockReviews = [
    //             { id: 1, content: 'Great course!', rating: 5 },
    //             { id: 2, content: 'Very informative.', rating: 4 },
    //         ];
    //         setReviews(mockReviews);
    //     };

    //     fetchReviews();
    // }, [course]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8000/course/fetchReviews`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                },
                body: JSON.stringify({ courseId: course._id }),
                });
                const data = await response.json();
                console.log(data);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
    
        fetchReviews();
    }, []);


    const handlePostReview = async () => {
        // const newReviewData = { content: newReview, rating };
        // setReviews([...reviews, newReviewData]);
        // setNewReview('');
        // setRating(0);

        if(!userData){
          alert('Please Sign in to continue');  
        }

        const newReviewData = {
            courseId: course._id,
            userId: JSON.parse(localStorage.getItem('userData'))._id, 
            reviewText: newReview,
            rating: rating,
        };

        try{
            const response = await fetch('http://localhost:8000/course/postReview',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                },
                body: JSON.stringify(newReviewData)
            });

            if (response.ok) {
                const savedReview = await response.json();
                setReviews([...reviews, savedReview]);
                setNewReview('');
                setRating(0);
            } else {
                console.error('Error posting review');
            }

        }catch(err){
            console.log(err);
        }
    };

    return (
        <>
        {/* {reviews} */}
            <div className="container mx-auto my-4 px-4">
                <h2 className="text-2xl font-bold mb-4">Discussion Thread for {course.courseTitle}</h2>

                <div className="course-info mb-4 shadow-lg bg-white rounded-lg p-6">
                    <div className="mb-2">
                        <strong>Course Title:</strong> {course.courseTitle}
                    </div>
                    <div className="mb-2">
                        <strong>Instructor:</strong> {course.userId.username}
                    </div>
                    <div className="mb-2">
                        <strong>Course Description:</strong> {course.courseAbout}
                    </div>
                    <div className="mb-2">
                        <strong>Curriculum:</strong>
                        <a href={course.curriculumLink} className="text-blue-600 underline ml-2">
                            View Curriculum
                        </a>
                    </div>
                    <div className="mb-2">
                        <strong>Cost:</strong> ${course.cost}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2">Reviews and Ratings:</h3>
                <div className="reviews-container mb-4 shadow-lg bg-white rounded-lg p-6">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="review-item mb-2 border p-2 rounded">
                                <p>{review.reviewText}</p>
                                <div>Rating: {review.rating} / 5</div>
                                <div>Posted by: {review.userId.username}</div>
                            </div>
                        ))
                    ) : (
                        <div>No reviews yet. Be the first to leave a review!</div>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2">Leave a Review:</h3>
                <div className="new-review-form mb-4">
                    <textarea
                        className="border p-2 w-full mb-2 rounded"
                        placeholder="Write your review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    ></textarea>
                    <div className="rating-section mb-2">
                        <label htmlFor="rating" className="mr-2">Rating:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="border p-2 rounded"
                        >
                            <option value="0" disabled>Select rating</option>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handlePostReview}
                    >
                        Post Review
                    </button>
                </div>
            </div>
        </>
    );
}

export default DiscussionThread;
