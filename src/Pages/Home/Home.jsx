import { Phone, Calendar, MapPinHouseIcon } from "lucide-react";
import { formatDate } from "../../Utils/time";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
import EditBrand from "../../Components/EditBrand/EditBrand";
import { useState, useEffect } from "react";
import { useGetBrandInfoQuery } from "../../redux/features/Brand/brandApi";
import AddBrand from "../../Components/AddBrand/AddBrand";
import { useDispatch } from "react-redux";
import { setBrand } from "../../redux/features/auth/authSlice";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetBrandInfoQuery();
  const dispatch = useDispatch();

  // ✅ Use useEffect to handle both brand setting and error state
  useEffect(() => {
    if (data?.data?.id) {
      dispatch(setBrand({ brand: data?.data }));
    }
  }, [data?.data, data?.data?.id, dispatch]);

  useEffect(() => {
    if (error?.status === 400) {
      setIsOpen(true);
    }
  }, [error]);

  const handleModalClose = () => {
    if (error?.status === 400) {
      return;
    }
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  // If there's a non-400 error, show the error component
  if (error && error?.status !== 400) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            {/* Brand Header */}
            <div className="border-b border-gray-200 p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                {data?.data?.logo_id ? (
                  <img
                    src={data?.data?.logo_url}
                    alt={data?.data?.name}
                    className="w-24 h-24 rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                    <span className="text-4xl font-light text-gray-700">
                      {data?.data?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-center capitalize text-gray-900 tracking-wide">
                {data?.data?.name}
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
                    {data?.data?.mobile_1 || "—"}
                  </p>
                </div>

                <div className="border-l-2 border-gray-300 pl-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Secondary Mobile
                  </p>
                  <p className="text-xl font-light text-gray-900">
                    {data?.data?.mobile_2 || "—"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="mt-12">
                <div className="flex items-center mb-6">
                  <MapPinHouseIcon size={18} className="mr-3 text-gray-700" />
                  <h3 className="text-lg font-normal text-gray-900 tracking-wide">
                    Address Information
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-2 border-gray-900 pl-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                      {data?.data?.sub_district || "Sub District"}
                    </p>
                    <p className="text-xl font-light text-gray-900 capitalize">
                      {data?.data?.district || "District"}
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-300 pl-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                      Address
                    </p>
                    <p className="text-xl font-light text-gray-900 capitalize">
                      {data?.data?.address || "—"}
                    </p>
                  </div>
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
                      {formatDate(data?.data?.created_at)}
                    </p>
                  </div>

                  <div className="border-l-2 border-gray-300 pl-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                      Last Updated
                    </p>
                    <p className="text-xl font-light text-gray-900">
                      {formatDate(data?.data?.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action section */}
              <EditBrand brandInfo={data?.data} />
            </div>
          </div>
        </div>
      </div>
      <AddBrand
        isOpen={isOpen}
        handleModalClose={handleModalClose}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Home;
