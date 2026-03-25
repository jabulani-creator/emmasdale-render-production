import React from "react";

export const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
}: {
  type: string;
  name: string;
  value: string;
  handleChange: (e: any) => void;
  labelText?: string;
  placeholder?: string;
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};
