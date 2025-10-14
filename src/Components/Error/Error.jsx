import React from "react";

const Error = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-sm">
        <p className="text-gray-900 font-semibold">Error loading data</p>
        <p className="text-gray-600 text-sm mt-2">{error?.message}</p>
      </div>
    </div>
  );
};

export default Error;
