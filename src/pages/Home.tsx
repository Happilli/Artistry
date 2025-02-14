import React from "react";
import Layout from "../components/Layout/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Safallama</h1>
          <p>Your journey to art begins here</p>
          <button className="hero-button">Get Started</button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
