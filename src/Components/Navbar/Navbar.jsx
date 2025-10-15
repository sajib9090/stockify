import { useState } from "react";
import closeIcon from "../../assets/menu/211651_close_round_icon.png";
import hamburgerLogo from "../../assets/menu/1564512_burger_catalogue_list_menu_icon.png";
import defaultLogo from "../../assets/logo/pngwing.com.png";
import MobileLink from "../Navlink/MobileLink";
import DesktopLink from "../Navlink/DesktopLink";
import Profile from "../Profile/Profile";
import ProfileWithDropdown from "../ProfileWithDropdown/ProfileWithDropdown";

const Navbar = ({ user, brand }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* large screen */}
      <div className="w-[256px] bg-slate-100 min-h-[calc(100vh-115px)] hidden sm:hidden md:hidden lg:block shadow sticky top-[80px] z-50">
        <div className="flex items-center justify-center pt-6">
          <Profile user={user} />
        </div>
        {/* menu items */}
        <DesktopLink />
      </div>
      {/* small screen */}
      <div className="h-[70px] bg-slate-200 w-full flex sm:flex md:flex lg:hidden">
        <div className="flex items-center justify-between w-full px-4">
          <div>
            <button onClick={handleMenuToggle}>
              <img src={hamburgerLogo} alt="menu" width={35} height={35} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <img
                className="rounded-full"
                src={brand?.logo_url || defaultLogo}
                alt="logo"
                width={50}
                height={50}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-semibold capitalize">
                {brand?.name || "Your Brand"}
              </p>
            </div>
          </div>
          <div>
            <ProfileWithDropdown user={user} />
          </div>
        </div>
      </div>

      {/* Full-screen menu overlay with animation */}
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-90 z-50 flex flex-col transform transition-transform duration-500  ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full"
              src={brand?.logo_url || defaultLogo}
              alt="logo"
              width={50}
              height={50}
            />
            <p className="text-white text-xl font-bold capitalize">
              {brand?.name || "Your brand"}
            </p>
          </div>
          <button onClick={handleMenuToggle}>
            <img src={closeIcon} alt="close" width={30} height={30} />
          </button>
        </div>
        <div className="flex-grow flex flex-col justify-center items-center space-y-4 text-white">
          <MobileLink setIsMenuOpen={setIsMenuOpen} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
