import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='flex flex-col items-center mt-16'>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <button
            className="text-white bg-[#393E46] border border-[#393E46] hover:bg-[#222831] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="text-white bg-[#393E46] border border-[#393E46] hover:bg-[#222831] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => loginWithRedirect()}
            >
              Candidate Login
            </button>
            <button
              className="text-white bg-[#393E46] border border-[#393E46] hover:bg-[#222831] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => loginWithRedirect()}
            >
              Employer Login
            </button>
          </>
        )}
      </div>
      
    </div>
  );
}

export default About;
