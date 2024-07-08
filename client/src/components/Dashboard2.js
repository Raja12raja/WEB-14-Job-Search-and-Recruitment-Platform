import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';

const Dashboard2 = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [allAppliedJobs, setAllAppliedJobs] = useState([]);

    // To get Jobs Applied
    const getAppliedJobs = async () => {
        try {
            const response = await Axios.get("http://localhost:5000/GetAppliedJobs");
            setAllAppliedJobs(response.data.data3);
        } catch (error) {
            console.log("error", error);
        }
    }

    // Fetch jobs data on component mount
    useEffect(() => {
        getAppliedJobs();
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if (!isAuthenticated) {
        return <div>Please Login First ...</div>;
    }



    // Filter jobs based on user's email
    const filteredJobs = allAppliedJobs.filter(job => job.UserEmail === user.email);
    console.log(filteredJobs)
    console.log(allAppliedJobs)

    return (
        <div>
            <div>
                <div className="font-bold text-2xl mt-7">Your Jobs Dashboard</div>
            </div>
            <table className="min-w-full border-collapse block md:table mt-7">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">NO.</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Title</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Company Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">status</th>
                       
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Deadline</th>

                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {filteredJobs.map((row, index) => (
                        <tr key={index} className={`border border-grey-500 md:border-none block md:table-row ${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">NO.</span>{index + 1}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Title</span>{row.Title}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Company Name</span>{row.CompanyName}
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                                <span className="inline-block w-1/3 md:hidden font-bold">Status</span>
                                <td class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                                    <span className={`inline-block px-3 py-1 font-semibold rounded-full ${row.Status === 'Pending' ? 'bg-yellow-300' : row.Status === 'Accepted' ? 'bg-green-300' : row.Status === 'Declined' ? 'bg-red-300': ''
                                        }`}>
                                        {row.Status}
                                    </span>

                                </td>
                        
                            </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">    
    {new Date(row.Deadline).toLocaleDateString('en-GB').replace(/\//g, '/')}
</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard2;









{/* <td class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
<span class="inline-block px-3 py-1 font-semibold leading-tight rounded-full bg-red-200 text-red-900">
  Inactivo
</span>
</td> */}