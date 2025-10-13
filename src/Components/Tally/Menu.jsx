import { useState, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Report from "./Report";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";

const Menu = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl hover:bg-gray-100 rounded-full p-1"
      >
        <PiDotsThreeOutlineVerticalFill />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <>
            <Report />
          </>
          <>
            <EditClient data={data} />
          </>
          <>
            <DeleteClient data={data} />
          </>
          <button
            onClick={() => setIsOpen(false)}
            className="block w-full px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
