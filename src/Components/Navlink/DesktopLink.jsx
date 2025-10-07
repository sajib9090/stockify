import { GiSellCard, GiExpense } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { MdSpaceDashboard } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { LuTally5 } from "react-icons/lu";

const DesktopLink = () => {
  const user = {};
  const location = useLocation();

  return (
    <div className="pt-10">
      <Link
        to={"/"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname === "/"
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <ImHome3 />
        <p>Home</p>
      </Link>
      {/* <Link
        to={"/dashboard"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("dashboard")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <MdSpaceDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        to={"/expense"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("expense")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <GiExpense />
        <p>Expense</p>
      </Link>
      <Link
        to={"/sell"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("sell")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <GiSellCard />
        <p>Sell</p>
      </Link>
      <Link
        to={"/purchase"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("purchase")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <BiSolidPurchaseTag />
        <p>Purchase</p>
      </Link>
      <Link
        to={"/reports"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("reports")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <HiDocumentReport />
        <p>Reports</p>
      </Link> */}
      <Link
        to={"/tally"}
        className={`flex items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("tally")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <LuTally5 />
        <p>Tally</p>
      </Link>

      {user && (
        <button
          className={`flex w-full items-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white text-black
        `}
        >
          <TbLogout2 />
          <p>Logout</p>
        </button>
      )}
    </div>
  );
};

export default DesktopLink;
