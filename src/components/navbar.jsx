import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, selectUser, setUser } from '../redux/slices/userSlice';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const [avatarUrl , setAvatarUrl] = useState();
  const [apiCalled, setApiCalled] = useState(false);

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const [avatar, setAvatar] = useState(false);
  const [creator , setCreator] = useState();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');

        if (!apiCalled && storedUserData) {
          const userData = JSON.parse(storedUserData);

          dispatch(setUser({ 
            name: userData.username 
          }));

          if (userData.avatar) {
            setAvatarUrl(userData.avatar);
            setAvatar(true);
          }
          setApiCalled(true);
        } else if (!apiCalled) {
          const response = await fetch('http://localhost:8000/users/username', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:5173',
            },
            credentials: 'include',
          });
          console.log(response);
          const userData = await response.json();

          if (userData.username) {
            dispatch(setUser({ 
              name: userData.username 
            }));

            if (userData.avatar) {
              setAvatarUrl(userData.avatar);
              setAvatar(true);
              setCreator(userData.creator);
            }

            localStorage.setItem('userData', JSON.stringify(userData));
          }
          setApiCalled(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [dispatch, apiCalled]);


  // useEffect(()=>{
  //   const fetchUserDataCreator = async() => {
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

  //   fetchUserDataCreator();
  // },[])

  return (
    <div className="h-32 m-auto flex flex-wrap justify-around items-center sticky top-0 bg-white">
      {/* {avatarUrl} */}
      <RouterLink to="/">
        <div className="flex flex-col justify-center items-center" onClick={scrollToTop}>
          <div className="text-3xl text-black cursor-pointer">
            <b>Course Bay</b>
          </div>
          <div className="cursor-pointer">
            <i>simple learning.</i>
          </div>
        </div>
      </RouterLink>
      <div className="flex gap-6">
        {location.pathname === '/' ? (
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:border-b-2 hover:border-gray-500"
          >
            About
          </ScrollLink>
        ) : (
          <RouterLink to="/compare" className="cursor-pointer hover:border-b-2 hover:border-gray-500">
            Compare
          </RouterLink>
        )}
        <RouterLink to="/courses" className="cursor-pointer hover:border-b-2 hover:border-gray-500" onClick={scrollToTop}>Courses</RouterLink>
        <ScrollLink
          to="footer"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:border-b-2 hover:border-gray-500"
        >
          Contacts
        </ScrollLink>
      </div>

      {user ? (
  userData.creator ? (
    <RouterLink to="/profile">
      <div onClick={scrollToTop} className="flex text-xl h-16 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-4 transition duration-500 ease-in-out">
        Upload a Course
      </div>
    </RouterLink>
  ) : (
    <RouterLink to="/become-a-creator">
      <div onClick={scrollToTop} className="flex text-xl h-16 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-4 transition duration-500 ease-in-out">
        Become a Creator
      </div>
    </RouterLink>
  )
) : (
  <RouterLink to="/become-a-creator">
    <div onClick={scrollToTop} className="flex text-xl h-16 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-4 transition duration-500 ease-in-out">
      Become a Creator
    </div>
  </RouterLink>
)} 

{/* <RouterLink to="/become-a-creator">
        <div onClick={scrollToTop} className="flex text-xl h-16 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-4 transition duration-500 ease-in-out">
          Become a Creator
        </div>
        </RouterLink> */}

      {user ? (
        <RouterLink to="/profile">
          <div>
            <div className="flex gap-2 items-center justify-center hover:border-gray-500 hover:border-b-2" >
            {avatar ? (
                <div className="h-16 w-16 border-2 rounded-full" style={{ backgroundImage: `url(./images/${avatarUrl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              ) : (
                <div className="h-16 w-16 border-2 rounded-full" style={{ backgroundImage: "url(./defaultAvatar.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              )}
              <div className="text-3xl uppercase"><b><i>{user.name.split(' ')[0]}</i></b></div>
            </div>
          </div>
        </RouterLink>
      ) : <RouterLink to="/get-started">
      <div onClick={scrollToTop} className="flex text-xl h-16 justify-center items-center border-2 border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white p-4 transition duration-500 ease-in-out">
        Sign In / Sign Up
      </div>
    </RouterLink>}
    </div>
  );
}

export default Navbar;
