import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="About - Artistry | I Develop Art"
      description="Learn more about the artist behind Artistry. Passionate about art, manga, and creative sketches."
      author="Safal Lama"
      keywords="about artistry, artist portfolio, digital art, sketches, manga artist"
    >
      <div className="flex h-screen w-full bg-white">
        {/* Centered Content */}
        <div className="flex flex-col justify-center items-center w-full text-center space-y-8">
          <h1 className="text-[5rem] md:text-[7rem] font-bold text-black">
            About
          </h1>
          <h2 className="text-[6rem] md:text-[8rem] font-bold text-[#ba1f2a]">
            I Develop Art
          </h2>
          <div className="flex justify-center gap-8 mt-10">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-transparent border-2 border-[#ba1f2a] text-[#ba1f2a] rounded-md text-lg font-semibold transition-all transform hover:bg-[#ba1f2a] hover:text-white hover:scale-105 shadow-lg"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
