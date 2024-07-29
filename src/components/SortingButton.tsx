// import React from "react";
import { ButtonProps } from "../types";
function SortingButton({ onSort, title, sort }: ButtonProps) {
  return (
    <button onClick={onSort} className={sort}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={title === sort ? `active` : ""}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
        />
      </svg>
    </button>
  );
}

export default SortingButton;
