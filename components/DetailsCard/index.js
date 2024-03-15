import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import CardForm from "../CardForm";
import { useState, useEffect } from "react";
import { theme } from "@/styles";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const [joinState, setJoinState] = useState({
    isJoined: false,
    joinButtonColor: `${theme.secondaryColors}`,
    joinButtonText: "Join",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        const json = await response.json();
        const joinButtonColor = json.joined
          ? `${theme.alertColor}`
          : `${theme.secondaryColors}`;
        const joinButtonText = json.joined ? "Disjoin" : "Join";

        setJoinState((prevState) => ({
          ...prevState,
          isJoined: json.joined,
          joinButtonColor,
          joinButtonText,
        }));
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
    const updatedIsJoined = !joinState.isJoined;
    setJoinState((prevState) => ({
      ...prevState,
      isJoined: updatedIsJoined,
      joinButtonColor: updatedIsJoined
        ? `${theme.alertColor}`
        : `${theme.secondaryColors}`,
      joinButtonText: updatedIsJoined ? "Disjoin" : "Join",
    }));

    const response = await fetch(`/api/activities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ joined: updatedIsJoined }),
    });
    if (response.ok) {
      mutate();
    }
  }

  return (
    <StyledDetailsCard>
      <StyledAcitivityNameBox category={activities.category}>
        <StyledJoinedmark>{joinState.isJoined && <p>XX</p>}</StyledJoinedmark>
        <StyledActivityName>{activities.name}</StyledActivityName>
      </StyledAcitivityNameBox>
      <StyledInformationBox>
        <StyledUl>
          <StyledListBoldItem>Author: {activities.author}</StyledListBoldItem>
          <StyledListBoldItem>Date: {activities.date}</StyledListBoldItem>
          <StyledListBoldItem>Time: {activities.time}</StyledListBoldItem>
          <StyledListBoldItem>
            Location: {activities.location}
          </StyledListBoldItem>
          {activities.category !== "" && (
            <StyledListItem>Category: {activities.category}</StyledListItem>
          )}
          <StyledListItem>Description:</StyledListItem>
        </StyledUl>
        {activities.description !== "" && (
          <StyledDescription>{activities.description}</StyledDescription>
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
              if (
                window.confirm("Do you really want to delete this activity?")
              ) {
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
      </StyledInformationBox>
    </StyledDetailsCard>
  );
}

const StyledDetailsCard = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  margin: ${theme.spacing.xl} auto;
  justify-content: space-evenly;
`;

const StyledInformationBox = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.large};
`;

const StyledListBoldItem = styled.li`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  padding-bottom: ${theme.spacing.small};
`;

const StyledListItem = styled.li`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.text};
  padding-bottom: ${theme.spacing.small};
`;

const StyledJoinedmark = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;
`;
const StyledAcitivityNameBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.box.shadow};
  width: ${theme.box.width};

  background-color: ${({ category }) => {
    switch (category) {
      case "Sports":
        return theme.secondaryColors.sports;
      case "Culture":
        return theme.secondaryColors.culture;
      case "Food":
        return theme.secondaryColors.food;
      case "Outdoor":
        return theme.secondaryColors.outdoor;
      default:
        return theme.secondaryColors.default;
    }
  }};
`;

const StyledActivityName = styled.h2`
  font-size: ${theme.fontSizes.large};
`;

const StyledDescription = styled.p`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  margin: 0;
  margin-top: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.xl};
`;

const StyledUl = styled.ul`
  margin: 0;
`;

const StyledButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  padding: ${theme.spacing.medium};
`;

const StyledDeleteButton = styled.button``;

const StyledJoinButton = styled.button`
  width: 250px;
  background-color: ${(props) => props.backgroundcolor || "green"};
`;
const StyledCloseButton = styled.button``;

const StyledEditButton = styled.button``;
