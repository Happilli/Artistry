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
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
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
    if (selectedCategory === "all") {
      setFilteredSketches(sketches);
    } else {
      const fetchSketchesByCategory = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/sketches/category/${selectedCategory}`
          );
          setFilteredSketches(response.data.sketches);
        } catch (error) {
          console.error("Error fetching sketches by category:", error);
          setFilteredSketches([]);
        }
      };
      fetchSketchesByCategory();
    }
  }, [selectedCategory, sketches]);

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
      <div className="py-16 px-6 bg-[#f5f5f5] min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-[#ba1f2a]">All Artworks</h2>
          <select
            className="mt-4 sm:mt-0 px-4 py-2 border-2 border-[#ba1f2a] text-[#ba1f2a] bg-white rounded-md shadow-md text-sm font-semibold cursor-pointer hover:bg-[#ba1f2a] hover:text-white transition"
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
        </div>
        {loading ? (
          <p className="text-center text-lg text-gray-700">
            Loading artworks...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">{error}</p>
        ) : filteredSketches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredSketches.map((sketch) => (
              <div
                key={sketch._id}
                className="bg-white border-2 border-[#ba1f2a] rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 hover:shadow-lg"
              >
                <img
                  src={`data:image/png;base64,${sketch.image}`}
                  alt={sketch.name}
                  className="w-full h-90 object-cover rounded-t-lg"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#ba1f2a] truncate">
                    {sketch.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
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
                        size={24}
                        weight={i < sketch.quality ? "fill" : "regular"}
                        className="text-[#ba1f2a]"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/sketch/${sketch.special_id}`)}
                    className="mt-4 px-4 py-2 w-full bg-[#ba1f2a] text-white rounded-md text-sm font-semibold transition hover:bg-white hover:text-[#ba1f2a] hover:shadow-md border border-[#ba1f2a]"
                  >
                    View Details
                  </button>
                  {accessToken && (
                    <button
                      onClick={() => handleDelete(sketch.special_id)}
                      className="mt-4 px-4 py-2 w-full bg-red-600 text-white rounded-md text-sm font-semibold transition transform hover:bg-red-700 hover:scale-105"
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
    </Layout>
  );
};

export default Artworks;
