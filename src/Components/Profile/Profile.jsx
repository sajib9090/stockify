import { useState } from "react";
import defaultProfileImage from "../../assets/profile/403022_business man_male_user_avatar_profile_icon.png";
import EditProfile from "../EditProfile/EditProfile";

const Profile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        title="Double Click to Edit Profile"
        onDoubleClick={() => setIsOpen(!isOpen)}
        className="h-[42px] w-[207px] flex items-center space-x-4 cursor-pointer"
      >
        <div className="relative">
          <img
            src={user?.avatar_url || defaultProfileImage}
            alt="profile"
            className="rounded-full h-[42px]"
          />
          <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-white rounded-full"></span>
        </div>
        <div>
          <p className="font-semibold capitalize">{user?.name || "Name"}</p>
          <p className="text-yellow-500 font-semibold text-[12px]">
            {user?.role || "Role"}
          </p>
        </div>
      </div>

      <>
        <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      </>
    </>
  );
};

export default Profile;
