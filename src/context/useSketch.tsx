import { useContext } from "react";
import { SketchesContext } from "../context/SketchContext";

export const useSketch = () => {
  const context = useContext(SketchesContext);
  if (!context) {
    throw new Error("useSketch must be used within a SketchProvider");
  }
  return context;
};
