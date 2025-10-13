import { useState, useRef, useCallback } from "react";
import Modal from "../Modal/Modal";
import { Phone, Save, User, X, Camera, Crop } from "lucide-react";
import { useEditClientByIdMutation } from "../../redux/features/clientApi/clientApi";
import { toast } from "sonner";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Utility function to get cropped image
const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      0.95
    );
  });
};

const EditClient = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editClientById, { isLoading }] = useEditClientByIdMutation();

  // Image upload states
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Crop states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: data?.name || "",
    mobile: data?.mobile || "",
  });

  // ============ IMAGE UPLOAD & CROP FUNCTIONS ============
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    // Set initial crop to be circular (1:1 aspect ratio)
    const size = Math.min(width, height) * 0.8;
    const x = (width - size) / 2;
    const y = (height - size) / 2;

    setCrop({
      unit: "px",
      width: size,
      height: size,
      x,
      y,
    });
  }, []);

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop) {
      toast.error("Please select a crop area");
      return;
    }

    try {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        "cropped-image.jpg"
      );

      // Create a new file from the blob
      const croppedFile = new File([croppedImageBlob], "cropped-avatar.jpg", {
        type: "image/jpeg",
      });

      setImageFile(croppedFile);

      // Create preview URL
      const previewUrl = URL.createObjectURL(croppedImageBlob);
      setPreviewImage(previewUrl);

      setCropModalOpen(false);
      toast.success("Image cropped successfully");
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image");
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
    setImageFile(null);
    setOriginalImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getImageFormData = () => {
    if (imageFile) {
      const formDataObj = new FormData();
      formDataObj.append("avatar", imageFile);
      return formDataObj;
    }
    return null;
  };

  // ============ FORM FUNCTIONS ============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formDataToObject = (formData) => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        obj[key] = {
          name: value.name,
          size: value.size,
          type: value.type,
          isFile: true,
        };
      } else {
        obj[key] = value;
      }
    }
    return obj;
  };

  // ============ API HANDLERS ============
  const handleImageUpload = async (imageFormData) => {
    try {
      imageFormData.append("name", formData.name);
      imageFormData.append("mobile", formData.mobile);

      const formDataObj = formDataToObject(imageFormData);
      console.log("FormData contents:", formDataObj);

      const response = await editClientById({
        id: data?.id,
        data: imageFormData,
      }).unwrap();

      if (response?.success) {
        toast.success("Client updated successfully");
        setIsOpen(false);
        resetImage();
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleFormUpdate = async (submitData) => {
    try {
      const response = await editClientById({
        id: data?.id,
        data: submitData,
      }).unwrap();

      if (response?.success) {
        toast.success("Client updated successfully");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    const imageFormData = getImageFormData();

    if (imageFormData) {
      await handleImageUpload(imageFormData);
    } else {
      await handleFormUpdate(submitData);
    }
  };

  // ============ RENDER FUNCTIONS ============
  const getAvatarDisplay = () => {
    return (
      <div className="relative group">
        {previewImage ? (
          <img
            src={previewImage}
            alt={data?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg transition-opacity group-hover:opacity-75"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-full ${
              data?.avatar_url ? "" : "bg-[#009099]"
            } flex items-center justify-center border-4 border-white shadow-lg transition-opacity group-hover:opacity-75`}
          >
            {data?.avatar_url ? (
              <img
                src={data?.avatar_url}
                alt={data?.name}
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

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Edit
      </button>

      {/* Main Edit Modal */}
      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-lg"}>
        <div className="relative">
          {/* Header with gradient background */}
          <div className="bg-[#009099] px-6 py-8 rounded-t-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center">
              {getAvatarDisplay()}
              <p className="text-blue-100 text-md mt-1 capitalize">
                {data?.name}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            {/* Client Info Badge */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex-1">
                <p className="text-xs text-gray-500">Balance</p>
                <p className="text-lg font-semibold text-gray-800">
                  ৳
                  {(
                    parseFloat(data?.creditSum || 0) -
                    parseFloat(data?.debitSum || 0)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="h-10 w-px bg-blue-200" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-medium text-gray-800 capitalize">
                  {data?.type}
                </p>
              </div>
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter client name"
                  required
                />
              </div>
            </div>

            {/* Mobile Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData?.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#009099] text-white rounded-lg hover:bg-[#0dcad8] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <div className="px-6 py-3 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Last updated: {new Date(data?.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </Modal>

      {/* Crop Modal */}
      <Modal
        setIsOpen={setCropModalOpen}
        isOpen={cropModalOpen}
        maxW={"max-w-2xl"}
      >
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Crop className="w-5 h-5" />
              Crop Image
            </h3>
            <button
              onClick={() => setCropModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 text-center">
              Adjust the circular crop area and click "Apply Crop"
            </p>
          </div>

          {originalImage && (
            <div className="flex justify-center mb-6">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1} // This makes the crop circular (1:1 aspect ratio)
                circularCrop
                keepSelection
                className="max-h-96"
              >
                <img
                  ref={imgRef}
                  src={originalImage}
                  onLoad={onImageLoad}
                  alt="Crop preview"
                  className="max-w-full max-h-96 object-contain"
                />
              </ReactCrop>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCropModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              className="flex-1 px-4 py-2.5 bg-[#009099] text-white rounded-lg hover:bg-[#0dcad8] transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Crop className="w-4 h-4" />
              Apply Crop
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditClient;
