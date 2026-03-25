import React from "react";

interface FormRowSelectProps {
  labelText?: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}

export const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}: FormRowSelectProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-bold text-slate-700 mb-2 capitalize">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all capitalize"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
