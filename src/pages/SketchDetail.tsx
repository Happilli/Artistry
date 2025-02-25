import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Star, ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";

interface Sketch {
  _id: string;
  name: string;
  quality: number;
  description: string;
  image: string;
  category: string;
  special_id: string;
  created_at: string;
}

const SketchDetail: React.FC = () => {
  const { special_id } = useParams<{ special_id: string }>();
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchSketch = useCallback(async () => {
    if (special_id) {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/sketches/getsketch/${special_id}`
        );
        setSketch(data.sketch);
      } catch (err) {
        setError("Failed to fetch sketch details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [special_id]);

  useEffect(() => {
    fetchSketch();
  }, [fetchSketch]);

  if (loading) {
    return (
      <Layout
        title="Loading... - Artistry | Sketch Details"
        description="Loading sketch details"
        author="Safal Lama"
        keywords="loading, sketch, artwork, details, digital art"
      >
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0]">
          <p className="text-xl text-gray-700 animate-pulse">
            Loading sketch details...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${sketch?.name} - Artistry | Sketch Details`}
      description={
        sketch?.description || "View the full details of the selected sketch."
      }
      author="Safal Lama"
      keywords={`${sketch?.name}, sketch, artwork, details, digital art`}
    >
      <div className="bg-gradient-to-r from-[#f5f5f5] to-[#e0e0e0] min-h-screen py-12">
        {error ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : sketch ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8">
                  <img
                    src={`data:image/png;base64,${sketch.image}`}
                    alt={sketch.name}
                    className="w-full h-auto rounded-lg object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-5xl font-bold text-[#ba1f2a] mb-4">
                    {sketch.name}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {sketch.description}
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      <strong>Category:</strong> {sketch.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Created On:</strong>{" "}
                      {new Date(sketch.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Special ID:</strong> {sketch.special_id}
                    </p>
                  </div>
                  <div className="flex mt-6">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={32}
                        weight={i < sketch.quality ? "fill" : "regular"}
                        className="text-[#ba1f2a] mr-2"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-gray-700">No sketch found.</p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#ba1f2a] text-white rounded-lg hover:bg-[#9a1b1e] transition-colors duration-300 flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SketchDetail;
