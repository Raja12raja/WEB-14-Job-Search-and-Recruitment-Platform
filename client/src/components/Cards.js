import React, { useState, useEffect } from "react";
import Axios from 'axios';
import location from './images/location.png';
import ReadMore from "./ReadMore";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userRole = localStorage.getItem('userRole');

const Cards = ({ query, selectedLocation, selectedRole, minSalary, history }) => { // Inject history prop
    const [allJobs, setAllJobs] = useState([]);
    // const [AppliedJobs, setAppliedJobs] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    const formatDate = (deadline) => {
        const date = new Date(deadline);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getJobs = async () => {
        try {
            const response = await Axios.get("http://localhost:5000/GetJobs");
            setAllJobs(response.data.data1);
        } catch (error) {
            console.log("error", error);
        }
    };

    // const getAppliedJobs = async () => {
    //     try {
    //         const response = await Axios.get("http://localhost:5000/GetAppliedJobs");
    //         setAppliedJobs(response.data.data3);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };

    useEffect(() => {
        getJobs();
       
    }, []);

    const filteredItems = allJobs.filter(job => {
        const matchesQuery = job.Role.toLowerCase().includes(query.toLowerCase());
        const matchesLocation = selectedLocation ? job.Location.toLowerCase() === selectedLocation : true;
        const matchesRole = selectedRole ? job.Role.toLowerCase().includes(selectedRole.toLowerCase()) : true;
        const matchesSalary = minSalary ? job.mSalary >= minSalary : true;
        return matchesQuery && matchesLocation && matchesRole && matchesSalary;
    });

    if (filteredItems.length === 0) {
        return (
            <div className="text-2xl">
                <h1>No Jobs Found ....</h1>
            </div>
        );
    }

    const onApply = (id) => {
    
        
        if (userRole === "employer") {

            {toast.warn('Please login as Candidate to apply', {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            });}
            
        } else {
            
           
                navigate(`/Apply/${id}`); 
           
        }
    }

    const renderCards = () => {
        return filteredItems.map((job, index) => (
            <div key={index} className="sm:w-1/2 md:w-1/2 lg:w-1/3 p-2 lg:p-3 mt-10">
                <div className="w-80 overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl rounded-lg cursor-pointer bg-[#EEEEEE] mx-auto">
                    <a className="w-full block h-full">
                        <div className="flex items-start p-4 bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE]">
                            <div className="w-16 h-16 object-cover">
                                <img className="object-cover object-center w-full h-full rounded-lg" src={job.Logo} alt="Company Logo" />
                            </div>
                            <div className="ml-4">
                                <div className="text-xl font-semibold text-[#393E46]">{job.Role}</div>
                                <div className="text-[#393E46] font-medium">@ {job.CompanyName}</div>
                            </div>
                        </div>
                        <div className="bg-white w-full p-4 rounded-b-lg">
                            <div className="w-full flex flex-col items-start">
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Skills :</label> <span>{job.Skills}</span>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Salary :</label> <span> $ {job.mSalary}  - $ {job.MSalary}</span>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Deadline :</label> <span>{formatDate(job.Deadline)}</span>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2 mt-2 min-h-14">
                                    <label className="text-blue-500">Description :</label> <ReadMore text={job.Description} maxLength={50} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-2 text-xs text-white font-medium">
                                <button
                                    onClick={() => onApply(job._id)}
                                    className="px-4 py-2 rounded-full bg-[#3C5B6F] hover:bg-[#393E46] flex m-auto">
                                    Apply now
                                </button>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="px-3 bg-[#DDDDDD] rounded-full text-black font-medium text-center">
                                    {job.Employmenttype}
                                </div>
                                <div className="px-3 bg-[#DDDDDD] rounded-full text-BLACK font-medium text-center ml-auto flex items-center">
                                    <img className="h-4 w-4 mt-1 mr-1" src={location} alt="Location Icon" />
                                    {job.Location}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <ToastContainer />
            </div>
        ));
    };

    return (
        <div className="flex flex-wrap justify-center mx-4">
            {renderCards()}
        </div>
    );
};

export default Cards; 
