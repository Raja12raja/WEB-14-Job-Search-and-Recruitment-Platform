import React, { useState, useEffect } from "react";
import Axios from 'axios';
import location from './images/location.png';
import nvidia from './images/nvidia.png';
import google from './images/google.png';
import ReadMore from "./ReadMore";

const Cards = () => {
    const [allJobs, setAllJobs] = useState([]);

    // Function to format deadline date
    const formatDate = (deadline) => {
        const date = new Date(deadline);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to fetch jobs data
    const getJobs = async () => {
        try {
            const response = await Axios.get("http://localhost:5000/GetJobs");
            console.log(response.data.data1);
            setAllJobs(response.data.data1);
        } catch (error) {
            console.log("error", error)
        }
    }

    // Fetch jobs data on component mount
    useEffect(() => {
        getJobs();
    }, []);

    // Function to render cards
    const renderCards = () => {
        return allJobs.map((job, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-2 lg:p-4 mt-20">
                <div className="w-72 overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg cursor-pointer bg-white mx-auto">
                    <a href="#" className="w-full block h-full">
                        <div className="flex items-start">
                            <div className="w-12 h-12 object-cover ml-4 mt-4">
                                <img className="object-cover object-center w-full h-full rounded-lg" src={job.Logo} alt="Company Logo" />
                            </div>
                            <div className="ml-4">
                                <div className="text-indigo-500 text-xl font-medium">{job.Role}</div>
                                <div className="font-medium">@ {job.CompanyName}</div>
                            </div>
                        </div>
                        <div className="bg-white w-full p-4">
                            <div className="w-full flex flex-col items-start">
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Skills :</label> <a>{job.Skills}</a>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Salary :</label> <a>{job.mSalary}k - {job.MSalary}k</a>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2">
                                    <label>Deadline :</label> <a>{formatDate(job.Deadline)}</a>
                                </div>
                                <div className="w-full text-gray-800 text-sm font-medium mb-2 mt-2 min-h-14">
                                    <label className="text-indigo-700">Description :</label> <ReadMore text={job.Description} maxLength={50} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-2 text-xs text-white font-medium">
                                <a href="/Apply" className="px-2 py-1 rounded bg-indigo-500 flex m-auto">
                                    Apply now
                                </a>
                            </div>
                            <div className="flex items-center mt-4">
                                <div className="px-3 bg-indigo-500 rounded text-white font-medium text-center">
                                    {job.Employmenttype}
                                </div>
                                <div className="px-3 bg-indigo-500 rounded text-white font-medium text-center ml-auto">
                                    <a className="flex items-center">
                                        <img className="h-4 w-4 mt-1 mr-1" src={location} alt="Location Icon" />
                                        {job.Location}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-wrap justify-center">
            {renderCards()}
            <div className="absolute bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Follow me on twitter" href="https://www.twitter.com/asad_codes" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg" alt="Twitter Logo" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Cards;
