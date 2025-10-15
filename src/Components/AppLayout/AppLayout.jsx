import { Outlet } from "react-router";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import {
  currentUser,
  currentUserBrand,
} from "../../redux/features/auth/authSlice";

const AppLayout = () => {
  const user = useSelector(currentUser);
  const brand = useSelector(currentUserBrand);

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-0 left-0 z-[999]">
        <Header brand={brand} />
      </div>

      <div className="lg:flex">
        {/* Sticky Navbar on large screens */}
        <div>
          <Navbar user={user} brand={brand} />
          <div className="hidden lg:block fixed bottom-0">
            <Footer />
          </div>
        </div>

        {/* Main Content - not sticky */}
        <div className="w-full">
          <Outlet />
        </div>

        {/* Footer for small screens */}
        <div className="lg:hidden block">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
