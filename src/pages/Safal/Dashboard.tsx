import React from "react";
import Layout from "../../components/Layout/Layout";

const Dashboard: React.FC = () => {
  return (
    <Layout
      title="Dashboard | Artistry - Exclusive Access for Creators"
      description="Welcome to your personalized dashboard, where you can manage your content, track your growth, and access exclusive tools."
      author="Safal Lama"
      keywords="creator dashboard, content management, Babeski dashboard, creator tools, artist tools, creator growth"
    >
      <div className="h-screen flex justify-center items-center bg-white">
        <h1 className="text-4xl font-bold text-[#ba1f2a]">
          Welcome to your Dashboard!
        </h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
