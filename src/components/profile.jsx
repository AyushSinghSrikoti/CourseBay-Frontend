import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import  CourseUpload from "./courseUpload";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [userCourses, setUserCourses] = useState([]);
  const [userStatus , setUserStatus] = useState(false);

  // console.log(userData);
  
  const [newAvatar, setNewAvatar] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [creator , setCreator] = useState();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  const handleNameChange = (event) => {
    const username = event.target.value;
    setNewUsername(username);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://coursebay-backend-a1dy.onrender.com/users/username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include'
      });
      const userData = await response.json();
      console.log(userData);

      if(userData){
        setUserStatus(true);
      }else{
        setUserStatus(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleSaveChanges = async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("avatar", newAvatar);
      formData.append("username", newUsername);

      const response = await axios.post('https://coursebay-backend-a1dy.onrender.com/users/update-profile', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('userData');
        await signOut();
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch('https://coursebay-backend-a1dy.onrender.com/users/sign-out', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      localStorage.removeItem('userData');
      
      if (response.status === 200) {
        localStorage.removeItem('userData');
        dispatch(clearUser());
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   const fetchUserData = async() => {
  //     const response = await fetch('http://localhost:8000/users/username', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //             'Access-Control-Allow-Origin': 'http://localhost:5173',
  //           },
  //           credentials: 'include',
  //     });

  //     const userData = await response.json();

  //     if(userData){
  //       setCreator(userData.creator);
  //     }
  //   }

  //   fetchUserData();
  // },[])


  useEffect(()=>{
    const fetchUploadedCourses = async () =>{
      try{
        const response = await fetch('https://coursebay-backend-a1dy.onrender.com/users/fetchUploadedCourses',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ userId: userData._id }),
        });

        const responseData = await response.json();
        // console.log(responseData);
        setUserCourses(responseData);
      }catch(err){
        console.log(err);
      }
    }

    fetchUploadedCourses();
  },[])

  return (
    <>
      {userStatus ? <><Navbar />
      <hr/>
      <div className="flex">
        <div className=" p-8 /*bg-green-300*/ w-2/4">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>

          <div className="flex items-center mb-4 mx-6">
          <div className="h-16 w-16 border-2 rounded-full" style={{backgroundImage: `url(${userData.avatar ? `./images/${userData.avatar}` : './defaultAvatar.jpg'})` , backgroundRepeat: "no-repeat", backgroundSize: "cover" , backgroundPosition: "center"}}></div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{userData.username}</h2>
              <p className="text-gray-500">Change your avatar and username below:</p>
            </div>
          </div>

          <div className="mb-4 mx-6">
            <label htmlFor="newAvatar" className="block text-sm font-medium text-gray-700">Change Avatar</label>
            <input type="file" id="newAvatar" onChange={(event)=>handleAvatarChange(event)} className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
          </div>

          <div className="mb-4 mx-6">
            <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">Change Username</label>
            <input minLength={1} type="text" id="newUsername" onChange={(event)=>handleNameChange(event)} defaultValue={userData.username} className="mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
          </div>

          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={(event)=>handleSaveChanges(event)}>Save Changes</button>
            <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
          </div>
        </div>
        <div className="flex flex-col w-2/4">
          {userData.creator && (
            <>
              <h1 className="text-3xl font-bold mb-4">Uploaded Courses</h1>
              <div>
                {userCourses.map(course => (
                  <div key={course._id} className="p-4 border rounded mb-4">
                    <h2 className="text-xl font-bold">{course.courseTitle}</h2>
                    <p className="text-gray-600">{course.courseAbout}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div> 
      <div>
      {userData.creator ? 
        <CourseUpload/> : 
          <h1></h1>}  
      </div>
      <Footer /></>: <div>unauthorised route access</div>}
      
    </>
  );
}

export default Profile;