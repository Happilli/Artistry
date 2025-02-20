import React from "react";

const MangaDashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-semibold text-[#ba1f2a] mb-6">
        Manga Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 border-4 border-[#ba1f2a] rounded-lg max-w-xl w-full">
        <p className="text-lg text-gray-600 mb-4">
          The Manga Dashboard feature is currently{" "}
          <strong>under development</strong> and will be available soon.
        </p>
        <p className="text-lg text-gray-600">
          Stay tuned for updates and new features!
        </p>
      </div>
    </div>
  );
};

export default MangaDashboard;
