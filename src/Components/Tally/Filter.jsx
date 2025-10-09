import { useState } from "react";

const Filter = ({ handleSearch, searchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleDownload = () => {
    console.log("Download clicked");
  };

  return (
    <div className="flex justify-between items-center p-2 bg-white lg:gap-4 gap-2">
      {/* Left Side - Search */}
      <div className="relative flex items-center">
        <label
          className={`absolute left-3 bg-white px-1 pointer-events-none transition-all ${
            isFocused || searchTerm
              ? "-top-2 text-xs text-[#009099]"
              : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
          }`}
        >
          Search...
        </label>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch} // 👈 Use the function
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pr-4 border border-slate-200 rounded-md text-sm text-slate-900 lg:w-72 w-48 focus:outline-none focus:border-[#009099] focus:ring-1 focus:ring-[#009099] transition-all ${
            isFocused || searchTerm ? "pl-4" : "pl-10"
          } py-2`}
        />
      </div>

      {/* Right Side - Filter and Download */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 hover:text-[#009099] transition-all">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 hover:text-green-500 transition-all"
          onClick={handleDownload}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Filter;
