import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Star } from "@phosphor-icons/react";
import { useSketch } from "../../context/useSketch";
import { useAuth } from "../../context/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Artworks: React.FC = () => {
  const { sketches, loading, error } = useSketch();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedQuality, setSelectedQuality] = useState<string>("all");
  const [filteredSketches, setFilteredSketches] = useState(sketches);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/sketches/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = sketches;

    // Apply category filter if selected
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (sketch) => sketch.category === selectedCategory
      );
    }

    // Apply quality filter if selected
    if (selectedQuality !== "all") {
      const qualityValue = parseInt(selectedQuality);
      filtered = filtered.filter((sketch) => sketch.quality === qualityValue);
    }

    setFilteredSketches(filtered);
  }, [selectedCategory, selectedQuality, sketches]);

  const handleDelete = async (specialId: string) => {
    if (!accessToken) {
      toast.error("You don't have permission to delete this sketch.");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/sketches/delete/${specialId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Sketch deleted successfully!");
      setFilteredSketches(
        filteredSketches.filter((sketch) => sketch.special_id !== specialId)
      );
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error deleting sketch";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout
      title="Artworks - Artistry | Explore All Sketches"
      description="Explore all sketches and artworks in Artistry's portfolio."
      author="Safal Lama"
      keywords="artworks, sketches, digital art, portfolio, Safal Lama"
    >
      <div className="py-16 px-6 bg-[#f8f8f8] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-[#ba1f2a] mb-6 sm:mb-0">
              All Artworks
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ba1f2a] focus:border-[#ba1f2a] transition"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Quality Filter */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ba1f2a] focus:border-[#ba1f2a] transition"
                onChange={(e) => setSelectedQuality(e.target.value)}
                value={selectedQuality}
              >
                <option value="all">All Qualities</option>
                {[1, 2, 3, 4, 5].map((quality) => (
                  <option key={quality} value={quality.toString()}>
                    {quality} Stars
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-lg text-gray-700">
              Loading artworks...
            </p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : filteredSketches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSketches.map((sketch) => (
                <div
                  key={sketch._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200 hover:shadow-xl"
                >
                  <img
                    src={`data:image/png;base64,${sketch.image}`}
                    alt={sketch.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#ba1f2a] truncate mb-2">
                      {sketch.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Category:</strong> {sketch.category}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Created On:</strong>{" "}
                      {new Date(sketch.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Special ID:</strong> {sketch.special_id}
                    </p>
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          weight={i < sketch.quality ? "fill" : "regular"}
                          className="text-[#ba1f2a]"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/sketch/${sketch.special_id}`)}
                      className="w-full px-4 py-2 bg-[#ba1f2a] text-white rounded-md text-sm font-semibold transition hover:bg-[#9e1a22] focus:outline-none focus:ring-2 focus:ring-[#ba1f2a] focus:ring-offset-2"
                    >
                      View Details
                    </button>
                    {accessToken && (
                      <button
                        onClick={() => handleDelete(sketch.special_id)}
                        className="w-full px-4 py-2 mt-2 bg-red-600 text-white rounded-md text-sm font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    )}
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
      </div>
    </Layout>
  );
};

export default Artworks;
