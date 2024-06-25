import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import './About.css';

const Create = () => {
  const { user, isAuthenticated ,isLoading} = useAuth0(); 
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
  const [email, setEmail] = useState("not loggedin");
  const [Logo, setLogo] = useState("https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");

  const HandleSubmit = async (e) => {
    e.preventDefault();
  
    

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

    // Make a POST request to the backend
    Axios.post("http://localhost:5000/postJob", { blog })
      .then(() => {
        alert("Job posted successfully");
        navigate('/');
      })
      .catch(() => { alert("error posting") });
  };

  
 
    // If user is not authenticated
    if (!isAuthenticated) {
      return <div>Please login first ...</div>;
    }
 



  return (
    <div className="create-container">
      <h1 className="title">Post a Job</h1>
      <form onSubmit={HandleSubmit} className="form">
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            required
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <select
            required
            value={Role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Web Dev">Web Dev</option>
            <option value="App Dev">App Dev</option>
            <option value="CyberSec">CyberSec</option>
            <option value="DataScience">Data Science</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Employment Type</label>
          <select
            required
            value={Employmenttype}
            onChange={(e) => setEmploymenttype(e.target.value)}
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div className="form-group">
          <label>Required Skills</label>
          <input
            type="text"
            required
            value={Skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Minimum Salary (In $)</label>
          <input
            type="number"
            required
            value={mSalary}
            onChange={(e) => setmSalary(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Maximum Salary (In $)</label>
          <input
            type="number"
            required
            value={MSalary}
            onChange={(e) => setMSalary(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Location</label>
          <select
            required
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Indore">Indore</option>
          </select>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            required
            value={Deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>URL of Company Logo</label>
          <input
            type="text"
            value={Logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            required
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Post</button>
      </form>
    </div>
  );
};

export default Create;
