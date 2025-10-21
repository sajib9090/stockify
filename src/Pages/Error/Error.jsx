const Error = () => {
  return (
    <div className="max-w-md mx-auto p-4 min-h-screen">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <svg
          className="w-16 h-16 text-slate-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-slate-700 font-semibold">Failed to data</p>
      </div>
    </div>
  );
};

export default Error;
