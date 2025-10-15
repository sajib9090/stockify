import { useState } from "react";
import defaultProfileImage from "../../assets/profile/403022_business man_male_user_avatar_profile_icon.png";
import EditProfile from "../../Components/EditProfile/EditProfile";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const ProfileWithDropdown = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
    <>
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <img
          src={user?.avatar_url || defaultProfileImage}
          alt="profile"
          height={42}
          width={42}
          className="rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-white rounded-full"></span>
      </div>

      {dropdownOpen && (
        <div className="absolute mt-2 w-[150px] bg-white border border-gray-200 rounded shadow-lg z-10 right-1">
          <div className="py-2 px-4">
            <p className="font-semibold capitalize">{user?.name}</p>
            <p className="text-yellow-500 font-semibold text-[12px]">
              {user?.role}
            </p>
          </div>

          <ul className="py-2">
            <li
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </li>

            {user && user?.id ? (
              <>
                <li
                  onClick={() => handleLogout()}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      )}

      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </>
  );
};

export default ProfileWithDropdown;
