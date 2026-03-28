import React from "react";

const SelectTag = ({labelName,ArrayName, ...props}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{labelName}</span>
      </label>
      <select
        {...props}
        className="select select-bordered w-full"
      >
        <option value="">Select your {labelName}</option>
        {ArrayName.map((lang) => (
          <option key={`native-${lang}`} value={lang.toLowerCase()}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTag;
