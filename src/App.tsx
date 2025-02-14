import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        {/* pulbicroutes */}
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
