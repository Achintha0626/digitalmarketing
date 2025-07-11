import React from "react";

const SubmitBtn = ({ children = "Submit" }) => {
  return (
    <button type="submit" className="btn btn-block form-btn">
      {children}
    </button>
  );
};

export default SubmitBtn;
