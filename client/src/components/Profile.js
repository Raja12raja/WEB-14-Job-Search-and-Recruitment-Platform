import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const { user, isAuthenticated , isLoading} = useAuth0();
    
    // State for profile details
    const [profile, setProfile] = useState({
        LinkedIn: "",
        Github: "",
        Skills: "", 
        About: "", 
        Experience: ""
    });


    const [isModalOpen, setIsModalOpen] = useState(false);


    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            const response = await Axios.post("http://localhost:5000/ProfileInfo", {
                UEmail: user.email,
                ...profile
            });

           
            {  toast.success('Profile Updated Succesfully', {
                position: "top-right",
                autoClose: 2001,
                theme: "dark",
              });
            }
            setIsModalOpen(false);
            
        } catch (error) {
            console.error('Error submitting profile:', error);
            alert("Error completing profile");
        } finally {
            
        }
    };

    // Modal open and close handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Fetch profile data
    const getProfile = async () => {
        try {
            const response = await Axios.get(`http://localhost:5000/Getprofile/${user.email}`);
           
            setProfile(response.data);
            
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getProfile();
        }
    }, [isAuthenticated]);


    const isProfileComplete = Object.values(profile).every(value => value !== "");
    
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
            return (
              <div className="text-center mt-10">
                <p className="text-red-500 font-semibold">Please Login First</p>
              </div>
            );
          
    }
    

    return (
        <div className="bg-gray-100 min-h-screen">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="Linkedin" className="block mb-2 text-sm font-medium text-gray-900">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="url"
                                        value={profile.LinkedIn}
                                        onChange={(e) => setProfile({ ...profile, LinkedIn: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://www.linkedin.com/in"
                                        
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Github" className="block mb-2 text-sm font-medium text-gray-900">
                                        GitHub Profile
                                    </label>
                                    <input
                                        type="url"
                                        value={profile.Github}
                                        onChange={(e) => setProfile({ ...profile, Github: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="github.com/yourprofile"
                                    
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Skills" className="block mb-2 text-sm font-medium text-gray-900">
                                        Share your Skill sets
                                    </label>
                                    <textarea
                                        value={profile.Skills}
                                        onChange={(e) => setProfile({ ...profile, Skills: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="JavaScript, Node.js, MongoDB"
                                        
                                    />
                                </div>

                                <div>
                                    <label htmlFor="About" className="block mb-2 text-sm font-medium text-gray-900">
                                        Write something About you
                                    </label>
                                    <textarea
                                        value={profile.About}
                                        onChange={(e) => setProfile({ ...profile, About: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="About you"
                                       
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Experience" className="block mb-2 text-sm font-medium text-gray-900">
                                        Let Us know about your work Experience
                                    </label>
                                    <textarea
                                        value={profile.Experience}
                                        onChange={(e) => setProfile({ ...profile, Experience: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your experience"
                                        
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#3C5B6F] hover:bg-[#393E46] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 ml-2"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="container mx-auto py-8 px-10 sm:px-20 lg:px-10">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img 
                                    src={user.picture} 
                                    alt="Profile" 
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" 
                                />
                                <h1 className="text-xl font-bold">{user.name}</h1>
                                <p className="text-gray-700">{user.email}</p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">

                                
                                <button 
                                        onClick={openModal} 
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        {isProfileComplete ? "Update profile" : "Complete profile"}
                                    </button>


                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col break-words overflow-hidden">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 ">
                                    Skills
                              
                                </span>
                                {profile.Skills}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
    <div className="bg-white shadow rounded-lg p-6 mb-6 min-h-[200px]">
        <h2 className="text-xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 break-words overflow-hidden">
            {profile.About}
        </p>
    </div>
    <div className="bg-white shadow rounded-lg p-6 min-h-[200px]">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        <p className="text-gray-700 break-words overflow-hidden">
            {profile.Experience}
        </p>
    </div>
</div>

                </div>
            </div>
            <ToastContainer />

        </div>
    );
};

export default ProfilePage;
