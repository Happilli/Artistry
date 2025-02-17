import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Babeski from "./pages/Auth/Babeski";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Dashboard from "./pages/Safal/Dashboard";
function App() {
  const NoMatch = () => {
    return <NotFound />;
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* gateway */}
        <Route path="/babeski" element={<Babeski />} />

        {/* myroutealone */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* pulbicroutes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* Catch-All Route */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
