import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { X, Plus } from "@phosphor-icons/react";

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
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
      <section className="py-16 px-8 bg-white text-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-5xl font-semibold text-center text-[#ba1f2a] mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {[
            {
              question: "What type of art do you create?",
              answer:
                "I specialize in manga-style digital illustrations, concept art, and sketches. Each piece captures my unique style, blending creativity with a deep passion for storytelling.",
            },
            {
              question: "How can I purchase your artwork?",
              answer:
                "To purchase my artwork, simply visit the 'Explore' section where you can view and select the pieces you're interested in. Each piece has an option to purchase as a print or digital download.",
            },
            {
              question: "Do you accept custom commissions?",
              answer:
                "Yes, I accept custom commissions! You can reach out to me through the 'Contact' section for details on pricing, timelines, and any special requests you have for your custom artwork.",
            },
            {
              question: "Can I share your artwork on social media?",
              answer:
                "Yes! You are welcome to share my artwork on social media as long as you credit me (@happilli). Feel free to tag me so I can see your posts!",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <button
                onClick={() => toggleAnswer(idx)}
                className="w-full text-left px-8 py-5 bg-white text-xl font-semibold text-gray-800 flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#f5f5f5] focus:outline-none"
              >
                {faq.question}
                <span
                  className={`text-xl transform transition-all duration-300 ${
                    openIndex === idx ? "rotate-90" : ""
                  }`}
                >
                  {openIndex === idx ? <X size={24} /> : <Plus size={24} />}
                </span>
              </button>
              {openIndex === idx && (
                <div className="max-h-[300px] overflow-hidden bg-white p-6 text-gray-700 transition-all duration-300 ease-in-out">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
