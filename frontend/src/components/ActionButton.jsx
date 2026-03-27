import React from "react";

const ActionButton = ({btnName, isPending}) => {
  return (
    <button className="btn btn-primary w-full">
      {isPending ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Loading...
        </>
      ) : (
        btnName
      )}
    </button>
  );
};

export default ActionButton;
