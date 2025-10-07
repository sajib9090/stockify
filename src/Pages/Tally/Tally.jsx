import UpView from "../../Components/Tally/UpView";
import Filter from "../../Components/Tally/Filter";
import AddButton from "../../Components/AddButton/AddButton";
import { FaPlus } from "react-icons/fa6";
import { UserRoundPlus } from "lucide-react";
import DisplayCustomer from "../../Components/Tally/DisplayCustomer";

const Tally = () => {
  const items = [
    {
      name: "Sajib Hossain",
      balance: 12,
      updatedAt: "2023-10-01T12:00:00Z",
    },
    {
      name: "Tumpa Akter",
      balance: 50,
      updatedAt: "2023-10-03T15:30:00Z",
    },
    {
      name: "Maria Islam",
      balance: 100,
      updatedAt: "2023-09-28T09:45:00Z",
    },
    {
      name: "Rahim Uddin",
      balance: 75,
      updatedAt: "2023-10-05T18:10:00Z",
    },
    {
      name: "Karim Hossain",
      balance: 2000000,
      updatedAt: "2023-10-02T21:00:00Z",
    },
  ];

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-md border border-slate-200 rounded-lg bg-white">
        <div className="p-4">
          <UpView />
        </div>

        <Filter />
        <div className="flex items-center justify-end text-xs text-slate-500 px-3">
          <p>Customer</p> <p className="mx-2">{0}</p> <p className="mr-2">/</p>{" "}
          <p>Supplier</p> <p className="mx-2">{0}</p>
        </div>

        <div className="p-4 flex justify-end">
          <button className="flex items-center gap-2 bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-user-round-plus-icon lucide-user-round-plus"
            >
              <path d="M2 21a8 8 0 0 1 13.292-6" />
              <circle cx="10" cy="8" r="5" />
              <path d="M19 16v6" />
              <path d="M22 19h-6" />
            </svg>
          </button>
        </div>

        {/* customers and suppliers list will be here */}
        {items?.map((item, index) => (
          <DisplayCustomer key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Tally;
