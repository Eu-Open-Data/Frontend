/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-disable react/prop-types */

const SelectableStartIcon = ({
  filled,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "#ccc"}
      width="24px"
      height="24px"
      style={{ cursor: "pointer" }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default SelectableStartIcon;
