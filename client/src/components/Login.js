import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  const {
    user,
    loginWithPopup,
    loginWithRedirect,
    isAuthenticated,
    logout,
    isLoading,
  } = useAuth0();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

const determineUserRole = (user1) => {
     
      const userRole = user1; // if user is employee or candidate
      localStorage.setItem('userRole', userRole); // Store user role in local storage
    
}

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex justify-center space-x-4">
        {!isAuthenticated ? (
          <div
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
            style={{
              width: "250px",
              height: "250px",
              margin: "0 auto",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Employer Login</h2>
            <p className="mb-4">Wanna post job?</p>
            <button
              className="text-black-700 hover:text-white border border-black-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
              onClick={() => {loginWithRedirect();
                determineUserRole('employer');
              }}
            >
              Login as Employer
            </button>
          </div>
        ) : (
          <></>
        )}

        {!isAuthenticated ? (
          <div
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg "
            style={{
              width: "250px",
              height: "250px",
              margin: "0 auto",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            }}
          >
            <h2 className="text-xl font-bold mb-4 ">Candidate Login</h2>
            <p className="mb-4">Searching for job?</p>
            <button
              className="text-black-700 hover:text-white border border-black-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
              onClick={() => {loginWithRedirect();
                determineUserRole('candidate');
              }}
            >
              Login as Candidate
            </button>
          </div>
        ) : (
          <></>
        )}

        {isAuthenticated ? (
          <div
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
            style={{
              width: "250px",
              height: "250px",
              margin: "0 auto",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Wanna Logout ?🥲</h2>

            <button
              className="text-black-700 hover:text-white border border-black-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default About;



