import { useState } from "react";
import './About.css';
const Create =()=>{
  const [Roles,setRoles]=useState("");
  const [Jobs,setJobs]=useState("");
  const [Skills,setSkills]=useState("");
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
      <label>Salary-Range</label>
      <select>
        <option value="80k">60k-80k dollars</option>
        <option value="100k">80k-100k dollars</option>
        <option value="120k">100k-120k dollars</option>
      </select>
      <label>Experiance-Level</label>
      <select>
        <option value="Fresher">Fresher</option>
        <option value="2+Years">2-Years</option>
        <option value="4+Years">4+Years</option>
      </select>
       <button>Add Posts</button>
       <p>{Roles}</p>
       <p>{Jobs}</p>
       <p>{Skills}</p>
    </form>
   </div>
  );
} 
export default Create;