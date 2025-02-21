import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Babeski from "./pages/Auth/Babeski";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Dashboard from "./pages/Safal/Dashboard";
import MangaDashboard from "./pages/Safal/MangaDashboard";
import SketchDashboard from "./pages/Safal/SketchDashboard";
import SketchDetail from "./pages/SketchDetail";

const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    setProgress(50);
    const timer = setTimeout(() => setProgress(100), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <LoadingBar
        color="#000000"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* SketchDetail route */}
        <Route path="/sketch/:special_id" element={<SketchDetail />} />

        {/* Authentication Route */}
        <Route path="/babeski" element={<Babeski />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="manga" element={<MangaDashboard />} />
            <Route path="sketch" element={<SketchDashboard />} />
          </Route>
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
