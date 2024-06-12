import { useState } from "react";
import './About.css';
const Create =()=>{
  const [Roles,setRoles]=useState("");
  const [Jobs,setJobs]=useState("");
  const [Skills,setSkills]=useState("");
  const [MSalary,setMSalary]=useState("");
  const [mSalary,setmSalary]=useState("");
  const [Deadline,setDeadline]=useState("");
  const [Employmenttype,setEmploymenttype]=useState("");
  const [Description,setDescription]=useState("");
  
  return (
   <div className="create">
    <h2>Posting Jobs</h2>
    <form>
    <label>Job Title</label>
       <input type="text" 
       required
       value ={ Roles}
       onChange={(e)=>setRoles(e.target.value)}
       />
       <label>Company Name</label>
       <input type="text" 
       required
       value ={Jobs}
       onChange={(e)=>setJobs(e.target.value)}
       />
       <label>Required Skills</label>
       <input type="text" 
       required
       value ={Skills}
       onChange={(e)=>setSkills(e.target.value)}
       />
       <label>Min-Salary</label>
       <input type="text" 
       required
       value ={mSalary}
       onChange={(e)=>setmSalary(e.target.value)}
       />
       <label>Max-Salary</label>
       <input type="text" 
       required
       value ={MSalary}
       onChange={(e)=>setMSalary(e.target.value)}
       />
      <label>Job-Location</label>
      <select>
        <option value="Mumbai">Mumbai</option>
        <option value="Banglore">Babglore</option>
        <option value="Pune">Pune</option>
        <option value="Noida">Noida</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Delhi">Delhi</option>
        <option value="Indore">Indore</option>
      </select><label>Employment-Type</label>
       <input type="text" 
       required
       value ={Employmenttype}
       onChange={(e)=>setEmploymenttype(e.target.value)}
       />

      <label>Deadline</label>
       <input type="text" 
       required
       value ={Deadline}
       onChange={(e)=>setDeadline(e.target.value)}
       />
       <label>Desription</label>
       <textarea
       required
       value ={Description}
      onChange={(e)=>setDescription(e.target.value)}>
       </textarea>
       <button>Add Posts</button>
       <p>{Roles}</p>
       <p>{Jobs}</p>
       <p>{Skills}</p>
       <p>{Employmenttype}</p>
       <p>{Deadline}</p>
    </form>
   </div>
  );
} 
export default Create;