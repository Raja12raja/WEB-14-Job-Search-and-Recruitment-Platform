import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import './About.css';
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
  const [email, setEmail] = useState("not loggedin");
  const [Logo, setLogo] = useState("https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg");

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated && user) {
      setEmail(user.email);
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
      email,
      Logo
    };
    console.log(blog)

    

    // Make a POST request to the backend
    Axios.post("http://localhost:5000/postJob",{blog})
    .then(()=>{
      alert("Job posted successfully");
      navigate('/');
    })
    .catch(()=>{alert("error posting")})
  };

  return (
    <div className="create "> {/* Use className instead of class */}
      <h2>Posting Jobs</h2>
      <form onSubmit={HandleSubmit}>
      <label>Company Name</label>
        <input
          type="text"
          required
          value={CompanyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

       <label>Job Title</label>
        <select
     
          required
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Web Dev" >Web Dev</option>
          <option value="App Dev">App Dev</option>
          <option value="CyberSec">CyberSec</option>
          <option value="DataScience">Data Science</option>
          <option value="HR">HR</option>
        </select>
        <label>Employment type</label>
        <select
       
          required
          onChange={(e) => setEmploymenttype(e.target.value)}
        >
          <option value="Web Dev">Full time</option>
          <option value="App Dev">Part time</option>
          <option value="App Dev">Intern</option>
     
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
          <label>URL of Company Logo</label>
        <input
          type="text"
         
         
          onChange={(e) => setLogo(e.target.value)}
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
