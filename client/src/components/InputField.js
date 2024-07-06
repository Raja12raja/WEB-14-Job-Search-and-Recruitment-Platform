import React from "react";

const InputField = ({ value, title, name, onChange }) => {
    return (
        <label className="sidebar-label-container">
            <input
                type="radio"
                name={name}
                value={value}
                onChange={onChange}
            />
            <span className="checkmark"></span> {title}
        </label>
    );
};

export default InputField;
