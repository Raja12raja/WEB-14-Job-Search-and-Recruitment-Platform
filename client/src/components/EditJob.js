import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
  const { user, isAuthenticated } = useAuth0();
  const { id } = useParams();
  const navigate = useNavigate();

  const [Role, setRole] = useState("Web Developer");
  const [CompanyName, setCompanyName] = useState("");
  const [Skills, setSkills] = useState("");
  const [MSalary, setMSalary] = useState("");
  const [mSalary, setmSalary] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Employmenttype, setEmploymenttype] = useState("Full time");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("Bengaluru");
  const [Logo, setLogo] = useState("https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/GetJobById/${id}`);
        const job = response.data;
        setRole(job.Role);
        setCompanyName(job.CompanyName);
        setSkills(job.Skills);
        setMSalary(job.MSalary);
        setmSalary(job.mSalary);
        setDeadline(job.Deadline);
        setEmploymenttype(job.Employmenttype);
        setDescription(job.Description);
        setLocation(job.Location);
        setLogo(job.Logo);
      } catch (error) {
        console.log("Error fetching job", error);
      }
    };
    fetchJob();
  }, [id]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
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

    try {
      await Axios.put(`http://localhost:5000/EditJob/${id}`, updatedJob);
      alert("Job updated successfully");
      navigate('/Dashboard');
    } catch (error) {
      console.log("Error updating job", error);
      alert("Error updating job, try again later");
    }
  };

  if (!isAuthenticated) {
    return <div>Please login first ...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md mt-10 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Job</h1>
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
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="Data Science">Data Science</option>
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
          className="mt-4 p-3 bg-[#3C5B6F] text-white font-semibold rounded hover:bg-[#393E46] transition duration-200"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
