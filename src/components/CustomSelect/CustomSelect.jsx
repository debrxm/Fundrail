import React from "react";
import { Feather } from "react-web-vector-icons";
import "./styles.scss";

const CustomSelect = ({
  options,
  isOpen,
  setOpen,
  selectedItem,
  setSelectedItem,
  styles,
}) => {
  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  return (
    <div
      className={`dropdown ${styles ? "custom-dropdown" : ""}`}
      style={styles}
    >
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem?.label || "Select your state"}
        <Feather
          name={`chevron-${isOpen ? "down" : "right"}`}
          size={20}
          className="icon"
          color="black"
        />
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {options.map((item, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={(e) => handleItemClick(item)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id === selectedItem?.id && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.label.split("_").join(" ")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
