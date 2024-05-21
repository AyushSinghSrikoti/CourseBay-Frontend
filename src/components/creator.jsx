import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Creator() {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [code , setCode] = useState("");
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const generateRandomCode = () => {
        const min = 1000000;
        const max = 9999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
    
          if (userData.username) {
            setIsLoggedIn(true);
          }else{
            setIsLoggedIn(false);
          }
        } catch (err) {
          console.error(err);
        }
      }
    
      useEffect(() => {
        fetchUserData();
      }, []);

    const sendCodeToBackend = () => {
        const newCode = generateRandomCode();
        setCode(newCode);
        fetch("https://coursebay-backend-a1dy.onrender.com/users/creator", {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                code: newCode,
                email: JSON.parse(localStorage.getItem('userData')).email,
            }),
        })
        .then(response => {
            if (response.ok) {
                console.log("response okay")
                return response.json(); 

            } else {
                console.error("Failed to send verification code to backend.");
                return Promise.reject('Failed to send verification code');
            }
        })
        .then(data => {
            // Handle successful response
            console.log("Verification code sent to backend successfully:", data);
            setIsCodeSent(true);
        })
        .catch(error => {
            console.error("Network error:", error);
        });
    };

    const handleVerification = () => {
        if (inputValue === code.toString()) {
            alert("Code verified successfully")
            fetch("https://coursebay-backend-a1dy.onrender.com/users/makeCreator" , {
                method:"POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',

                }
            })
            .then(response => {
                    localStorage.removeItem('userData');
                    navigate('/');
                    signOut();
                    window.location.reload()
            })
            .catch((err)=>{
                console.log("error in making creator api" , err);
            })
        } else {
            alert("Invalid verification code");
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
    
          if (response.status === 200) {
            localStorage.removeItem('userData');
            dispatch(clearUser());
            navigate('/');
          }
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <>
            <Navbar />

            {isLoggedIn ? <div className="flex justify-center items-center h-80">
                <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
                    {!isCodeSent ? (
                        <>
                            <p className="text-xl mb-8">
                                Ready to join with Course Bay? Sign up now to become a creator and join us!
                            </p>
                            <button
                                onClick={sendCodeToBackend}
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                Send me a code
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-xl mb-8">
                                We have sent a verification code to your email. Please enter the code below:
                            </p>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter OTP"
                                className="border border-gray-400 rounded px-4 py-2 my-4 w-full"
                            />
                            <button
                                onClick={handleVerification}
                                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                            >
                                Verify
                            </button>
                        </>
                    )}
                </div>
            </div>: <div className="flex justify-center items-center bg-gray-100" style={{height: '75vh'}}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl mb-4">Please sign in first to continue</p>
                        <button
                            onClick={() => navigate('/get-started')}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        >
                            Sign In
                        </button>
                    </div>
                </div>}
            
            <Footer />
        </>
    );
}

export default Creator;
