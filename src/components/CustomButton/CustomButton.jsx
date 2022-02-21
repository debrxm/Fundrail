import React from "react";
import "./styles.scss";
const CustomButton = ({ label, className, onClick, inverted, icon }) => {
  return (
    <button
      className={`custom-btn ${inverted && "inverted"} ${className}`}
      onClick={onClick}
    >
      {label} {icon && <span style={{ marginLeft: "0.5em" }}>{icon}</span>}
    </button>
  );
};

export default CustomButton;
