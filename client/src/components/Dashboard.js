import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [allJobs, setAllJobs] = useState([]);
  const navigate = useNavigate();

  const getJobs = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetJobs");
      setAllJobs(response.data.data1);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

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
    return <div className='font-bold'>Please Login First ...</div>;
  }

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
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredJobs = allJobs.filter(job => job.email === user.email);

  return (
    <div>
      <div>
        <div className="font-bold text-2xl mt-7">Admin Dashboard</div>
      </div>
      <table className="min-w-full border-collapse block md:table mt-7">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">NO.</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Company Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Applications</th>
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
                <span className="inline-block w-1/3 md:hidden font-bold">Applications</span><a href={`/Manage/${row._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Manage</a>
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                onClick={() => handleEdit(row._id)}
                >Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border mx-3 border-red-500 rounded"
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
