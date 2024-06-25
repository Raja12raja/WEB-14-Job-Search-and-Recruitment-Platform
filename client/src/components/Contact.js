import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';

const Contact = () => {
  const [allJobs, setAllJobs] = useState([]); 
  const { user, isAuthenticated, isLoading } = useAuth0();



  // To get Jobs posted 
  const getJobs = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetJobs");

      setAllJobs(response.data.data1);
    } catch (error) {
      console.log("error", error)
    }
  }

  // Fetch jobs data on component mount
  useEffect(() => {
    getJobs();
  }, []);


  if (isLoading) {
    return <div>Loading ...</div>;
  }
    // If user is not authenticated
    if (!isAuthenticated) {
      return <div>Please login first ...</div>;
    }

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
          {allJobs.map((row, index) => (
            // Conditionally render rows based on user email
            row.email === user.email && (
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
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
