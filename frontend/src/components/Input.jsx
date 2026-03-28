import React from "react";

const Input = ({ icon: Icon, labelName, ...props }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        {labelName && <span className="label-text">{labelName}</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Icon && <Icon className="size-5 text-blue-500" />}
        </div>
        <input
          {...props}
          className="input input-bordered w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-primary focus:ring-2 focus:primary text-white placeholder-gray-400 transition duration-200"
          required
        />
      </div>
      {props.type === "password" && (
        <p className="text-xs opacity-70 mt-1">
          Password must be at least 6 characters long
        </p>
      )}
    </div>
  );
};

export default Input;
