import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Dashboard: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white text-black p-6 space-y-6 shadow-lg flex flex-col justify-center">
          <ul className="space-y-6">
            <li>
              <Link
                to="/dashboard/sketch"
                className={`block py-4 px-6 text-xl transition-colors relative ${
                  activeLink === "sketch" ? "text-[#ba1f2a]" : "text-black"
                }`}
                onClick={() => handleLinkClick("sketch")}
              >
                Sketch
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-[#ba1f2a] transform scale-x-0 origin-left transition-all duration-300 ${
                    activeLink === "sketch"
                      ? "scale-x-100"
                      : "group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manga"
                className={`block py-4 px-6 text-xl transition-colors relative ${
                  activeLink === "manga" ? "text-[#ba1f2a]" : "text-black"
                }`}
                onClick={() => handleLinkClick("manga")}
              >
                Manga
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-[#ba1f2a] transform scale-x-0 origin-left transition-all duration-300 ${
                    activeLink === "manga"
                      ? "scale-x-100"
                      : "group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 overflow-auto bg-white rounded-lg shadow-xl">
          {/* Default Content (When no link is clicked) */}
          {activeLink === "" && (
            <div className="text-center text-lg text-gray-700">
              <h3 className="text-4xl font-extrabold text-[#ba1f2a] mb-6">
                Welcome to Your Dashboard!
              </h3>
              <p className="text-2xl mb-6">
                Get started by choosing an option below.
              </p>
              <p className="text-xl text-gray-600 mb-4">
                Here, you can manage and upload your sketches and manga. Choose
                "Sketch" or "Manga" from the menu on the left to begin.
              </p>
              <p className="text-xl text-gray-600">
                Keep track of your content, and explore new possibilities!
              </p>
            </div>
          )}

          {/* Render Outlet for selected content */}
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
