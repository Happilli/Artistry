import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <>
      {/* Banner Section */}
      <div className="bg-red-600 text-white font-bold py-3 text-center">
        <div className="container mx-auto">
          <p className="text-lg">Explore my manga and artwork collection!</p>
        </div>
      </div>

      {/* Header Section */}
      <header className="sticky top-0 z-30 py-4 m-0 backdrop-blur-md bg-white/30">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-gray-800 ml-6">Safal's Art</h1>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-8">
              {["Home", "Manga", "Artworks", "About"].map((item, idx) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}/`;
                const isActive = location.pathname === path;
                return (
                  <li key={idx}>
                    <Link
                      to={path}
                      className={`text-gray-800 text-lg relative group transition-all duration-350 ease-in-out ${
                        isActive ? "text-red-600" : ""
                      }`}
                    >
                      {item}
                      {/* Active link indicator */}
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
