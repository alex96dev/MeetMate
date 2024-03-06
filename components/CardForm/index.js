import styled from "styled-components";
import Link from "next/link";

export default function CardForm({ onSubmit }) {
  return (
    <StyledCardForm onSubmit={onSubmit}>
      <h1>Create Activity</h1>

      <label htmlFor="author">Author: </label>
      <StyledInputField
        type="text"
        id="author"
        name="author"
        autocomplete="off"
        required
      />
      <label htmlFor="name">Name of Activity: </label>
      <StyledInputField
        type="text"
        id="name"
        name="name"
        autocomplete="off"
        required
      />
      <label htmlFor="date">Date: </label>
      <StyledInputField
        type="date"
        id="date"
        name="date"
        autocomplete="off"
        required
      />
      <label htmlFor="time">Time: </label>
      <StyledInputField
        type="time"
        id="time"
        name="time"
        autocomplete="off"
        required
      />
      <label htmlFor="location">Location: </label>
      <StyledInputField
        type="text"
        id="location"
        name="location"
        autocomplete="off"
        required
      />
      <label htmlFor="category">Category: </label>
      <select type="text" id="category" name="category">
        <option></option>
        <option value="Sports">Sports</option>
        <option value="Culture">Culture</option>
        <option value="Food">Food</option>
      </select>
      <label htmlFor="description">Description: </label>
      <StyledTextArea
        autocomplete="off"
        cols="45"
        rows="8"
        type="text"
        id="description"
        name="description"
        placeholder={
          "Describe your activity..." +
          String.fromCharCode(10) +
          "- Add the min. and max. number of participants" +
          String.fromCharCode(10) +
          "- Add hashtags like #indoor #creative ..."
        }
      />
      <StyledBottonBox>
        <StyledSaveButton type="submit">Save</StyledSaveButton>
        <Link href="/">
          <StyledCancelButton type="button">Cancel</StyledCancelButton>
        </Link>
      </StyledBottonBox>
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
  width: 600px;
  gap: 0.5rem;
  justify-content: space-evenly;
  border-radius: 15px;
`;

const StyledSaveButton = styled.button``;
const StyledCancelButton = styled.button``;

const StyledInputField = styled.input`
  min-width: 200px;
`;

const StyledBottonBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledTextArea = styled.textarea`
  resize: "none";
`;
