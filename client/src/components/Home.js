import React, { useState, useEffect } from 'react';
import Cards from "./Cards";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
import { FiSearch } from 'react-icons/fi';


const Home = () => {
  
  const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement search functionality here
    };

  const { user, isAuthenticated } = useAuth0();
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
      
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
            <h1 className='text-5xl font-bold text-primary mb-3 text-center'>Find your <span className='text-blue-400'>Jobs</span> here</h1>
            <p className='text-lg text-black/70 mb-8 text-center'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you</p>
            <form className="flex justify-center" onSubmit={handleSubmit}>
                <div className='w-full md:w-1/2 flex items-center'>
                    <div className='relative bg-white rounded-lg shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex-1'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Search for jobs...'
                            className='block w-full py-2 pl-10 pr-12 border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none'
                            value={query}
                            onChange={handleInputChange}
                        />
                        <FiSearch className='absolute inset-y-0 left-0 mt-2.5 ml-3 text-gray-400' />
                    </div>
                    <button type='submit' className='bg-blue-600 py-2 px-8 text-white md:rounded-r-none rounded ml-2'>Search</button>
                </div>
            </form>
        </div>

      <Cards />
      
    </div>
  );
};

export default Home;
