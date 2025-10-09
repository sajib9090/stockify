import { IoPersonAddOutline } from "react-icons/io5";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateClientMutation } from "../../redux/features/clientApi/clientApi";
import { UserRoundPlus } from "lucide-react";
import Modal from "../Modal/Modal";

const AddClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    type: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "" && name !== "type") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
  };

  const [addClient, { isLoading }] = useCreateClientMutation();
  const handleAddGroup = async (e) => {
    e.preventDefault();
    const data = {
      name: formData?.name,
      mobile: formData.mobile,
      type: formData.type,
    };
    setErrorMessage("");
    try {
      const response = await addClient(data).unwrap();
      toast.success(response?.message || response?.data?.message);
      setIsOpen(false);
      setFormData({ name: "", mobile: "", type: "customer" });
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer"
        >
          <UserRoundPlus size={24} strokeWidth={2} className="text-gray-700" />
        </button>
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-sm"}>
        <form onSubmit={handleAddGroup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-3">
              Account Type
            </label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="customer"
                  checked={formData.type === "customer"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`relative w-7 h-7 rounded-full border-2 transition-all duration-300
        ${
          formData.type === "customer"
            ? "border-indigo-600 bg-indigo-600 shadow-sm"
            : "border-gray-300 group-hover:border-indigo-400"
        }
        `}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br 
          ${
            formData.type === "customer"
              ? "from-indigo-600 to-indigo-400 opacity-100"
              : "opacity-0"
          }`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {formData.type === "customer" && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-gray-600 transition-colors duration-300 
        ${formData.type === "customer" ? "text-indigo-600 font-medium" : ""}`}
                >
                  Customer
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="type"
                  value="supplier"
                  checked={formData.type === "supplier"}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`relative w-7 h-7 rounded-full border-2 transition-all duration-300
        ${
          formData.type === "supplier"
            ? "border-emerald-600 bg-emerald-600 shadow-sm"
            : "border-gray-300 group-hover:border-emerald-400"
        }
        `}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br 
          ${
            formData.type === "supplier"
              ? "from-emerald-600 to-emerald-400 opacity-100"
              : "opacity-0"
          }`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {formData.type === "supplier" && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-gray-600 transition-colors duration-300 
        ${formData.type === "supplier" ? "text-emerald-600 font-medium" : ""}`}
                >
                  Supplier
                </span>
              </label>
            </div>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button
            disabled={formData?.name?.length == 0}
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddClient;
