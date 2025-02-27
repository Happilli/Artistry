import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const { accessToken } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Banner Section */}
      <div className="bg-red-600 text-white font-bold text-center py-2">
        <div className="container mx-auto">
          <p className="text-lg">Explore my manga and artwork collection!</p>
        </div>
      </div>

      {/* Header Section */}
      <header className="sticky top-0 z-50 py-4 backdrop-blur-lg bg-white/30 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-red-600 transition-colors duration-300">
            <Link to="/">Safal's Art</Link>
          </h1>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navigation */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white/90 md:bg-transparent backdrop-blur-lg lg:backdrop-blur-none shadow-lg md:shadow-none  transition-all duration-300 ease-in-out`}
          >
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-0">
              {["Home", "Manga", "Artworks", "About"].map((item, idx) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}/`;
                const isActive = location.pathname === path;
                return (
                  <li key={idx}>
                    <Link
                      to={path}
                      className={`text-gray-800 text-lg font-medium relative group transition-all duration-300 ease-in-out hover:text-red-600 ${
                        isActive ? "text-red-600" : ""
                      }`}
                    >
                      {item}
                      {/* Active link indicator */}
                      <span
                        className={`block w-0 h-0.5 bg-red-600 transition-all duration-500 ease-in-out group-hover:w-full mt-1 ${
                          isActive ? "w-full" : ""
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}

              {/* Conditionally render "Dashboard" link */}
              {accessToken && (
                <li>
                  <Link
                    to="/dashboard"
                    className={`text-gray-800 text-lg font-medium relative group transition-all duration-300 ease-in-out hover:text-red-600 ${
                      location.pathname === "/dashboard" ? "text-red-600" : ""
                    }`}
                  >
                    Dashboard
                    {/* Active link indicator */}
                    <span
                      className={`block w-0 h-0.5 bg-red-600 transition-all duration-500 ease-in-out group-hover:w-full mt-1 ${
                        location.pathname === "/dashboard" ? "w-full" : ""
                      }`}
                    ></span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
