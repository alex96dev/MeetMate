import { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <StyledInputContainer>
      <IoSearch size="1.5rem" color={theme.textColor} />
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
  align-items: center;
  padding: ${theme.spacing.xs};
  gap: ${theme.spacing.xs};
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
