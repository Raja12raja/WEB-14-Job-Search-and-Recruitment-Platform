import React from "react";
import Location from './Location';
import Role from './Role';
import MinSalary from './MinSalary';

const Sidebar = ({ onLocationChange, onRoleChange, onMinSalaryChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-2xl font-bold mb-2">Filters</h3>
      <MinSalary onMinSalaryChange={onMinSalaryChange} />
      <Location onLocationChange={onLocationChange} />
      <Role onRoleChange={onRoleChange} />
    </div>
  );
};

export default Sidebar;
