import { FaPlus } from "react-icons/fa6";

const AddButton = ({ text, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="flex items-center gap-2 bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out"
    >
      <FaPlus /> {text}
    </button>
  );
};

export default AddButton;
