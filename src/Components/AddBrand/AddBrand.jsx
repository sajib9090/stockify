import { useState } from "react";
import Modal from "../Modal/Modal";
import { Building2, Phone, Save, X } from "lucide-react";
import { toast } from "sonner";
import { useAddBrandMutation } from "../../redux/features/Brand/brandApi";
import { useDispatch } from "react-redux";
import { setBrand } from "../../redux/features/auth/authSlice";

const AddBrand = ({ isOpen, handleModalClose, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_1: "",
  });

  const [addBrand, { isLoading }] = useAddBrandMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addBrand({
        data: formData,
      }).unwrap();

      const brand = {
        brand: response?.data,
      };

      if (response?.success) {
        dispatch(setBrand(brand));
        toast.success("Brand added successfully");
        setFormData({ name: "", mobile_1: "" });
        setIsOpen(!isOpen);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add brand");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={handleModalClose} maxW={"max-w-lg"}>
      <div className="relative bg-white rounded-lg">
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent transition-all"
                placeholder="Enter brand name"
                required
              />
            </div>
          </div>

          {/* Mobile Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="mobile_1"
                value={formData.mobile_1}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent transition-all"
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleModalClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 px-4 py-2.5 bg-[#009099] text-white rounded-lg hover:bg-[#00b8c3] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Adding..." : "Add Brand"}
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="px-6 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            You can add more details after creating the brand
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AddBrand;
