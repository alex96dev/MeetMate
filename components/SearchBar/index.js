import { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles";
import SearchIcon from "../../assets/svg/searchIcon";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <StyledInputContainer>
      <SearchIcon />
      <StyledInput
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </StyledInputContainer>
  );
}

const StyledInputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  border-style: solid;

  margin-bottom: 2rem;
  height: 2.4rem;
  border-color: ${theme.textColor};
  background-color: transparent;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  border-style: solid;
  box-shadow: ${theme.box.shadow};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-style: none;
  border-radius: ${theme.borderRadius.medium};
  background-color: transparent;

  &:hover,
  &:active {
    outline: none;
  }
`;
