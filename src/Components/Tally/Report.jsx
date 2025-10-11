import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { useGetTransactionByClientIdQuery } from "../../redux/features/transactionApi/transactionApi";
import { useLocation, useNavigate } from "react-router";

const Report = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();

  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const itemsPerPage = 10;

  const queryParams = new URLSearchParams(search);
  const clientId = queryParams.get("clientId");

  const { data, error, isLoading } = useGetTransactionByClientIdQuery(
    { id: clientId },
    { skip: !clientId }
  );

  // Calculate totals
  const totalDebit =
    data?.data
      ?.filter((t) => t?.type === "debit")
      ?.reduce((sum, t) => sum + parseFloat(t?.amount || 0), 0) || 0;

  const totalCredit =
    data?.data
      ?.filter((t) => t?.type === "credit")
      ?.reduce((sum, t) => sum + parseFloat(t?.amount || 0), 0) || 0;

  const balance = totalCredit - totalDebit;

  // Load initial transactions when modal opens
  useEffect(() => {
    if (isOpen && data?.data) {
      setDisplayedTransactions(data?.data?.slice(0, itemsPerPage));
      setPage(1);
      setHasMore(data?.data?.length > itemsPerPage);
    }
  }, [isOpen, data]);

  // Load more transactions
  const loadMore = useCallback(() => {
    if (!data?.data) return;

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newTransactions = data?.data?.slice(startIndex, endIndex);

    if (newTransactions.length > 0) {
      setDisplayedTransactions((prev) => [...prev, ...newTransactions]);
      setPage((prev) => prev + 1);
      setHasMore(endIndex < data?.data?.length);
    } else {
      setHasMore(false);
    }
  }, [page, data]);

  // Intersection Observer for infinite scroll
  const lastTransactionRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
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

  const wrapDescription = (description) => {
    if (!description || description?.length <= 33) {
      return description || "";
    }
    const firstLine = description?.substring(0, 33);
    const secondLine = description?.substring(33);
    return `${firstLine}\n${secondLine}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        Report
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW="max-w-2xl">
        <div className="flex flex-col h-full bg-white rounded overflow-hidden">
          {/* Header with Summary */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-red-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wide">
                    Total Debit
                  </p>
                </div>
                <p className="text-lg font-bold text-white">
                  {formatAmount(totalDebit)}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wide">
                    Total Credit
                  </p>
                </div>
                <p className="text-lg font-bold text-white">
                  {formatAmount(totalCredit)}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium uppercase tracking-wide">
                    Balance
                  </p>
                </div>
                <p
                  className={`text-lg font-bold ${
                    balance >= 0 ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {balance >= 0 ? "+" : "-"}
                  {formatAmount(Math.abs(balance))}
                </p>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto bg-slate-50">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-600"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-red-400 mx-auto mb-4"
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
                  <p className="text-slate-600 font-medium">
                    Failed to load transactions
                  </p>
                </div>
              </div>
            ) : displayedTransactions?.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-slate-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-slate-600 font-medium">
                    No transactions found
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white mx-0 my-1 rounded border border-slate-200 overflow-hidden">
                <div className="overflow-auto max-h-[350px]">
                  <table className="w-full">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-6 font-semibold text-slate-700 text-[10px] uppercase tracking-wider">
                          Description
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-700 text-[10px] uppercase tracking-wider">
                          Debit
                        </th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-700 text-[10px] uppercase tracking-wider">
                          Credit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedTransactions?.map((transaction, index) => {
                        const isDebit = transaction?.type === "debit";
                        const isLast =
                          index === displayedTransactions?.length - 1;

                        return (
                          <tr
                            onClick={() =>
                              navigate(
                                `transactions?transactionId=${transaction?.id}`
                              )
                            }
                            key={transaction?.id}
                            ref={isLast ? lastTransactionRef : null}
                            className="hover:bg-slate-50 transition-all duration-150 group cursor-pointer"
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-start space-x-3">
                                <div
                                  className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    isDebit
                                      ? "bg-red-50 text-red-600"
                                      : "bg-green-50 text-green-600"
                                  }`}
                                >
                                  {isDebit ? (
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
                                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                      />
                                    </svg>
                                  ) : (
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
                                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-slate-800 group-hover:text-slate-900 whitespace-pre-wrap break-words text-xs">
                                    {wrapDescription(
                                      transaction?.description || ""
                                    )}
                                  </p>
                                  <p className="text-[10px] text-slate-500 mt-1 flex items-center flex-wrap gap-2">
                                    <span className="flex items-center whitespace-nowrap">
                                      <svg
                                        className="w-3 h-3 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      {formatDate(transaction?.created_date)}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center whitespace-nowrap">
                                      <svg
                                        className="w-3 h-3 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      {transaction?.created_time}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {isDebit ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-red-50 text-red-700 font-semibold text-xs whitespace-nowrap">
                                  {formatAmount(transaction?.amount)}
                                </span>
                              ) : (
                                <span className="text-slate-300 text-md">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center">
                              {!isDebit ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-green-50 text-green-700 font-semibold text-xs whitespace-nowrap">
                                  {formatAmount(transaction?.amount)}
                                </span>
                              ) : (
                                <span className="text-slate-300 text-md">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {hasMore && (
                    <div className="flex justify-center py-8">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-slate-600"></div>
                      </div>
                    </div>
                  )}

                  {!hasMore && displayedTransactions.length > 0 && (
                    <div className="text-center py-6 border-t border-slate-100 bg-slate-50">
                      <div className="inline-flex items-center space-x-2 text-sm text-slate-500">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-medium">
                          You've reached the end of your transactions
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Report;
