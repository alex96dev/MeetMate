import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function CardForm() {
  const { mutate } = useSWR("/api/activities");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
    console.log(activityData);
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });
    if (response.ok) {
      mutate();
      event.target.reset();
      router.push("/");
    }
  }

  return (
    <StyledCardForm onSubmit={handleSubmit}>
      <h1>Create Activity</h1>

      <label htmlFor="author">Author: </label>
      <StyledInputField type="text" id="author" name="author" required />
      <label htmlFor="name">Name of Activity: </label>
      <StyledInputField type="text" id="name" name="name" required />
      <label htmlFor="date">Date: </label>
      <StyledInputField type="date" id="date" name="date" required />
      <label htmlFor="time">Time: </label>
      <StyledInputField type="time" id="time" name="time" required />
      <label htmlFor="location">Location: </label>
      <StyledInputField type="text" id="location" name="location" required />
      <label htmlFor="category">Category: </label>
      <select type="text" id="category" name="category">
        {/* <option value="" disabled selected>
          --Please choose on option--
        </option> */}
        <option></option>
        <option value="Sports">Sports</option>
        <option value="Culture">Culture</option>
        <option value="Food">Food</option>
      </select>
      <label htmlFor="description">Description: </label>
      <textarea
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
        style={{ resize: "none" }}
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
