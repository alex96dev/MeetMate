import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles";

export default function Filter({ onSubmit, showFilterWindow }) {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleAuthorChange = (event) => {
    const value = event.target.value;
    setAuthor(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, category });
  };

  return (
    <StyledFilterForm show={showFilterWindow} onSubmit={handleSubmit}>
      <StyledFilterBox>
        <h2>Filter</h2>
        <StyledCloseButton onClick={() => (window.location.href = "/")}>
          x
        </StyledCloseButton>
        <StyledUl>
          <StyledFilterLabel>Author: </StyledFilterLabel>
          <StyledFilterInput
            type="search"
            placeholder="Search..."
            value={author}
            onChange={handleAuthorChange}
          />
          <StyledFilterLabel>Category:</StyledFilterLabel>
          <select
            id="category"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">all categories</option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Food">Food</option>
            <option value="Outdoor">Outdoor</option>
          </select>
          <StyledFilterLabel>Weekday:</StyledFilterLabel>
          <div>-- coming soon --</div>
          <StyledFilterLabel>Time:</StyledFilterLabel>
          <div>-- coming soon --</div>
          <StyledFilterLabel>Day:</StyledFilterLabel>
          <div>-- coming soon --</div>
        </StyledUl>
        <StyledFilterButton type="submit">ok</StyledFilterButton>
      </StyledFilterBox>
    </StyledFilterForm>
  );
}

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing.small} auto;
  max-width: calc(${theme.box.width} + 10px);
  padding-left: 5px;
  overflow: hidden;

  transition: max-height 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);

  max-height: ${(props) => (props.show ? "500px" : "0")};
`;

const StyledFilterBox = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  background-color: ${theme.primaryColor};
  padding-top: ${theme.spacing.large};
  margin-bottom: calc(${theme.spacing.small} + 5px);
`;

const StyledCloseButton = styled.button`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.small};
  top: 0.5rem;
  right: 0.5rem;
  height: ${theme.button.xs};
  width: ${theme.button.xs};
  border-width: ${theme.borderWidth.medium};
  border-radius: 5px;
  box-shadow: none;
  z-index: 99;
  &:hover,
  &:active {
    box-shadow: none;
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
  }
`;

const StyledUl = styled.ul`
  margin: auto;
  padding: 0;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.large};
`;

const StyledFilterLabel = styled.li`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
`;

const StyledFilterInput = styled.input`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 10rem;
`;

const StyledFilterButton = styled.button`
  width: 8rem;
  margin-bottom: ${theme.spacing.medium};
`;
