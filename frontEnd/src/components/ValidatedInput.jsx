import React from "react";

export function ValidatedInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full px-3 py-2 border-2 rounded-lg text-gray-900 placeholder-gray-500 
          focus:outline-none focus:ring-2 transition-colors duration-200
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-200'
          }
        `}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>
      )}
    </div>
  );
} 