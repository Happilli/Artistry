import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Star } from "@phosphor-icons/react";
import { useSketch } from "../../context/useSketch";

const Artworks: React.FC = () => {
  const { sketches, loading, error } = useSketch();
  const navigate = useNavigate();

  return (
    <Layout
      title="Artworks - Artistry | Explore All Sketches"
      description="Explore all sketches and artworks in Artistry's portfolio."
      author="Safal Lama"
      keywords="artworks, sketches, digital art, portfolio, Safal Lama"
    >
      <div className="py-16 px-8 bg-[#f5f5f5]">
        <h2 className="text-4xl font-bold text-center text-[#ba1f2a] mb-12">
          All Artworks
        </h2>

        {loading ? (
          <p className="text-center text-lg text-gray-700">
            Loading artworks...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : sketches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sketches.map((sketch) => (
              <div
                key={sketch._id}
                className="bg-white border-2 border-[#ba1f2a] rounded-lg shadow-lg"
              >
                <img
                  src={`data:image/png;base64,${sketch.image}`}
                  alt={sketch.name}
                  className="w-full h-72 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#ba1f2a] truncate">
                    {sketch.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Category:</strong> {sketch.category}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Created On:</strong>{" "}
                    {new Date(sketch.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Special ID:</strong> {sketch.special_id}
                  </p>
                  <div className="flex mt-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={28}
                        weight={i < sketch.quality ? "fill" : "regular"}
                        className="text-[#ba1f2a]"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/sketch/${sketch.special_id}`)}
                    className="mt-4 px-4 py-2 bg-[#ba1f2a] text-white rounded-md text-sm font-semibold transition-all hover:bg-white hover:text-[#ba1f2a] hover:shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-700">
            No artworks available.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Artworks;
