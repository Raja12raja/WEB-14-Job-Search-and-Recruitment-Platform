import React from "react";

const Role = ({ onRoleChange }) => {
  const roles = ["Web Developer", "Cybersecurity Analyst", "Data Science", "Systems Analyst","Network Administrator","Cloud Architect","DevOps Engineer"];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Role</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="role"
            value=""
            onChange={() => onRoleChange("")}
          />
          <span className="checkmark"></span> All
        </label>
        {roles.map((role, index) => (
          <label key={index} className="sidebar-label-container">
            <input
              type="radio"
              name="role"
              value={role.toLowerCase()}
              onChange={() => onRoleChange(role.toLowerCase())}
            />
            <span className="checkmark"></span> {role}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Role;
