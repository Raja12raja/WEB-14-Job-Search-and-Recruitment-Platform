import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import './About.css';

const Create = () => {
  const { user, isAuthenticated } = useAuth0(); // Move the hook to the top level

  const [Role, setRole] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Skills, setSkills] = useState("");
  const [MSalary, setMSalary] = useState("");
  const [mSalary, setmSalary] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Employmenttype, setEmploymenttype] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [email, setEmail] = useState("not loggedin");

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated && user) {
      setEmail(user.email);
    }

    const jobPost = {
      CompanyName,
      Role,
      Skills,
      mSalary,
      MSalary,
      Location,
      Description,
      Deadline,
      Employmenttype,
      email
    };

    console.log(jobPost);

    // Make a POST request to the backend
    try {
      const response = await Axios.post('http://localhost:3001/postJob', jobPost);
      alert('Job Posted Successfully');
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error, try later');
    }
  };

  return (
    <div className="create"> {/* Use className instead of class */}
      <h2>Posting Jobs</h2>
      <form onSubmit={HandleSubmit}>
        <label>Job Title</label>
        <input
          type="text"
          required
          value={Role}
          onChange={(e) => setRole(e.target.value)}
        />
        <label>Company Name</label>
        <input
          type="text"
          required
          value={CompanyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Employment-Type</label>
        <select
          required
          onChange={(e) => setEmploymenttype(e.target.value)}
        >
          <option value="Web Dev">Web Dev</option>
          <option value="App Dev">App Dev</option>
          <option value="CyberSec">CyberSec</option>
          <option value="DataScience">Data Science</option>
          <option value="HR">HR</option>
        </select>
        <label>Required Skills</label>
        <input
          type="text"
          required
          value={Skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <label>Minimum-Salary (In $)</label>
        <input
          type="number"
          required
          value={mSalary}
          onChange={(e) => setmSalary(e.target.value)}
        />
        <label>Maximum-Salary (In $)</label>
        <input
          type="number"
          required
          value={MSalary}
          onChange={(e) => setMSalary(e.target.value)}
        />
        <label>Job-Location</label>
        <select
          required
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="Banglore">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Delhi">Delhi</option>
          <option value="Indore">Indore</option>
        </select>
        <label>Deadline</label>
        <input
          type="date"
          required
          value={Deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <label>Job Description</label>
        <textarea
          required
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Post</button>
      </form>
    </div>
  );
};

export default Create;
