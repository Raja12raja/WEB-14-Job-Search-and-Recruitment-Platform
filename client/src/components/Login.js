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
    <div>
      {isAuthenticated ? (
        <button onClick={() => logout()}>
          Logout
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </div>
  );
}

export default About;

