import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="404 Not Found - Artistry"
      description="The page you are looking for does not exist. Return to the homepage or contact us for assistance."
      author="Safal Lama"
      keywords="404 error, page not found, missing page, broken link"
    >
      <div className="flex h-screen w-full bg-white">
        {/* Centered Content */}
        <div className="flex flex-col justify-center items-center w-full text-center space-y-6">
          <h1 className="text-[6rem] md:text-[8rem] font-bold text-[#ba1f2a]">
            OOPS!
          </h1>
          <h2 className="text-[3rem] md:text-[4rem] font-semibold text-[#1a171c]">
            ERROR 404
          </h2>
          <p className="text-xl text-[#1a171c] max-w-lg mx-auto mb-8">
            The page you're looking for does not exist. It seems to have
            vanished into the unknown.
          </p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#ba1f2a] text-white rounded-md text-lg font-semibold transition-all hover:bg-[#d4a1a6]"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-transparent border-2 border-[#ba1f2a] text-[#ba1f2a] rounded-md text-lg font-semibold transition-all hover:bg-[#ba1f2a] hover:text-white"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
