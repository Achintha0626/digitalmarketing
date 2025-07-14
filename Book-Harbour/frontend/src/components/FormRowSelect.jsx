
import React from "react";

const FormRowSelect = ({ labelText, name, value, onChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        className="form-input"
        value={value} 
        onChange={onChange} 
      >
        {list.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
