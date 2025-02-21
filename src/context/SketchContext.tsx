import { createContext } from "react";

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

export interface SketchesContextType {
  sketches: Sketch[];
  loading: boolean;
  error: string | null;
  fetchSketchById: (special_id: string) => Promise<void>;
  sketch: Sketch | null;
}

export const SketchesContext = createContext<SketchesContextType | undefined>(
  undefined
);
