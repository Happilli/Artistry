import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Star } from "@phosphor-icons/react";
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
        <div className="flex justify-center items-center py-16">
          <p className="text-xl">Loading sketch details...</p>
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
      <div className="bg-[#f5f5f5] min-h-screen">
        {error ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : sketch ? (
          <div className="flex flex-row justify-center py-16 px-8">
            <div className="flex-shrink-0 w-1/3">
              <img
                src={`data:image/png;base64,${sketch.image}`}
                alt={sketch.name}
                className="w-full h-auto rounded-lg object-cover border-4 border-[#ba1f2a]"
              />
            </div>
            <div className="flex flex-col ml-16 w-2/3">
              <h2 className="text-5xl font-semibold text-[#ba1f2a]">
                {sketch.name}
              </h2>
              <p className="text-lg text-gray-700 mt-4">{sketch.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Category:</strong> {sketch.category}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Created On:</strong>{" "}
                {new Date(sketch.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Special ID:</strong> {sketch.special_id}
              </p>
              <div className="flex mt-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={32}
                    weight={i < sketch.quality ? "fill" : "regular"}
                    className="text-[#ba1f2a]"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-16">
            <p className="text-xl text-gray-700">No sketch found.</p>
          </div>
        )}

        <div className="flex justify-center py-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#ba1f2a] text-white rounded-lg hover:bg-[#9a1b1e]"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SketchDetail;
