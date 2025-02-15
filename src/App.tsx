import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  const NoMatch = () => {
    return <NotFound />;
  };
  return (
    <>
      <Routes>
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
