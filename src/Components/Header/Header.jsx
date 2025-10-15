import { useEffect, useState } from "react";
import defaultLogo from "../../assets/logo/pngwing.com.png";

const Header = ({ brand }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="h-[80px] hidden sm:hidden md:hidden lg:flex">
      {/* Left brand section */}
      <div className="bg-slate-200 w-[256px] flex items-center justify-evenly px-6 shadow">
        <div>
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={brand?.logo_url || defaultLogo}
            alt="logo"
          />
        </div>
        <div>
          <p className="capitalize font-semibold">
            {brand?.name || "Shop_name"}
          </p>
        </div>
      </div>

      {/* Top bar with clock */}
      <div className="bg-[#F7FAFD] flex-grow shadow border-b border-[#d6d5d5] flex justify-end items-center pr-10">
        <div className="text-right">
          <p className="text-xl font-semibold text-gray-700">{formattedTime}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
