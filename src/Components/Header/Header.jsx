import defaultLogo from "../../assets/logo/pngwing.com.png";

const Header = () => {
  const user = {};
  return (
    <div className="h-[80px] hidden sm:hidden md:hidden lg:flex">
      <div className="bg-slate-200 w-[256px] flex items-center justify-evenly px-6 shadow">
        <div>
          <img
            className="h-[50px]"
            src={user?.pharmacyInfo?.brand_logo?.url || defaultLogo}
            alt=""
          />
        </div>
        <div>
          <p className="capitalize font-semibold">
            {user?.pharmacyInfo?.pharmacy_name || "Shop_name"}
          </p>
        </div>
      </div>
      <div className="bg-[#F7FAFD] flex-grow shadow border-b border-[#d6d5d5]">
        <h1>up bar</h1>
      </div>
    </div>
  );
};

export default Header;
