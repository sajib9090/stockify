import { ImHome3 } from "react-icons/im";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { LuTally5 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout } from "../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const MobileLink = ({ setIsMenuOpen }) => {
  const user = useSelector(currentUser);
  const [logoutUser] = useLogoutUserMutation();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res?.success) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="w-full">
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname === "/"
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <ImHome3 />
        <p>Home</p>
      </Link>

      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/tally"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
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
          onClick={() => handleLogout()}
          className={`flex w-full items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white text-black
        `}
        >
          <TbLogout2 />
          <p>Logout</p>
        </button>
      )}
    </div>
  );
};

export default MobileLink;
