import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import CardForm from "../CardForm";
import { useState, useEffect } from "react";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const [joinState, setJoinState] = useState({
    isJoined: false,
    joinButtonColor: "green",
    joinButtonText: "Join",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        const json = await response.json();
        setJoinState((prevState) => ({
           setJoinState((prevState) => {
        const joinButtonColor = json.joined ? "red" : "green";
        const joinButtonText = json.joined ? "Disjoin" : "Join";

        if (json.joined === true) {
          setJoinState((prevState) => ({
            ...prevState,
            joinButtonText: "Disjoin",
          }));
          setJoinState((prevState) => ({
            ...prevState,
            joinButtonColor: "red",
          }));
        } else {
          setJoinState((prevState) => ({
            ...prevState,
            joinButtonText: "Join",
          }));
          setJoinState((prevState) => ({
            ...prevState,
            joinButtonColor: "green",
          }));
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchData();
  }, []);

  const {
    data: activities,
    isLoading,
    mutate,
    error,
  } = useSWR(`/api/activities/${id}`);

  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!activities || error) {
    router.replace("/");
  }

  async function handleEditActivity(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const activityData = Object.fromEntries(formData.entries());

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

  async function handleDelete() {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.replace("/");
    }
  }

  async function handleJoin() {
setJoinState((prevState) => {
    const isJoined = !prevState.isJoined;
    const joinButtonColor = prevState.joinButtonColor === "green" ? "red" : "green";
    const joinButtonText = isJoined ? "Disjoin" : "Join";
    return {
      ...prevState,
      isJoined,
      joinButtonColor,
      joinButtonText,
    };
  });

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ joined: updatedIsJoined }),
    });
    if (response.ok) {
      setJoinState((prevState) => ({
        ...prevState,
        isJoined: updatedIsJoined,
      }));
      mutate();
    }
  }

  return (
    <StyledDetailsCard>
      <h1>{activities.name}</h1>
      <StyledJoinedmark>{joinState.isJoined && <p>XX</p>}</StyledJoinedmark>
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
      <StyledJoinButton
        backgroundcolor={joinState.joinButtonColor}
        onClick={handleJoin}
      >
        {joinState.joinButtonText}
      </StyledJoinButton>
      <StyledButtonBox>
        <Link href="/">
          <StyledCloseButton>Close</StyledCloseButton>
        </Link>
        <StyledEditButton
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          {" "}
          {isEditMode ? "Cancel Edit" : "Edit Activity"}
        </StyledEditButton>
        <StyledDeleteButton
          onClick={() => {
            if (window.confirm("Do you really want to delete this activity?")) {
              handleDelete();
            }
          }}
        >
          Delete
        </StyledDeleteButton>
      </StyledButtonBox>
      {isEditMode && (
        <CardForm
          onSubmit={handleEditActivity}
          existingActivityData={activities}
        />
      )}
    </StyledDetailsCard>
  );
}

const StyledDeleteButton = styled.button``;
const StyledJoinButton = styled.button`
  width: 250px;
  background-color: ${(props) => props.backgroundcolor || "green"};
`;

const StyledDetailsCard = styled.div`
  display: flex;
  position: relative;
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

const StyledJoinedmark = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;
`;
