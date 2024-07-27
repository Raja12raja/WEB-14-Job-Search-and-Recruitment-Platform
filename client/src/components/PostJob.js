import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const [Role, setRole] = useState("Web Dev");
  const [CompanyName, setCompanyName] = useState("");
  const [Skills, setSkills] = useState("");
  const [MSalary, setMSalary] = useState("");
  const [mSalary, setmSalary] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Employmenttype, setEmploymenttype] = useState("Full time");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("Bengaluru");
  const [Logo, setLogo] = useState("https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (Logo === "") {
      setLogo("https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");
    }

    const blog = {
      CompanyName,
      Role,
      Skills,
      mSalary,
      MSalary,
      Location,
      Description,
      Deadline,
      Employmenttype,
      email: user.email,
      Logo
    };

    Axios.post("http://localhost:5000/postJob", { blog })
      .then(() => {
        alert("Job posted successfully");
        navigate('/');
      })
      .catch(() => { alert("error posting") });
  };

  if (isLoading) {
    return <div className="text-center "><div class="flex items-center justify-center w-full h-[100vh] text-gray-900 ">

      
    <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 transform scale-50 mb-40">
      <div>
        <h1 class="text-xl md:text-7xl font-bold flex items-center">L
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
            </path>
          </svg> ading . . .
        </h1>
      </div>
    </div>
    
      </div></div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center">Please login first ...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen mx-10 my-10 items-center">
      <div className="text-center">
        <h2 className="text-xl text-green font-bold mb-2">Get started with JobTreX</h2>
        <h1 className="text-5xl font-bold mb-2">Post a job in minutes</h1>
        <p className="text-lg mb-6">Revolutionize your hiring with our Platform.</p>
        <ul className="text-left mb-4">
          <li className="flex items-center mb-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full mr-2">✔️</span>
            <span className="text-lg font-semibold">Get unlimited applications</span>
          </li>
          <li className="flex items-center mb-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full mr-2">✔️</span>
            <span className="text-lg font-semibold"> Higher relevancy</span>
          </li>
          <li className="flex items-center mb-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full mr-2">✔️</span>
            <span className="text-lg font-semibold">Simplified job posting process</span>
          </li>
          <li className="flex items-center mb-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full mr-2">✔️</span>
            <span className="text-lg font-semibold">40% better ROI than market</span>
          </li>
        </ul>
        <button className="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">Post a job now</button>
      </div>
      <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-lg shadow-md mx-5 md:mx-10 my-10 p-5">
        <h1 className="text-2xl font-bold text-center mb-6">Post a Job</h1>
        <form onSubmit={HandleSubmit} className="flex flex-col gap-4 text-center">
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Company Name</label>
            <input
              type="text"
              required
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Job Title</label>
            <select
              required
              value={Role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            >
              <option value="Web Developer">Web Developer</option>
              <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
              <option value="Data Science">Data Science</option>
              <option value="Systems Analyst">Systems Analyst</option>
              <option value="Network Administrator">Network Administrator</option>
              <option value="Cloud Architect">Cloud Architect</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Skills Required</label>
            <input
              type="text"
              required
              value={Skills}
              onChange={(e) => setSkills(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Minimum Salary</label>
            <input
              type="number"
              required
              value={mSalary}
              onChange={(e) => setmSalary(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Maximum Salary</label>
            <input
              type="number"
              required
              value={MSalary}
              onChange={(e) => setMSalary(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Location</label>
            <select
              required
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Employment Type</label>
            <select
              required
              value={Employmenttype}
              onChange={(e) => setEmploymenttype(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            >
              <option value="Full time">Full time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
              <option value="Part time">Part time</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Application Deadline</label>
            <input
              type="date"
              required
              value={Deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Company Logo URL</label>
            <input
              type="url"
              value={Logo}
              onChange={(e) => setLogo(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-semibold text-gray-700">Job Description</label>
            <textarea
              required
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4 mx-auto"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
