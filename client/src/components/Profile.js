import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const { id: CId } = useParams();
    
    // State for profile details
    const [Linkedin, setLinkedin] = useState("");
    const [Github, setGithub] = useState("");
    const [Skills, setSkills] = useState(""); 
    const [Experience, setExperience] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handler for form submission
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await Axios.post("http://localhost:5000/C", {
                Linkedin,
                Github,
                Skills,
                Experience,
                CId,
            });

            alert("Profile completed successfully");
            setIsModalOpen(false); // Close modal on success
            navigate('/');
        } catch (error) {
            alert("Error completing profile");
        } finally {
            setIsLoading(false);
        }
    };

    // Modal open and close handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // If not authenticated, show login button
    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <button 
                    onClick={() => loginWithRedirect()} 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form onSubmit={HandleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label
                                        htmlFor="Linkedin"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Linkedin
                                    </label>
                                    <input
                                        type="url"
                                        value={Linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://www.linkedin.com/in"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="Github"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        GitHub Profile
                                    </label>
                                    <input
                                        type="url"
                                        value={Github}
                                        onChange={(e) => setGithub(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="github.com/yourprofile"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="Skills"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Skills
                                    </label>
                                    <textarea
                                        value={Skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="JavaScript, Node.js, MongoDB"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="Experience"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Experience
                                    </label>
                                    <textarea
                                        value={Experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your experience"
                                        required
                                    />
                                </div>

                               

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="text-white bg-[#3C5B6F] hover:bg-[#393E46] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                                    >
                                        Submit
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
                                        Complete profile
                                    </button>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                                    Skills
                                </span>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6 mb-6 min-h-[200px]">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <p className="text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                                vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                                et ultrices posuere cubilia Cura
                                e; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                                luctus risus rhoncus id.
                            </p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6 min-h-[200px]">
                            <h2 className="text-xl font-bold mb-4">Experience</h2>
                            <p className="text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                                vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                                et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                                luctus risus rhoncus id.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
