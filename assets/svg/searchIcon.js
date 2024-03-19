import React from "react";
const SearchIcon = () => {
  const svgString = `
  <svg
    width="28px"
    height="28px"
    viewBox="-2 -2 25 25"
    version="1.1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="#262524"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  `;
  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};
export default SearchIcon;
