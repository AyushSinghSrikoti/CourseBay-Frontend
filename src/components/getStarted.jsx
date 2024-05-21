import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { FaGoogle } from "react-icons/fa6";
import axios from 'axios';

function GetStarted() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate=useNavigate();

  const handleGoogleClick = () => {
    const googleLoginForm = document.getElementById('googleLoginForm');
    if (googleLoginForm) {
      googleLoginForm.submit();
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <p className="text-xl mb-8">
          Ready to explore and learn with Course Bay? Sign up now to get access to our amazing courses or become a creator!
        </p>
        <div className="flex justify-center items-center mb-4">
          <div onClick={handleGoogleClick} className="bg-red-500 w-auto text-white p-2 rounded-md hover:bg-red-600 mr-2 flex items-center gap-2 cursor-pointer">
            Sign Up with Google <FaGoogle />
          </div>
        </div>
        <p className="mt-2 text-sm text-center">
          Want to explore without an account? <Link to="/courses" className="text-blue-500">Explore as a guest</Link>.
        </p>
      </div>
      <form action="https://coursebay-backend-a1dy.onrender.com/users/auth/google" method="post" className="hidden" id="googleLoginForm" target="_self">
      <input type="submit" value="Sign Up with Google" />
      </form>

      <Footer />
    </>
  );
}

export default GetStarted;
