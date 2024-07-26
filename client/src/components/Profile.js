import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import {Completeprofile} from './Completeprof';

const ProfilePage = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

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

    const handleEditClick = () => {
        navigate(`/Completeprof/${user.sub}`); 
    };

    return (
        <div className="bg-gray-100 min-h-screen">
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
                                        onClick={handleEditClick} 
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
                                <ul>
                                    <li className="mb-2">JavaScript</li>
                                    <li className="mb-2">React</li>
                                    <li className="mb-2">Node.js</li>
                                    <li className="mb-2">HTML/CSS</li>
                                    <li className="mb-2">Tailwind CSS</li>
                                </ul>
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
                                et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
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
