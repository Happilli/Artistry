import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";

const Babeski: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );
      const { access_token } = response.data;
      setAccessToken(access_token);
      navigate("/dashboard");
      toast.success("Login successful! Redirecting to dashboard...");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Layout
      title="Babeski | Artistry"
      description="Babeski: Exclusive access for the creator"
      author="Safal Lama"
      keywords="babeski, creator access"
    >
      <div className="flex h-screen w-full bg-white">
        <div className="flex flex-col justify-center items-center w-full text-center space-y-8">
          <h2 className="text-[6rem] md:text-[8rem] font-bold text-[#ba1f2a]">
            Creator Access Only
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 mt-8 border-4 border-[#ba1f2a] p-8 rounded-lg"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 border-2 border-[#ba1f2a] text-[#ba1f2a] rounded-md text-lg w-80"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-6 py-4 border-2 border-[#ba1f2a] text-[#ba1f2a] rounded-md text-lg w-80"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-transparent border-2 border-[#ba1f2a] text-[#ba1f2a] rounded-md text-lg font-semibold transition-all transform hover:bg-[#ba1f2a] hover:text-white hover:scale-105 shadow-lg mt-6"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Babeski;
