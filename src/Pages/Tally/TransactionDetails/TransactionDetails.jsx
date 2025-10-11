import { useLocation } from "react-router";
import { useGetTransactionByIdQuery } from "../../../redux/features/transactionApi/transactionApi";
import {
  Edit2,
  Trash2,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import DeleteTransaction from "../../../Components/Tally/DeleteTransaction";

const TransactionDetails = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const transactionId = queryParams.get("transactionId");

  const { data, error, isLoading } = useGetTransactionByIdQuery(
    { id: transactionId },
    { skip: !transactionId }
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    return parseFloat(amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
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
          <p className="text-slate-700 font-semibold">
            Failed to load transaction
          </p>
        </div>
      </div>
    );
  }

  const transaction = data?.data;
  const isDebit = transaction?.type === "debit";

  return (
    <div className="max-w-md p-4">
      <div className="bg-white rounded border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 px-6 py-5 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                {isDebit ? (
                  <ArrowDownCircle className="w-6 h-6 text-white" />
                ) : (
                  <ArrowUpCircle className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <p className="text-slate-300 text-sm font-medium">
                  {isDebit ? "Debit Transaction" : "Credit Transaction"}
                </p>
                <p className="text-white text-2xl font-bold">
                  {isDebit ? "-" : "+"} {formatAmount(transaction?.amount)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 text-xs">
            <span className="bg-slate-600 px-2 py-1 rounded">
              ID: #{transaction?.id}
            </span>
            <span className="bg-slate-600 px-2 py-1 rounded">
              Client: #{transaction?.client_id}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <p className="text-xs text-slate-500 font-medium uppercase">
                  Date
                </p>
              </div>
              <p className="text-slate-800 font-semibold text-sm">
                {formatDate(transaction?.created_date)}
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <p className="text-xs text-slate-500 font-medium uppercase">
                  Time
                </p>
              </div>
              <p className="text-slate-800 font-semibold text-sm">
                {transaction?.created_time}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-slate-500" />
              <p className="text-xs text-slate-500 font-medium uppercase">
                Description
              </p>
            </div>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {transaction?.description || "No description provided"}
            </div>
          </div>

          {/* Amount Breakdown */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-3">
              <p className="text-xs text-slate-500 font-medium uppercase">
                Amount Details
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">
                  Transaction Type:
                </span>
                <span className="font-semibold text-sm text-slate-800">
                  {isDebit ? "Debit" : "Credit"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-semibold">
                  Total Amount:
                </span>
                <span className="font-bold text-lg text-slate-900">
                  {formatAmount(transaction?.amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <DeleteTransaction transaction={transaction} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
