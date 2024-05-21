import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

function Banner() {

    const user = useSelector(selectUser);
    return (
      <>
        <div className="w-screen bg-cover bg-center text-white flex justify-center items-center flex-col flex-wrap gap-20 bg-black" style={{height: "70vh" }}>
            <div className="flex justify-center items-center flex-col">
                <div className="text-4xl text-center"><b>Explore, Create, and Elevate with our Diverse Range of Courses. Unleash Your Potential, Today!</b></div>
                <div className="text-xl">Empower Your Learning Journey</div>
            </div>
            {
              user ? (
                <Link to="/courses"><div className="flex text-xl /*bg-blue-100*/ h-16 justify-center items-center border-2 border-white-500 cursor-pointer hover:bg-white hover:text-gray-500 hover:border-gray-500 p-4 transition duration-500 ease-in-out">Explore Courses →</div></Link>
              ):(
                <Link to="/get-started"><div className="flex text-xl /*bg-blue-100*/ h-16 justify-center items-center border-2 border-white-500 cursor-pointer hover:bg-white hover:text-gray-500 hover:border-gray-500 p-4 transition duration-500 ease-in-out">Get Started →</div></Link>
              )
            }
        </div>
      </>
    );
  }
  
  export default Banner;
  