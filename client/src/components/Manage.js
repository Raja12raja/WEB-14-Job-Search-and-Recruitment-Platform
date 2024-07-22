import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from 'react-router-dom';

const MDashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [allAppliedJobs, setAllAppliedJobs] = useState([]);
    const navigate = useNavigate();
    const { id: jobId } = useParams();

    const getAppliedJobs = async () => {
        try {
            const response = await Axios.get("http://localhost:5000/GetAppliedJobs");
            setAllAppliedJobs(response.data.data3);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getAppliedJobs();
    }, []);

    const PendingJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Pending");
    const AcceptedJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Accepted");
    const DeclinedJobs = allAppliedJobs.filter(job => job.JobId === jobId && job.Status === "Declined");

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
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-4 w-full">
                {PendingJobs.map((row, index) => (
                    <div className="flex items-center relative p-6 w-full bg-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300" key={index}>
                        <div className="w-16 h-16 rounded-full bg-gray-100"></div>
                        <div className="ml-4">
                            <p className="font-bold text-gray-800 text-lg">{row.UserName}</p>
                            <p className="text-sm text-gray-600">Email: <a href={`mailto:${row.ContactEmail}`}>{row.ContactEmail}</a></p>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm text-gray-600">Resume: <a href="#">View</a></p>
                                <button
                                    className="absolute right-4 top-4 text-emerald-500 bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleAcc(row._id)}
                                >Accept</button>
                            </div>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm text-gray-600">CV: <a href="#">View</a></p>
                                <button
                                    className="absolute right-4 bottom-3 text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleDec(row._id)}
                                >Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-green-500 text-xl p-4 rounded-lg shadow">Accepted APPLICATIONS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full">
                {AcceptedJobs.map((row2, index2) => (
                    <div className="flex items-center relative p-6 w-full bg-white text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300" key={index2}>
                        <div className="w-16 h-16 rounded-full bg-gray-100"></div>
                        <div className="ml-4">
                            <p className="font-bold text-lg">{row2.UserName}</p>
                            <p className="text-sm">Email: <a href={`mailto:${row2.ContactEmail}`} className="text-blue-500">{row2.ContactEmail}</a></p>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm">Resume: <a href="#" className="text-blue-500">View</a></p>
                            </div>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm">CV: <a href="#" className="text-blue-500">View</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-red-400 text-xl p-4 rounded-lg shadow">Declined APPLICATIONS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full">
                {DeclinedJobs.map((row3, index3) => (
                    <div className="flex items-center relative p-6 w-full bg-white text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300" key={index3}>
                        <div className="w-16 h-16 rounded-full bg-gray-100"></div>
                        <div className="ml-4">
                            <p className="font-bold text-lg">{row3.UserName}</p>
                            <p className="text-sm">Email: <a href={`mailto:${row3.ContactEmail}`} className="text-blue-500">{row3.ContactEmail}</a></p>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm">Resume: <a href="#" className="text-blue-500">View</a></p>
                            </div>
                            <div className="flex flex-row mt-2">
                                <p className="text-sm">CV: <a href="#" className="text-blue-500">View</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MDashboard;
