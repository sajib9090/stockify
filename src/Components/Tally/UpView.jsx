import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter";

const UpView = ({ totalReceivable, totalPayable }) => {
  return (
    <div className="flex justify-between gap-6">
      {/* Total Due */}
      <div className="bg-white p-5 hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-light text-gray-500 uppercase tracking-wider">
            Total Due
          </span>
        </div>
        <div className="text-lg md:text-xl lg:text-3xl font-light text-gray-900 mb-1">
          <CurrencyFormatter value={totalPayable} />
        </div>
        <div className="flex items-center text-xs text-red-600 font-light">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          Pending payment
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white p-5 hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-light text-gray-500 uppercase tracking-wider">
            Total Amount
          </span>
        </div>
        <div className="text-lg md:text-xl lg:text-3xl font-light text-gray-900 mb-1">
          <CurrencyFormatter value={totalReceivable} />
        </div>
        <div className="flex items-center text-xs text-green-600 font-light">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Total collected
        </div>
      </div>
    </div>
  );
};

export default UpView;
