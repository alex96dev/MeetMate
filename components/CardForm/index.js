import styled from "styled-components";
import BackIcon from "@/Icons/BackIcon";
import SaveIcon from "@/Icons/SaveIcon";
import { theme } from "@/styles";

export default function CardForm({ onSubmit, onCancel, existingActivityData }) {
  return (
    <StyledCardForm onSubmit={onSubmit}>
      <h1>Create Activity</h1>

      <label htmlFor="author">Author: </label>
      <StyledInputField
        type="text"
        id="author"
        name="author"
        autocomplete="off"
        defaultValue={existingActivityData?.author || ""}
        required
      />
      <label htmlFor="name">Name of Activity: </label>
      <StyledInputField
        type="text"
        id="name"
        name="name"
        autocomplete="off"
        minLength="3"
        maxLength="20"
        defaultValue={existingActivityData?.name || ""}
        required
      />
      <label htmlFor="date">Date: </label>
      <StyledInputField
        type="date"
        id="date"
        name="date"
        autocomplete="off"
        defaultValue={existingActivityData?.date || ""}
        required
      />
      <label htmlFor="time">Time: </label>
      <StyledInputField
        type="time"
        id="time"
        name="time"
        autocomplete="off"
        defaultValue={existingActivityData?.time || ""}
        required
      />
      <label htmlFor="location">Location: </label>
      <StyledInputField
        type="text"
        id="location"
        name="location"
        autocomplete="off"
        defaultValue={existingActivityData?.location || ""}
        required
      />
      <label htmlFor="category">Category: </label>
      <select
        type="text"
        id="category"
        name="category"
        defaultValue={existingActivityData?.category || ""}
      >
        <option value="">--Choose category--</option>
        <option value="Sports">Sports</option>
        <option value="Culture">Culture</option>
        <option value="Food">Food</option>
        <option value="Outdoor">Outdoor</option>
      </select>
      <label htmlFor="description">Description: </label>
      <StyledTextArea
        autocomplete="off"
        cols="45"
        rows="8"
        type="text"
        id="description"
        name="description"
        defaultValue={existingActivityData?.description || ""}
        placeholder={
          "Describe your activity..." +
          String.fromCharCode(10) +
          "- Add the min. and max. number of participants" +
          String.fromCharCode(10) +
          "- Add hashtags like #indoor #creative ..."
        }
      />
      <StyledButtonBox>
        <StyledButton type="button" onClick={onCancel}>
          <BackIcon />
        </StyledButton>
        <StyledButton type="submit">
          <SaveIcon />
        </StyledButton>
      </StyledButtonBox>
    </StyledCardForm>
  );
}

const StyledCardForm = styled.form`
  display: flex;
  border-style: solid;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  padding: 10px;
  width: 90%;
  gap: 0.5rem;
  justify-content: space-evenly;
  border-radius: 15px;
`;

const StyledButton = styled.button`
  height: ${theme.button.medium};
  width: ${theme.button.medium};
`;

const StyledInputField = styled.input`
  min-width: 200px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledTextArea = styled.textarea`
  resize: "none";
`;
