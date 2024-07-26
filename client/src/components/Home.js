import React, { useState, useEffect } from 'react';
import Cards from "./Cards";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [minSalary, setMinSalary] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleMinSalaryChange = (salary) => {
    setMinSalary(salary);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetUsers");
      setAllUsers(response.data.data2);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const checkUserExists = () => {
        const userExists = allUsers.some(bkndUser => bkndUser.userEmail === user.email);
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
    <div className="bg-[#EEEEEE]">
      
      <div className=' bg-img  max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
        <h1 className='text-5xl font-bold text-primary mb-3 text-center'>Find your <span className='text-[#088395]'>Jobs</span> here</h1>
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
            <button type='submit' className='bg-[#393E46] py-2 px-8 text-white md:rounded-r-none rounded ml-2'>Search</button>
          </div>
        </form>
      </div>
      <div className='md:grid grid-cols-5 gap-8 lg:px-10 px-4 py-12'>
        <div className='bg-white p-2 rounded shadow-lg shadow-[#393E46]'>
          <Sidebar 
            onLocationChange={handleLocationChange} 
            onRoleChange={handleRoleChange}
            onMinSalaryChange={handleMinSalaryChange}
          />
        </div>
        <div className='bg-white col-span-4 p-2 rounded-sm'>
          <Cards 
            query={query} 
            selectedLocation={selectedLocation} 
            selectedRole={selectedRole} 
            minSalary={minSalary}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
