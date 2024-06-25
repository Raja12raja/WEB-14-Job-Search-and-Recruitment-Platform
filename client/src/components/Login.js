import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  const { user, loginWithPopup, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");



  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='flex justify-center flex-col  items-center mt-16'>
      {isAuthenticated ? (
        <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
         onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
         onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </div>
  );
}

export default About;

