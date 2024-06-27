import React, { useState, useEffect } from 'react';
import Cards from "./Cards";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
import Banner from "../components/Banner";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [allUsers, setAllUsers] = useState([]);
  const [isThere, setIsThere] = useState(false);

  const getUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetUsers");
      setAllUsers(response.data.data2);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // Fetch all users on component mount
    getUsers();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const checkUserExists = () => {
        const userExists = allUsers.some(bkndUser => bkndUser.userEmail === user.email);
        setIsThere(userExists);
        if (!userExists) {
          Axios.post("http://localhost:5000/loginInfo", { userName: user.name, userEmail: user.email })
            .then(() => {
              console.log("userinfo stored");
            })
            .catch(() => {
              console.log("userinfo not stored");
            });
        }
      };
      checkUserExists();
    }
  }, [isAuthenticated, user, allUsers]);

  return (
    <div className="bg-orange-100">
      <Banner />
      <Cards />
    </div>
  );
};

export default Home;
