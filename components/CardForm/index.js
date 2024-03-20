import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import BackIcon from "@/Icons/BackIcon";
import SaveIcon from "@/Icons/SaveIcon";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";

export default function CardForm({
  onSubmit,
  onCancel,
  existingActivityData,
  pageTitle,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(
    existingActivityData?.category || ""
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <StyledCardForm onSubmit={onSubmit}>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      {pageTitle && <StyledPageTitle>{pageTitle}</StyledPageTitle>}
      <StyledActivityNameBox selectedCategory={selectedCategory}>
        <label htmlFor="name" />
        <StyledActivityNameInput
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          minLength="3"
          maxLength="20"
          placeholder="My activity"
          defaultValue={existingActivityData?.name || ""}
          autoFocus
          required
        />
      </StyledActivityNameBox>
      <StyledInputBox>
        <StyledUpperInputBox>
          <label htmlFor="author">Author: </label>
          <StyledInputField
            type="text"
            id="author"
            name="author"
            autoComplete="off"
            defaultValue={existingActivityData?.author || ""}
            required
          />
          <label htmlFor="date">Date: </label>
          <StyledInputField
            type="date"
            id="date"
            name="date"
            autoComplete="off"
            defaultValue={existingActivityData?.date || ""}
            required
          />
          <label htmlFor="time">Time: </label>
          <StyledInputField
            type="time"
            id="time"
            name="time"
            autoComplete="off"
            defaultValue={existingActivityData?.time || ""}
            required
          />
          <label htmlFor="location">Location: </label>
          <StyledInputField
            type="text"
            id="location"
            name="location"
            autoComplete="off"
            defaultValue={existingActivityData?.location || ""}
            required
          />
          <label htmlFor="category">Category: </label>
          <StyledCategoryInput
            type="text"
            id="category"
            name="category"
            defaultValue={existingActivityData?.category || ""}
            onChange={handleCategoryChange}
          >
            <option value=""></option>
            <option value="Sports">Sports</option>
            <option value="Culture">Culture</option>
            <option value="Food">Food</option>
            <option value="Outdoor">Outdoor</option>
          </StyledCategoryInput>
        </StyledUpperInputBox>
        <StyledDescriptionBox>
          <label htmlFor="description">Description: </label>
          <StyledTextArea
            autoComplete="off"
            cols="45"
            rows="8"
            type="text"
            id="description"
            name="description"
            defaultValue={existingActivityData?.description || ""}
            placeholder={"Add more details..."}
          />
        </StyledDescriptionBox>
        <StyledButtonBox>
          <StyledButton type="button" onClick={onCancel}>
            <BackIcon />
          </StyledButton>
          <StyledButton type="submit">+{/* <SaveIcon /> */}</StyledButton>
        </StyledButtonBox>
      </StyledInputBox>
    </StyledCardForm>
  );
}

const categoryColors = {
  Sports: `${theme.secondaryColors.sports}`,
  Culture: `${theme.secondaryColors.culture}`,
  Food: `${theme.secondaryColors.food}`,
  Outdoor: `${theme.secondaryColors.outdoor}`,
};

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.small};
  width: ${theme.box.width};
`;

const StyledLogoWrapper = styled.div`
  width: ${theme.button.xs};
  height: ${theme.button.xs};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledPageTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
`;

const StyledCardForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: ${theme.spacing.small};
  width: ${theme.box.width};
  gap: 0.5rem;
  justify-content: space-evenly;
`;

const StyledActivityNameBox = styled.div`
  display: flex;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  height: ${theme.box.height};
  background-color: ${(props) =>
    props.selectedCategory
      ? categoryColors[props.selectedCategory]
      : "transparent"};
`;

const StyledActivityNameInput = styled.input`
  display: inline-block;
  margin: auto;
  width: 95%;
  height: 90%;
  background-color: transparent;
  border: none;
  color: ${theme.textColor};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.medium};
  text-align: center;
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
  &::placeholder {
    opacity: 0.9;
    border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled.button`
  height: ${theme.button.medium};
  width: ${theme.button.medium};
`;

const StyledInputBox = styled.div`
  margin: auto;
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.large};
  padding-bottom: ${theme.spacing.medium};
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.small};
`;

const StyledUpperInputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: ${theme.spacing.medium};
`;

const StyledInputField = styled.input`
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes.small};
  width: 8rem;
  background-color: ${theme.primaryColor};
  border: none;
  border-bottom: ${theme.borderWidth.thin} solid rgba(0, 0, 0, 0.3);
`;

const StyledCategoryInput = styled.select`
  width: 8rem;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes.small};
  text-align: center;
  background-color: ${theme.primaryColor};
  border: none;
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const StyledTextArea = styled.textarea`
  resize: none;
  font-family: ${theme.fonts.text};
  font-size: ${theme.fontSizes.small};
  padding: ${theme.spacing.small};
  border: ${theme.borderWidth.thin} solid ${theme.textColor};
  border-radius: ${theme.borderRadius.small};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadowSmall};
  background-color: ${theme.primaryColor};
  &::placeholder {
    font-family: ${theme.fonts.text};
    font-size: ${theme.fontSizes.small};
    opacity: 0.5;
  }
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.medium};
  gap: 1rem;
`;
