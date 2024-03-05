import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import CardForm from "../CardForm";
import { useState } from "react";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activities,
    isLoading,
    mutate,
  } = useSWR(`/api/activities/${id}`);

  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!activities) {
    return;
  }

  async function handleEditActivity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });
    if (response.ok) {
      mutate();
      setIsEditMode(false);
      event.target.reset();
    }
  }

  return (
    <StyledDetailsCard>
      <h1>{activities.name}</h1>
      <ul>
        <li>author: {activities.author}</li>
        <li>date: {activities.date}</li>
        <li>time: {activities.time}</li>
        <li>location: {activities.location}</li>
        {activities.category !== "" && <li>category: {activities.category}</li>}
      </ul>
      {activities.description !== "" && (
        <p>description: {activities.description}</p>
      )}
      <StyledButtonBox>
        <Link href="/">
          <StyledCloseButton>Close</StyledCloseButton>
        </Link>
        <StyledEditButton
          type="button"
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          {" "}
          {isEditMode ? "Cancel Edit" : "Edit Activity"}
        </StyledEditButton>
      </StyledButtonBox>
      {isEditMode && <CardForm onSubmit={handleEditActivity} />}
    </StyledDetailsCard>
  );
}

const StyledDetailsCard = styled.div`
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

const StyledButtonBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledCloseButton = styled.button``;

const StyledEditButton = styled.button``;
