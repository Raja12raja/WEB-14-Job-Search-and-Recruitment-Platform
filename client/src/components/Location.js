import React from "react";
import InputField from "./InputField";

const Location = ({ onLocationChange }) => {
  const locations = ["Bengaluru", "Mumbai", "Pune", "Delhi", "Indore" ,"Hyderabad"];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="location"
            value=""
            onChange={() => onLocationChange("")}
          />
          <span className="checkmark"></span> All
        </label>
        {locations.map((location, index) => (
          <InputField
            key={index}
            value={location.toLowerCase()}
            title={location}
            name="location"
            onChange={() => onLocationChange(location.toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
};

export default Location;
