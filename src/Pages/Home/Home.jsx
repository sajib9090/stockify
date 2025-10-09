import { useState } from "react";
import { Phone, Calendar, Tag } from "lucide-react";
import { useGetBrandInfoQuery } from "../../redux/features/Brand/brandApi";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetBrandInfoQuery();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-300 rounded-lg p-6 max-w-md shadow-sm">
          <p className="text-gray-900 font-semibold">Error loading data</p>
          <p className="text-gray-600 text-sm mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  const brandInfo = data?.data;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
          {/* Brand Header */}
          <div className="border-b border-gray-200 p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              {brandInfo?.logo ? (
                <img
                  src={brandInfo?.logo}
                  alt={brandInfo?.name}
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                  <span className="text-4xl font-light text-gray-700">
                    {brandInfo?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-center capitalize text-gray-900 tracking-wide">
              {brandInfo?.name}
            </h2>
          </div>

          {/* Contact Information */}
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-6">
              <Phone size={18} className="mr-3 text-gray-700" />
              <h3 className="text-lg font-normal text-gray-900 tracking-wide">
                Contact Information
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-2 border-gray-900 pl-4">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                  Primary Mobile
                </p>
                <p className="text-xl font-light text-gray-900">
                  {brandInfo?.mobile_1 || "—"}
                </p>
              </div>

              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                  Secondary Mobile
                </p>
                <p className="text-xl font-light text-gray-900">
                  {brandInfo?.mobile_2 || "—"}
                </p>
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <Calendar size={18} className="mr-3 text-gray-700" />
                <h3 className="text-lg font-normal text-gray-900 tracking-wide">
                  Timeline
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-2 border-gray-900 pl-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Created
                  </p>
                  <p className="text-xl font-light text-gray-900">
                    {formatDate(brandInfo?.created_at)}
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Last Updated
                  </p>
                  <p className="text-xl font-light text-gray-900">
                    {formatDate(brandInfo?.updated_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-12 text-center">
              <button className="bg-[#009099] hover:bg-[#00b8c3] text-white font-light py-3 px-12 rounded-sm transition duration-300 text-sm tracking-wider uppercase">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
