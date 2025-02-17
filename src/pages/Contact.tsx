import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Contact - Artistry | Get in Touch"
      description="Have questions or inquiries? Contact the artist behind Artistry via email at yoyuehapy@gmail.com."
      author="Safal Lama"
      keywords="contact artistry, reach out, artist contact, email artist, art inquiries"
    >
      <div className="flex h-screen w-full bg-white">
        {/* Centered Content */}
        <div className="flex flex-col justify-center items-center w-full text-center space-y-8 px-4 py-8">
          <h1 className="text-[4rem] md:text-[6rem] font-bold text-black">
            Contact Me
          </h1>
          <h2 className="text-xl text-[#1a171c] max-w-lg mx-auto mb-8">
            If you have any questions or concerns, feel free to reach out to me
            at{" "}
            <a
              href="mailto:yoyuehapy@gmail.com"
              className="text-[#ba1f2a] hover:underline"
            >
              yoyuehapy@gmail.com
            </a>
          </h2>
          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-[#ba1f2a] text-white rounded-md text-lg font-semibold transition-all transform hover:bg-[#d4a1a6] hover:scale-105 shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
