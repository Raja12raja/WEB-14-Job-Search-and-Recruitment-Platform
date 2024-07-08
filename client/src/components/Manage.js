import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const MDashboard = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [allAppliedJobs, setAllAppliedJobs] = useState([]);
    const navigate = useNavigate();
    const { id: jobId } = useParams();

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

    // Filter jobs based on params which are pending
    const PendingJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Pending");
    const AcceptedJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Accepted");
    const DeclinedJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Declined");

    // Handling buttons
    const handleAcc = async (editJobId) => {
        try {
            const response = await Axios.put(`http://localhost:5000/editAppliedJob/${editJobId}`, { status: "Accepted" });
            if (response.data.success) {
                alert('Job updated successfully');
                getAppliedJobs();  // Refresh the list after updating
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleDec = async (editJobId) => {
        try {
            const response = await Axios.put(`http://localhost:5000/editAppliedJob/${editJobId}`, { status: "Declined" });
            if (response.data.success) {
                alert('Job updated successfully');
                getAppliedJobs();  // Refresh the list after updating
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    if (isLoading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-10">
                <p className="text-red-500 font-semibold">Please Login First</p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-32 mt-4 w-full ">
                {PendingJobs.map((row, index) => (
                    <div className="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md" key={index}>
                        <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800">{row.UserName}</p>
                            <p className="text-sm text-gray-600">Email : <a>{row.ContactEmail}</a></p>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">Resume : <a>View</a></p>
                                <button
                                    className="absolute right-4 top-4 text-emerald-500 bg-transparent border border-solid border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleAcc(row._id)}
                                >Accept</button>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">CV : <a>View</a></p>
                                <button
                                    className="absolute right-4 bottom-3 text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleDec(row._id)}
                                >Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-slate-100 text-xl">Accepted APPLICATIONS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full ">
                {AcceptedJobs.map((row2, index2) => (
                    <div className="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md" key={index2}>
                        <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800">{row2.UserName}</p>
                            <p className="text-sm text-gray-600">Email : <a>{row2.ContactEmail}</a></p>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">Resume : <a>View</a></p>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">CV : <a>View</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-slate-100 text-xl">Declined APPLICATIONS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full ">
                {DeclinedJobs.map((row3, index3) => (
                    <div className="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md" key={index3}>
                        <div className="w-12 h-12 rounded-full bg-gray-100"> </div>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800">{row3.UserName}</p>
                            <p className="text-sm text-gray-600">Email : <a>{row3.ContactEmail}</a></p>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">Resume : <a>View</a></p>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-sm text-gray-600">CV : <a>View</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MDashboard;


























// {/* 1 */}
// <div>
// <div className='flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2 w-full items-center justify-center min-h-screen'>
//  <div className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-blue-300'>
//    <div className="flex justify-between w-full">
//      <div className="p-2">
//        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
//        </svg>
//      </div>
//      <div className="flex items-center text-xs px-3 bg-blue-200 text-blue-800 rounded-full">
//        100%
//      </div>
//    </div>
//    <div>
//      <div className="font-bold text-5xl">4</div>
//      <div className="font-bold text-sm">Total</div>
//    </div>
//  </div>

//  <div className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-purple-300'>
//    <div className="flex justify-between w-full">
//      <div className="p-2">
//        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//        </svg>
//      </div>
//      <div className="flex items-center text-xs px-3 bg-purple-200 text-purple-800 rounded-full">
//        25%
//      </div>
//    </div>
//    <div className="text-center">
//      <div className="font-bold text-5xl">1</div>
//      <div className="font-bold text-sm">In Progress</div>
//    </div>
//  </div>

//  <div className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-red-300'>
//    <div className="flex justify-between w-full">
//      <div className="p-2">
//        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//        </svg>
//      </div>
//      <div className="flex items-center text-xs px-3 bg-red-200 text-red-800 rounded-full">
//        50%
//      </div>
//    </div>
//    <div className="text-center">
//      <div className="font-bold text-5xl">2</div>
//      <div className="font-bold text-sm">Reject</div>
//    </div>
//  </div>

//  <div className='flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300'>
//    <div className="flex justify-between w-full">
//      <div className="p-2">
//        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//        </svg>
//      </div>
//      <div className="flex items-center text-xs px-3 bg-green-200 text-green-800 rounded-full">
//        25%
//      </div>
//    </div>
//    <div className="text-center">
//      <div className="font-bold text-5xl">1</div>
//      <div className="font-bold text-sm">Approve</div>
//    </div>
//  </div>
// </div>
// </div>
