import UpView from "../../Components/Tally/UpView";
import Filter from "../../Components/Tally/Filter";

import { UserRoundPlus } from "lucide-react";
import DisplayCustomer from "../../Components/Tally/DisplayCustomer";
import { useGetClientsQuery } from "../../redux/features/clientApi/clientApi";

const Tally = () => {
  const { data: items, error, isLoading } = useGetClientsQuery();

  const totalDebit = items?.data?.reduce(
    (sum, client) => sum + parseFloat(client?.debitSum || 0),
    0
  );

  const totalCredit = items?.data?.reduce(
    (sum, client) => sum + parseFloat(client?.creditSum || 0),
    0
  );

  console.log(items);

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-md border border-slate-200 rounded-lg bg-white">
        <div className="p-4">
          <UpView totalDebit={totalDebit} totalCredit={totalCredit} />
        </div>

        <Filter />
        <div className="flex items-center justify-end text-xs text-slate-500 px-3">
          <p>Customer</p> <p className="mx-2">{items?.customerCount}</p>{" "}
          <p className="mr-2">/</p> <p>Supplier</p>{" "}
          <p className="mx-2">{items?.supplierCount}</p>
        </div>

        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer">
            <UserRoundPlus
              size={24}
              strokeWidth={2}
              className="text-gray-700"
            />
          </button>
        </div>

        {/* customers and suppliers list will be here */}
        {[...(items?.data || [])]
          .sort((a, b) => new Date(b?.updated_at) - new Date(a?.updated_at))
          .map((item, index) => (
            <DisplayCustomer key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Tally;
