import React from "react";

const FillJob = () => {
  return (
    <div
      className="bg-orange-100 min-h-screen bg-cover bg-center"
      
    >
      {/* Navbar */}
      <nav className="bg-orange-200 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-black font-bold text-2xl">My Application Form</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="Name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sahil Bharti"
                required
              />
            </div>

            {/* Email address */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@company.com"
                required
              />
            </div>

            {/* GitHub Profile */}
            <div>
              <label
                htmlFor="github"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="github.com/yourprofile"
                required
              />
            </div>

            {/* Resume (PDF) */}
            <div>
              <label
                htmlFor="resume"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Resume (PDF)
              </label>
              <input
                type="file"
                id="resume"
                accept="application/pdf"
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* CV Picture */}
            <div>
              <label
                htmlFor="cv"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                CV Picture
              </label>
              <input
                type="file"
                id="cv"
                accept="image/*"
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Terms and conditions checkbox */}
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

            {/* Submit button */}
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
              >
              Submit 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FillJob;
