import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user, isAuthenticated } = useAuth0(); 
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
  const micro = "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if(Logo===" "){
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

  if (!isAuthenticated) {
    return <div>Please login first ...</div>;
  }
 
  
  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-10 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job</h1>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Company Name</label>
          <input
            type="text"
            required
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Job Title</label>
          <select
            required
            value={Role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Web Developer">Web Developer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="DataScience">Data Science</option>
            <option value="Systems Analyst">Systems Analyst</option>
            <option value="Network Administrator">Network Administrator</option>
            <option value="Cloud Architect">Cloud Architect</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Employment Type</label>
          <select
            required
            value={Employmenttype}
            onChange={(e) => setEmploymenttype(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Required Skills</label>
          <input
            type="text"
            required
            value={Skills}
            onChange={(e) => setSkills(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Minimum Salary (In $)</label>
          <input
            type="number"
            required
            value={mSalary}
            onChange={(e) => setmSalary(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Maximum Salary (In $)</label>
          <input
            type="number"
            required
            value={MSalary}
            onChange={(e) => setMSalary(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Job Location</label>
          <select
            required
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Indore">Indore</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Deadline</label>
          <input
            type="date"
            required
            value={Deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">URL of Company Logo</label>
          <input
            type="text"
            value={Logo}
            onChange={(e) => setLogo(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Job Description</label>
          <textarea
            required
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default Create;
