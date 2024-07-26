import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const { id: CId } = useParams();
    
    // State for profile details
    const [profile, setProfile] = useState({
        LinkedIn: "",
        Github: "",
        Skills: "", 
        About: "", 
        Experience: ""
    });


    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value
        }));
      };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await Axios.post("http://localhost:5000/ProfileInfo", {
                Email: user.email,
                ...profile
            });

            console.log('Profile submitted successfully', response.data);
            alert("Profile completed successfully");
            setIsModalOpen(false);
            
        } catch (error) {
            console.error('Error submitting profile:', error);
            alert("Error completing profile");
        } finally {
            setIsLoading(false);
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

    if (!isAuthenticated) {
        return (
            
<div >Please Login First ...</div>
  
            
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
        </div>
    );
};

export default ProfilePage;
