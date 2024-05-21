import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useState ,useEffect } from "react";

function Footer() {

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

      if (userData==undefined) {
        localStorage.removeItem('userData');
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem('userData');
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);


    return (
      <footer className="w-full text-white" style={{ backgroundImage: "url('./footer.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} id="footer">
        <div className="w-4/5 m-auto py-12 flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl">123 Main Street<br />Delhi, India<br />Email: txferrox@gmail.com<br />Phone: +91 3334441115</p>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-xl">
                <FaFacebook/>
              </a>
              <a href="#" className="text-xl">
                <FaTwitterSquare/>
              </a>
              <a href="#" className="text-xl">
                <FaInstagramSquare/>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Provide Feedback</h2>
            <form>
              <label className="block mb-2">Your Feedback</label>
              <textarea rows="4" className="w-full text-black px-4 py-2 mb-4 border border-white rounded focus:outline-none focus:border-gray-300"></textarea>
              <button type="submit" className="bg-transparent border-2 text-white px-6 py-2 rounded hover:bg-white hover:text-black">Submit</button>
            </form>
          </div>
        </div>
        <div className="bg-black text-center py-4">
          <p className="text-sm">&copy; 2024 Course Bay. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  