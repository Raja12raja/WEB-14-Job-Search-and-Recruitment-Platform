import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const MDashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const { id: jobId } = useParams();

  const getAppliedJobs = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/GetAppliedJobs");
      setAllAppliedJobs(response.data.data3);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  const PendingJobs = allAppliedJobs.filter(
    (job) => job.JobId === jobId && job.Status === "Pending"
  );
  const AcceptedJobs = allAppliedJobs.filter(
    (job) => job.JobId === jobId && job.Status === "Accepted"
  );
  const DeclinedJobs = allAppliedJobs.filter(
    (job) => job.JobId === jobId && job.Status === "Declined"
  );

  const handleAcc = async (editJobId) => {
    try {
      const response = await Axios.put(
        `http://localhost:5000/editAppliedJob/${editJobId}`,
        { status: "Accepted" }
      );
      if (response.data.success) {
        alert("Job updated successfully");
        getAppliedJobs(); // Refresh the list after updating
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDec = async (editJobId) => {
    try {
      const response = await Axios.put(
        `http://localhost:5000/editAppliedJob/${editJobId}`,
        { status: "Declined" }
      );
      if (response.data.success) {
        alert("Job updated successfully");
        getAppliedJobs(); // Refresh the list after updating
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        {" "}
        <div className="text-center ">
          <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 ">
            <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 transform scale-50 mb-40">
              <div>
                <h1 class="text-xl md:text-7xl font-bold flex items-center">
                  L
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    class="animate-spin"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
                  </svg>{" "}
                  ading . . .
                </h1>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    );
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
      <div className=" bg-gray-300 text-xl p-4 rounded-lg shadow hover:bg-gray-400 transition-colors duration-300">
        Pending Applications
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 mt-4 w-full">
        {PendingJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No Pending Applications
          </div>
        ) : (
          PendingJobs.map((row, index) => (
            <div
              className="flex items-center relative p-6 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              key={index}
            >
              <div className="w-16 h-16 rounded-full bg-gray-100">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/662/785/original/man-face-cartoon-vector.jpg"
                  alt="profil"
                />
              </div>
              <div className="ml-4">
                <p className="font-bold text-gray-800 text-lg">
                  {row.UserName}
                </p>
                <p className="text-sm text-blue-500">
                  Email:{" "}
                  <a href={`mailto:${row.ContactEmail}`}>{row.ContactEmail}</a>
                </p>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Resume:{" "}
                    <a href={row.UserResume} target="_blank">
                      View
                    </a>
                  </p>

                  <button
                    className="absolute right-4 top-4 text-emerald-500 bg-transparent border border-emerald-500 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => handleAcc(row._id)}
                  >
                    Accept
                  </button>
                </div>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Github:{" "}
                    <a href={row.UserGithub} target="_blank">
                      View
                    </a>
                  </p>
                  <button
                    className="absolute right-4 bottom-3 text-red-500 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => handleDec(row._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className=" mx-auto mt-10 bg-green-500 text-xl p-4 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">
        Accepted Applications
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full">
        {AcceptedJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No Accepted Applications
          </div>
        ) : (
          AcceptedJobs.map((row2, index2) => (
            <div
              className="flex items-center relative p-6 w-full bg-white text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              key={index2}
            >
              <div className="w-16 h-16 rounded-full bg-gray-100">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/662/785/original/man-face-cartoon-vector.jpg"
                  alt="profile pic"
                />
              </div>
              <div className="ml-4">
                <p className="font-bold text-lg">{row2.UserName}</p>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href={`mailto:${row2.ContactEmail}`}
                    className="text-blue-500"
                  >
                    {row2.ContactEmail}
                  </a>
                </p>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Resume:{" "}
                    <a href={row2.UserResume} target="_blank">
                      View
                    </a>
                  </p>
                </div>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Github:{" "}
                    <a href={row2.UserGithub} target="_blank">
                      View
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="  mx-auto mt-10 bg-red-400 text-xl p-4 rounded-lg shadow hover:bg-red-500 transition-colors duration-300">
        Declined Applications
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-4 w-full">
        {DeclinedJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No Declined Applications
          </div>
        ) : (
          DeclinedJobs.map((row3, index3) => (
            <div
              className="flex items-center relative p-6 w-full bg-white text-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
              key={index3}
            >
              <div className="w-16 h-16 rounded-full bg-gray-100">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/662/785/original/man-face-cartoon-vector.jpg"
                  alt="profile pic"
                />
              </div>
              <div className="ml-4">
                <p className="font-bold text-lg">{row3.UserName}</p>
                <p className="text-sm">
                  Email:{" "}
                  <a
                    href={`mailto:${row3.ContactEmail}`}
                    className="text-blue-500"
                  >
                    {row3.ContactEmail}
                  </a>
                </p>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Resume:{" "}
                    <a href={row3.UserResume} target="_blank">
                      View
                    </a>
                  </p>
                </div>
                <div className="flex flex-row mt-2">
                  <p className="text-sm text-gray-600">
                    Github:{" "}
                    <a href={row3.UserGithub} target="_blank">
                      View
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MDashboard;
