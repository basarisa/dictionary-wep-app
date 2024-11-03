import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBook} size="2x" className="text-gray-500" />
          <select
            defaultValue=""
            className="border-none bg-transparent font-serif text-sm"
          >
            <option value="">Select font</option>
            <option value="10">Option 1</option>
            <option value="20">Option 2</option>
            <option value="30">Option 3</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-5 bg-gray-200 rounded-full relative">
            <div className="absolute right-1 top-1 w-3 h-3 bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
