import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const { isAuthenticated, logout } = useAuth0();
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#028391]">
      <div className="px-4 py-5 mx-auto lg:max-w-screen-2xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-teal-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-3xl font-bold tracking-wide text-[#222831]">
              JobTreX
            </span>
          </a>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/"
                aria-label="Home"
                title="Home"
                className={`font-medium tracking-wide text-[#222831] transition-colors duration-200 px-3 py-2 rounded ${isActive('/') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/profile"
                aria-label="Profile"
                title="Profile"
                className={`font-medium tracking-wide text-[#222831] transition-colors duration-200 px-3 py-2 rounded ${isActive('/profile') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
              >
                Profile
              </a>
            </li>

            {userRole === 'employer' ? (
              <li>
                <a
                  href="/Dashboard"
                  aria-label="Dashboard"
                  title="Dashboard"
                  className={`font-medium tracking-wide text-[#222831] transition-colors duration-200 px-3 py-2 rounded ${isActive('/Dashboard') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                >
                  Dashboard
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/Dashboard2"
                  aria-label="Dashboard"
                  title="Dashboard"
                  className={`font-medium tracking-wide text-[#222831] transition-colors duration-200 px-3 py-2 rounded ${isActive('/Dashboard2') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                >
                  Dashboard
                </a>
              </li>
            )}

            {userRole === 'employer' ? (
              <li>
                <a
                  href="/PostJob"
                  aria-label="PostJob"
                  title="PostJob"
                  className={`font-medium tracking-wide text-[#222831] transition-colors duration-200 px-3 py-2 rounded ${isActive('/PostJob') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                >
                  PostJob
                </a>
              </li>
            ) : null}
          </ul>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/login"
                className={`inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-[#222831] transition duration-200 rounded shadow-md bg-[#EEEEEE] hover:bg-[#222831] hover:text-white focus:shadow-outline focus:outline-none ${isActive('/login') ? 'bg-[#222831] text-white' : ''}`}
                aria-label="Login"
                title="Login"
              >
                {isAuthenticated ? (
                  <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Logout
                  </button>
                ) : (
                  <p>Login</p>
                )}
              </a>
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-[#222831] uppercase">
                          Job Platform
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="/home"
                          aria-label="Home"
                          title="Home"
                          className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 px-3 py-2 rounded ${isActive('/home') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="/profile"
                          aria-label="Profile"
                          title="Profile"
                          className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 px-3 py-2 rounded ${isActive('/profile') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Dashboard"
                          aria-label="Dashboard"
                          title="Dashboard"
                          className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 px-3 py-2 rounded ${isActive('/Dashboard') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="/PostJob"
                          aria-label="PostJob"
                          title="PostJob"
                          className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 px-3 py-2 rounded ${isActive('/PostJob') ? 'bg-[#393E46] text-white' : 'hover:text-white hover:bg-[#393E46]'}`}
                        >
                          PostJob
                        </a>
                      </li>
                      <li>
                        <a
                          href="/login"
                          className={`inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-[#222831] transition duration-200 rounded shadow-md bg-[#393E46] hover:bg-[#222831] hover:text-white focus:shadow-outline focus:outline-none ${isActive('/login') ? 'bg-[#222831] text-white' : ''}`}
                          aria-label="Login"
                          title="Login"
                        >
                          {isAuthenticated ? (
                            <button onClick={() => logout({ returnTo: window.location.origin })}>
                              Logout
                            </button>
                          ) : (
                            <p>Login</p>
                          )}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
