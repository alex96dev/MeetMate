import { IoSearch } from "react-icons/io5";
import { theme } from "@/styles";
import styled from "styled-components";

export default function SearchForm({ onSearch, onKeyPress }) {
  return (
    <StyledForm>
      {/* <label htmlFor="search"> */}
      <IoSearch size="1.5rem" color={theme.textColor} />
      {/* </label> */}
      <StyledInput
        type="search"
        id="search"
        name="search"
        onChange={onSearch}
        placeholder="Search..."
        aria-label="search for mates"
        onKeyPress={onKeyPress}
      />
      {/* <StyledButton type="button">
        <AiOutlineUsergroupAdd size="1.5rem" />
      </StyledButton> */}
    </StyledForm>
  );
}
const StyledForm = styled.form`
  display: flex;
  flex-grow: 1;
  border-style: solid;
  align-items: center;
  padding: ${theme.spacing.xs};
  gap: ${theme.spacing.xs};
  margin-bottom: 2rem;
  height: 2.4rem;
  border-color: ${theme.textColor};
  background-color: transparent;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  border-style: solid;
  box-shadow: ${theme.box.shadow};
`;
// const StyledButton = styled.button`;
//   box-shadow: unset;
// `;
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
