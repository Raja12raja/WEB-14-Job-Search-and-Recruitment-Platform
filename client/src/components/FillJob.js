import React, { useState } from "react";
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FillJob = () => {
  const [UserName, setUserName] = useState("");
  const [ContactEmail, setContactEmail] = useState("");
  const [UserGithub, setGitHub] = useState("");
  const [ResumeLink, setResumeLink] = useState(""); // Added state for resume link
  const [Status, setStatus] = useState("");

  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  
  const HandleSubmit = async (e) => {
   
    e.preventDefault();
    setStatus("Pending");

    const response = await Axios.get(`http://localhost:5000/GetJobById/${jobId}`);

    Axios.post("http://localhost:5000/applyJOB", {
      UserName,
      ContactEmail,
      UserGithub,
      UserEmail: user.email,
      Status: "Pending",
      JobId: jobId,
      AdminEmail: response.data.email,
      Title: response.data.Role,
      Deadline: response.data.Deadline,
      CompanyName: response.data.CompanyName,
    UserResume:  ResumeLink // Added resume link to the post data
    
    })
    .then(() => {
      {  toast.success('Application sent succesfully', {
        position: "top-right",
        autoClose: 2001,
        theme: "dark",
      });
    }
      setTimeout(() => {
        navigate('/');
      }, 1000);
     
    })
      .catch(() => { alert("Error posting application") });
  };

  if (isLoading) {
    return <div className="text-center mt-10"> <div className="text-center "><div class="flex items-center justify-center w-full h-[100vh] text-gray-900 ">

      
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
    
      </div></div>;</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">Please Login First</p>
      </div>
    );
  }

  return (
    <div className="bg-[#EEEEEE] min-h-screen bg-cover bg-center">
      <nav className="bg-[#EEEEEE] py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-black font-bold text-2xl">My Application Form</h1>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={HandleSubmit}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="Name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sahil Bharti"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                value={ContactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="github"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                GitHub Profile
              </label>
              <input
                type="url"
                value={UserGithub}
                onChange={(e) => setGitHub(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="github.com/yourprofile"
                required
              />
            </div>
            <div>
              <label
                htmlFor="resume"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Resume (Drive link)
              </label>
              <input
                type="url"
                id="resume"
                value={ResumeLink} // Controlled input for resume link
                onChange={(e) => setResumeLink(e.target.value)} // Update state on change
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://drive.google.com/..."
                required
              />
            </div>
            <div className="flex items-start">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-[#3C5B6F] hover:bg-[#393E46] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FillJob;
