import React from "react";

const FillJob = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl">My Application Form</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <form className="max-w-md mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div className="text-center">
              <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="Name"
                className="input-field"
                style={{ width: "100%" }}
                placeholder="Sahil Bharti"
                required
              />
            </div>

            {/* Email address */}
            <div className="text-center">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                style={{ width: "100%" }}
                placeholder="john.doe@company.com"
                required
              />
            </div>

            {/* GitHub Profile */}
            <div className="text-center">
              <label htmlFor="github" className="block mb-2 text-sm font-medium text-gray-900">
                GitHub Profile
              </label>
              <input
                type="url"
                id="github"
                className="input-field"
                style={{ width: "100%" }}
                placeholder="github.com/yourprofile"
                required
              />
            </div>

            {/* Resume (PDF) */}
            <div className="text-center">
              <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900">
                Resume (PDF)
              </label>
              <input
                type="file"
                id="resume"
                accept="application/pdf"
                className="input-field"
                required
              />
            </div>

            {/* CV Picture */}
            <div className="text-center">
              <label htmlFor="cv" className="block mb-2 text-sm font-medium text-gray-900">
                CV Picture
              </label>
              <input
                type="file"
                id="cv"
                accept="image/*"
                className="input-field"
                required
              />
            </div>

            {/* Terms and conditions checkbox */}
            <div className="flex items-start text-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">
                I agree with the{" "}
                <a href="#" className="text-blue-600 hover:underline">
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
