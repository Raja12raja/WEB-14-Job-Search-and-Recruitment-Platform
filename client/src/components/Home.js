import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import { FiSearch } from "react-icons/fi";
import Sidebar from "./Sidebar";

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
        const userExists = allUsers.some(
          (bkndUser) => bkndUser.userEmail === user.email
        );
        if (!userExists) {
          Axios.post("http://localhost:5000/loginInfo", {
            userName: user.name,
            userEmail: user.email,
          })
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
      <div
        className="relative bg-custom-bg bg-cover bg-center max-w-screen-2xl container mx-auto xl:px-24 px-4 py-14"
        style={{ height: "60vh" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Overlay to decrease transparency */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* <h1 className='text-5xl font-bold text-primary mb-3 text-center'><span className='text-[#41C9E2]'>Find Your</span> <span className='text-[#EEEEEE]'>Jobs</span> <span className='text-[#41C9E2]'>here</span></h1> */}
          <div class="text-5xl font-bold text-primary mb-3 text-center text-[#41C9E2]">
            Find Your{" "}
            <span class="text-white inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
              <ul class="block animate-text-slide-5 text-left leading-tight [&_li]:block">
                <li>Jobs</li>
                <li>Jobs</li>
                <li>Jobs</li>
                <li>Jobs</li>
                <li>Jobs</li>
                <li aria-hidden="true">Jobs</li>
              </ul>
            </span>
            <span class="text-5xl font-bold text-primary mb-3 text-center text-[#41C9E2]"> Here</span>
          </div>
          <p className="text-lg text-[#EEEEEE] mb-8 text-center">
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you
          </p>
          <form className="flex justify-center" onSubmit={handleSubmit}>
            <div className="w-full md:w-1/1 flex items-center">
              <div className="relative bg-white rounded-lg shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Search for jobs..."
                  className="block w-full py-2 pl-10 pr-12 border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                  value={query}
                  onChange={handleInputChange}
                />
                <FiSearch className="absolute inset-y-0 left-0 mt-2.5 ml-3 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-[#393E46] py-2 px-8 text-white md:rounded-r-none rounded ml-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="md:grid grid-cols-5 gap-8 lg:px-10 px-4 py-12">
        <div className="bg-white p-2 rounded shadow-lg shadow-[#393E46]">
          <Sidebar
            onLocationChange={handleLocationChange}
            onRoleChange={handleRoleChange}
            onMinSalaryChange={handleMinSalaryChange}
          />
        </div>
        <div className="bg-white col-span-4 p-2 rounded-sm">
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
