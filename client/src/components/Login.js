import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  const determineUserRole = (user1) => {
    const userRole = user1; // if user is employee or candidate
    localStorage.setItem("userRole", userRole); // Store user role in local storage
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex flex-col lg:h-screen">
      {!isAuthenticated && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start mt-8 md:mt-16 mx-4 md:mx-32">
            <div className="text-left flex-1 mb-8 md:mb-0">
              <h1 className="text-green-600 text-2xl font-bold mb-4">
                INDIA’S #1 JOB PLATFORM
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
                Your job search ends here.
              </h2>
              <p className="text-xl font-bold text-black">
                Discover a variety of career opportunities!
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-auto md:mx-0"
              style={{ width: "250px", height: "250px", borderRadius: "10px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)" }}
            >
              <h2 className="text-2xl font-bold mb-4">Candidate Login</h2>
              <p className="mb-4">Searching for a job?</p>
              <button
                className="text-black-700 hover:text-white border border-black-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
                onClick={() => {
                  loginWithRedirect();
                  determineUserRole("candidate");
                }}
              >
                Login as Candidate
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mt-8 mb-8 md:mt-16 mx-4 md:mx-32">
            <div className="text-left flex-1 mb-8 mt-12 md:mb-0">
              <h1 className="text-green-600 text-2xl font-bold mb-4">
                INDIA’S #1 HIRING PLATFORM
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
                Find the right candidates.
              </h2>
              <p className="text-xl font-bold text-black">
                Trusted by 100+ fortune 500 companies!
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-auto md:mx-0 md:ml-16"
              style={{ width: "250px", height: "250px", borderRadius: "10px", boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)" }}
            >
              <h2 className="text-2xl font-bold mb-4">Employer Login</h2>
              <p className="mb-4">Want to post a job?</p>
              <button
                className="text-black-700 hover:text-white border border-black-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
                onClick={() => {
                  loginWithRedirect();
                  determineUserRole("employer");
                }}
              >
                Login as Employer
              </button>
            </div>
          </div>
        </>
      )}

      {isAuthenticated && (
        <div className="flex justify-center mt-16 mx-4 md:mx-0 h-screen">
          <div
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            }}
          >
            <h2 className="text-xl font-bold mb-4">Are you sure? 🤨</h2>
            <button
              className="text-black-700 hover:text-white border border-black-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-900"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
