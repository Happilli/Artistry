import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Star } from "@phosphor-icons/react";
import { useSketch } from "../context/useSketch";

const Home: React.FC = () => {
  const { sketches, loading, error } = useSketch();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Layout
      title="Home - Artistry | Explore Manga, Sketches & Digital Art"
      description="Welcome to Artistry, a world of manga, sketches, and digital illustrations. Explore my portfolio and discover unique art pieces."
      author="Safal Lama"
      keywords="manga art, digital sketches, illustrations, artwork, Safal Lama, Artistry"
    >
      {/* Hero Section */}
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
              zIndex: 20,
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
            }}
          >
            SAFAL
          </h1>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white text-center"
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
            }}
          >
            ARTS
          </h1>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white text-left"
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
      {/* Featured Sketches */}
      <div className="py-20 px-4 sm:px-8 bg-[#f5f5f5]">
        <h2 className="text-5xl font-bold text-center text-[#ba1f2a] mb-12">
          Featured Sketches
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#ba1f2a] rounded-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 bg-gray-200 rounded-full mr-2"
                      ></div>
                    ))}
                  </div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-lg text-red-500 font-medium">
            {error}
          </p>
        ) : sketches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {sketches.map((sketch) => (
              <div
                key={sketch._id}
                className="bg-white border-2 border-[#ba1f2a] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`data:image/png;base64,${sketch.image}`}
                  alt={sketch.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#ba1f2a] mb-2">
                    {sketch.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Category:</strong> {sketch.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Created On:</strong>{" "}
                    {new Date(sketch.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Special ID:</strong> {sketch.special_id}
                  </p>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={24}
                        weight={i < sketch.quality ? "fill" : "regular"}
                        className="text-[#ba1f2a]"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/sketch/${sketch.special_id}`)}
                    className="w-full px-6 py-3 bg-[#ba1f2a] text-white rounded-md text-sm font-semibold transition-all hover:bg-[#1a171c] hover:scale-105 transform"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-700">
            No sketches available yet.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
