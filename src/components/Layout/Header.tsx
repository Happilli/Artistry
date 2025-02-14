import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <>
      {/* Upper Navbar */}
      <div className="bg-red-600 text-white font-bold py-3 text-center">
        <div className="container mx-auto">
          <p className="text-lg">Explore my manga and artwork collection!</p>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white sticky top-0 z-50 py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo (Bigger Text and Shifted Left) */}
          <h1 className="text-4xl font-bold text-gray-800 ml-6">Safal's Art</h1>

          {/* Navigation Links (Bigger Links & Adjusted Spacing) */}
          <nav>
            <ul className="flex gap-8">
              {["Home", "Manga", "Artworks", "About"].map((item, idx) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}/`;
                const isActive = location.pathname === path;
                return (
                  <li key={idx}>
                    <Link
                      to={path}
                      className={`text-gray-800 text-lg relative group transition duration-350 ease-in-out ${
                        isActive ? "text-red-600" : ""
                      }`}
                    >
                      {item}
                      <span
                        className={`block w-0 h-0.5 bg-red-600 transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-0.5 mt-1 ${
                          isActive ? "w-0" : ""
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
