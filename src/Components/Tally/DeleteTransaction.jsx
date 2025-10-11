import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useDeleteTransactionByIdMutation } from "../../redux/features/transactionApi/transactionApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const DeleteTransaction = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [deleteTransactionById, { isLoading }] =
    useDeleteTransactionByIdMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteTransactionById({
        id: transaction?.id,
      }).unwrap();

      if (result?.success) {
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-1 flex items-center justify-center space-x-2 bg-slate-500 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW="max-w-sm">
        <div className="bg-white rounded-lg p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
            Delete Transaction
          </h3>

          {/* Message */}
          <p className="text-slate-600 text-center mb-6">
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </p>

          {/* Transaction Info */}
          {transaction && (
            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
              <div className="text-sm space-y-1">
                <p className="text-slate-600">
                  <span className="font-semibold">ID:</span> #{transaction?.id}
                </p>
                <p className="text-slate-600">
                  <span className="font-semibold">Amount:</span>{" "}
                  {transaction?.amount}
                </p>
                {transaction?.description && (
                  <p className="text-slate-600">
                    <span className="font-semibold">Description:</span>{" "}
                    {transaction?.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              No, Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Working..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTransaction;
