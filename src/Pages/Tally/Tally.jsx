import UpView from "../../Components/Tally/UpView";
import Filter from "../../Components/Tally/Filter";
import DisplayCustomer from "../../Components/Tally/DisplayCustomer";
import { useGetClientsQuery } from "../../redux/features/clientApi/clientApi";
import AddClient from "../../Components/Tally/AddClient";
import { useState } from "react";
import Error from "../Error/Error";

const Tally = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: items,
    error,
    isLoading,
  } = useGetClientsQuery({ searchTerm: searchTerm || "" });

  // Calculate how much customers owe you (positive balances)
  const totalReceivable = items?.data?.reduce(
    (sum, client) => sum + Math.max(0, parseFloat(client?.balance || 0)),
    0
  );

  // Calculate how much you owe to customers (negative balances, shown as positive)
  const totalPayable = items?.data?.reduce(
    (sum, client) =>
      sum + Math.abs(Math.min(0, parseFloat(client?.balance || 0))),
    0
  );

  // 🔹 Function to handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  // console.log(items);

  if (error) {
    return <Error />;
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-md border border-slate-200 rounded-lg bg-white">
        <div className="p-4">
          <UpView
            totalReceivable={totalReceivable}
            totalPayable={totalPayable}
          />
        </div>

        <Filter handleSearch={handleSearch} searchTerm={searchTerm} />
        <div className="flex items-center justify-end text-xs text-slate-500 px-3">
          <p>Customer</p> <p className="mx-2">{items?.customerCount}</p>{" "}
          <p className="mr-2">/</p> <p>Supplier</p>{" "}
          <p className="mx-2">{items?.supplierCount}</p>
        </div>

        <AddClient />

        {/* customers and suppliers list will be here */}
        {[...(items?.data || [])]
          ?.sort((a, b) => {
            const getLatestDate = (item) => {
              const created = new Date(item?.created_at || 0);
              const updated = new Date(item?.updated_at || 0);
              return created > updated ? created : updated;
            };

            return getLatestDate(b) - getLatestDate(a);
          })
          ?.map((item, index) => (
            <DisplayCustomer key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Tally;
