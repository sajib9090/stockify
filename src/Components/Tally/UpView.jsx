import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter";

const UpView = () => {
  return (
    <div className="flex justify-between gap-6">
      {/* Total Due */}
      <div className="bg-white p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Due
          </span>
        </div>
        <div className="text-3xl font-bold text-slate-900 mb-1">
          <CurrencyFormatter value={0} />
        </div>
        <div className="flex items-center text-xs text-red-600">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Pending payment
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Amount
          </span>
        </div>
        <div className="text-3xl font-bold text-slate-900 mb-1">
          <CurrencyFormatter value={0} />
        </div>
        <div className="flex items-center text-xs text-green-600">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Total collected
        </div>
      </div>
    </div>
  );
};

export default UpView;
