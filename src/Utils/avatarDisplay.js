import { Camera, User } from "lucide-react";

export const getAvatarDisplay = ({
  previewImage,
  name,
  img,
  handleImageClick,
  fileInputRef,
  handleImageChange,
}) => {
  return (
    <div className="relative group">
      {previewImage ? (
        <img
          src={previewImage}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg transition-opacity group-hover:opacity-75"
        />
      ) : (
        <div
          className={`w-20 h-20 rounded-full ${
            img ? "" : "bg-[#009099]"
          } flex items-center justify-center border-4 border-white shadow-lg transition-opacity group-hover:opacity-75`}
        >
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-white" />
          )}
        </div>
      )}

      {/* Upload Overlay */}
      <div
        className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={handleImageClick}
      >
        <Camera className="w-6 h-6 text-white" />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};
