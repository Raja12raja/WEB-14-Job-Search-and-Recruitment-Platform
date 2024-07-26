import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Completeprofile = () => {
  const [Linkedin, setLinkedin] = useState("");
  const [Github, setGithub] = useState("");
  const [Aboutme, setAboutme] = useState(""); 
  const [Experience, setExperience] = useState("");
  const navigate = useNavigate();
  const { id: CId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Assuming you want to use this for loading state

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await Axios.get(`http://localhost:5000/GetCById/${CId}`);

      await Axios.post("http://localhost:5000/C", {
        Linkedin,
        Github,
        Aboutme,
        Experience,
        CId,
      });

      alert("Profile completed successfully");
      navigate('/');
    } catch (error) {
      alert("Error completing profile");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-[#EEEEEE] min-h-screen bg-cover bg-center">
      <nav className="bg-[#EEEEEE] py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-black font-bold text-2xl">Complete profile</h1>
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
                htmlFor="Linkedin"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Linkedin
              </label>
              <input
                type="url"
                value={Linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.linkedin.com/in"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Github"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Github Profile
              </label>
              <input
                type="url"
                value={Github}
                onChange={(e) => setGithub(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="github.com/yourprofile"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Aboutme"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                About Me
              </label>
              <textarea
                value={Aboutme}
                onChange={(e) => setAboutme(e.target.value)}
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself"
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
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your experience"
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
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>.
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
    </div>
  );
};

export default Completeprofile;

