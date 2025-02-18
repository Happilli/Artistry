import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout
      title="Home - Artistry | Explore Manga, Sketches & Digital Art"
      description="Welcome to Artistry, a world of manga, sketches, and digital illustrations. Explore my portfolio and discover unique art pieces."
      author="Safal Lama"
      keywords="manga art, digital sketches, illustrations, artwork, Safal Lama, Artistry"
    >
      <div className="flex h-screen w-full overflow-hidden">
        <div className="w-full md:w-1/2 bg-[#ba1f2a] flex justify-center items-center relative">
          <img
            src="/assets/hero.png"
            alt="Hero"
            className="absolute top-0 left-1/2 w-full h-auto object-cover opacity-30"
            style={{
              transform: `translateY(${
                scrollY * 0.4
              }px) translateX(20%) scaleX(-1)`,
              transition: "transform 0.1s ease-out",
              zIndex: 500,
            }}
          />
          <h1
            className="text-[10rem] md:text-[12rem] font-bold text-black relative"
            style={{
              marginLeft: "10vw",
              marginTop: "-50vh",
              fontFamily: "Poppins, sans-serif",
              transform: `translateY(${scrollY * 0.8}px)`,
              transition: "transform 0.1s ease-out",
              zIndex: 60,
            }}
          >
            SAFAL
          </h1>
          <div
            className="absolute top-2/4 left-1/2 transform -translate-x-1/2 text-white z-60 text-center"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <p className="text-xl mb-4">
              Discover the world of manga, arts, and sketches.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/explore")}
                className="px-6 py-3 bg-black text-white rounded-md text-lg font-semibold transition-all hover:bg-[#1a171c]"
              >
                Explore More
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 bg-transparent border-2 border-black text-black rounded-md text-lg font-semibold transition-all hover:bg-black hover:text-white"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#1a171c] flex justify-center items-center relative">
          <h1
            className="text-[10rem] md:text-[12rem] font-bold text-white relative"
            style={{
              textShadow:
                "1px 1px 0px #ba1f2a, -1px -1px 0px #ba1f2a, 1px -1px 0px #ba1f2a, -1px 1px 0px #ba1f2a",
              marginLeft: "-12vw",
              marginTop: "-50vh",
              fontFamily: "Poppins, sans-serif",
              transform: `translateY(${scrollY * 0.6}px)`,
              transition: "transform 0.1s ease-out",
              zIndex: 20,
            }}
          >
            ARTS
          </h1>
          <div
            className="absolute top-2/4 left-1/2 transform -translate-x-1/2 text-white z-60 text-left"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <p className="text-xl">
              Drawing My Way Through Life, Masterpieces or Just Doodles? You
              Decide...
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 px-8 bg-[#f5f5f5]">
        <h2 className="text-4xl font-bold text-center text-[#ba1f2a] mb-8">
          Featured Sketches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {["manga1", "manga2", "art1", "sketch1"].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#ba1f2a] rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:border-[#d4a1a6]"
            >
              <img
                src={`/assets/${item}.jpg`}
                alt={`Item ${idx + 1}`}
                className="w-full h-72 object-cover transform transition-all duration-300 hover:scale-105"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h3 className="text-2xl font-semibold text-[#ba1f2a]">{`Title ${
                  idx + 1
                }`}</h3>
                <p className="text-lg mt-2 text-gray-700">
                  Short description or excerpt here.
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(`/details/${item}`)}
                    className="px-4 py-2 bg-[#ba1f2a] text-white rounded-md text-sm font-semibold mt-4 transition-all hover:bg-[#d4a1a6]"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
