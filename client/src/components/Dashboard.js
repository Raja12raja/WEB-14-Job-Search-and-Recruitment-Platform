import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [allJobs, setAllJobs] = useState([]);

  // To get Jobs posted
  const getJobs = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetJobs");
      console.log(response.data.data1);
      setAllJobs(response.data.data1);
    } catch (error) {
      console.log("error", error);
    }
  }

  // Fetch jobs data on component mount
  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <div>Please Login First ...</div>;
  }

  // Delete job by ID
  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await Axios.delete(`http://localhost:5000/DeleteJob/${id}`);
        alert("Successfully deleted");
        setAllJobs(allJobs.filter(job => job._id !== id));
      } catch (err) {
        console.log(err);
        alert("Error deleting, try again later");
      }
    }
  }

  // Filter jobs based on user's email
  const filteredJobs = allJobs.filter(job => job.email === user.email);

  return (
    <div>
      <div>
        <div className="font-bold text-2xl mt-7">Your Dashboard</div>
      </div>
      <table className="min-w-full border-collapse block md:table mt-7">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">NO.</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Company Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {filteredJobs.map((row, index) => (
            <tr key={index} className={`border border-grey-500 md:border-none block md:table-row ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">NO.</span>{index + 1}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Title</span>{row.Role}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Company Name</span>{row.CompanyName}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                >Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                onClick={() => deleteJob(row._id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
