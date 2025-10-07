const Profile = ({ image, name, role }) => {
  return (
    <div className="h-[42px] w-[207px] flex items-center space-x-4">
      <div className="relative">
        <img src={image} alt="profile" className="rounded-full h-[42px]" />
        <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-green-500 border border-white rounded-full"></span>
      </div>
      <div>
        <p className="font-semibold capitalize">{name || "Name"}</p>
        <p className="text-yellow-500 font-semibold text-[12px]">
          {role || "Role"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
