import React from "react";

const MinSalary = ({ onMinSalaryChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Minimum Salary</h4>
      <div>
        <input
          type="number"
          placeholder="Enter minimum salary"
          className="border rounded p-2 w-full"
          onChange={(e) => onMinSalaryChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MinSalary;
