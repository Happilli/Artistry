import React, { useState, useEffect } from "react";
import axios from "axios";
import { SketchesContext } from "./SketchContext";

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

export const SketchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/sketches/pollute`
        );
        const latestSketches = data.sketches
          .sort(
            (a: Sketch, b: Sketch) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 4);
        setSketches(latestSketches);
      } catch (error) {
        setError("Failed to fetch sketches.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSketches();
  }, []);

  const fetchSketchById = async (special_id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/sketches/getsketch/${special_id}`
      );
      setSketch(data.sketch);
    } catch (error) {
      setError("Failed to fetch sketch details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SketchesContext.Provider
      value={{ sketches, loading, error, fetchSketchById, sketch }}
    >
      {children}
    </SketchesContext.Provider>
  );
};
