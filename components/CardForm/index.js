import styled from "styled-components";
import Link from "next/link";
import useSWR from "swr";

export default function CardForm() {
  const { mutate } = useSWR("/api/activities");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
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
    }
  }

  return (
    <StyledCardForm onSubmit={handleSubmit}>
      <h1>Create Activity</h1>

      <label htmlFor="author">author: </label>
      <input type="text" id="author" name="author" />
      <label htmlFor="date">date: </label>
      <input type="text" id="date" name="date" />
      <label htmlFor="time">time: </label>
      <input type="text" id="time" name="time" />
      <label htmlFor="location">location: </label>
      <input type="text" id="location" name="location" />
      <label htmlFor="category">category: </label>
      <input type="text" id="category" name="category" />
      <label htmlFor="description">description: </label>
      <input type="text" id="description" name="description" />

      <StyledSaveButton type="submit">Save</StyledSaveButton>
      <Link href="/">
        <StyledCancelButton type="button">Cancel</StyledCancelButton>
      </Link>
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
  justify-content: space-evenly;
  border-radius: 15px;
`;

const StyledSaveButton = styled.button``;
const StyledCancelButton = styled.button``;
