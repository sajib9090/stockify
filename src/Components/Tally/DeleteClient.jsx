import { useState } from "react";
import Modal from "../Modal/Modal";
import { useDeleteClientByIdMutation } from "../../redux/features/clientApi/clientApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const DeleteClient = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [deleteClientById, { isLoading }] = useDeleteClientByIdMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteClientById({
        id: data?.id,
      }).unwrap();

      if (result?.success) {
        navigate("/tally");
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
        className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        Delete
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-xs"}>
        <p className="text-slate-600 text-center mb-6">
          Are you sure you want to delete this client? This action cannot be
          undone.
        </p>
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
            disabled={isLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Working..." : "Yes, Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteClient;
