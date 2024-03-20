import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import CardForm from "../CardForm";
import { useState, useEffect } from "react";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";
import DeleteIcon from "@/Icons/DeleteIcon";
import EditIcon from "@/Icons/EditIcon";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const [joinState, setJoinState] = useState({
    isJoined: false,
    joinButtonText: "Join",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        const json = await response.json();

        setJoinState((prevState) => ({
          ...prevState,
          isJoined: json.joined,
        }));
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchData();
  }, [id]);

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

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  async function handleEditActivity(event) {
    event.preventDefault();
    setIsEditMode(true);
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
      <StyledHeadlineBox>
        <StyledLogo />
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledPageTitle>Join your friend!</StyledPageTitle>
      <StyledAcitivityNameBox category={activities.category}>
        <StyledJoinedmark>{joinState.isJoined && <h2>XX</h2>}</StyledJoinedmark>
        <StyledActivityName>{activities.name}</StyledActivityName>
      </StyledAcitivityNameBox>
      <StyledInformationBox>
        <StyledCloseButton
          onClick={() => (window.location.href = "/")}
          category={activities.category}
        >
          x
        </StyledCloseButton>
        <StyledUl>
          <StyledInfoLabel>Author: </StyledInfoLabel>
          <StyledInfo>{activities.author}</StyledInfo>

          <StyledInfoLabel>Date:</StyledInfoLabel>
          <StyledInfo>{activities.date}</StyledInfo>
          <StyledInfoLabel>Time:</StyledInfoLabel>
          <StyledInfo>{activities.time}</StyledInfo>
          <StyledInfoLabel>Location:</StyledInfoLabel>
          <StyledInfo>{activities.location}</StyledInfo>
          <StyledInfoLabel>Category: </StyledInfoLabel>
          {activities.category !== "" && (
            <StyledInfo>{activities.category}</StyledInfo>
          )}
          <StyledInfoLabel>Description:</StyledInfoLabel>
        </StyledUl>
        {activities.description !== "" && (
          <StyledDescription>{activities.description}</StyledDescription>
        )}
        <StyledButtonBox>
          <StyledButton onClick={handleEditClick}>
            {" "}
            {isEditMode ? "Cancel" : <EditIcon />}
          </StyledButton>
          <StyledJoinButton isJoined={joinState.isJoined} onClick={handleJoin}>
            {joinState.isJoined ? "Disjoin" : "XX Join"}
          </StyledJoinButton>
          <StyledButton
            onClick={() => {
              if (
                window.confirm("Do you really want to delete this activity?")
              ) {
                handleDelete();
              }
            }}
          >
            <DeleteIcon />
          </StyledButton>
        </StyledButtonBox>
        {isEditMode && (
          <Overlay>
            <CardForm
              onCancel={handleCancel}
              onSubmit={handleEditActivity}
              existingActivityData={activities}
              sourcePage="details"
            />
          </Overlay>
        )}
      </StyledInformationBox>
    </StyledDetailsCard>
  );
}

const getCategoryColor = (category, theme) => {
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
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing.small} auto;
  max-width: ${theme.box.width};
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.small};
`;

const StyledLogo = styled(Logo)`
  width: 1.2rem;
  height: 1.2rem;
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.1rem;
`;

const StyledPageTitle = styled.h1`
  margin: ${theme.spacing.medium} auto;
  font-size: ${theme.fontSizes.ml};
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
  background-color: ${({ category }) => getCategoryColor(category, theme)};
`;

const StyledJoinedmark = styled.div`
  position: absolute;
  top: -1rem;
  left: 0.6rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.large};
`;

const StyledActivityName = styled.h2`
  font-size: ${theme.fontSizes.large};
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
  background-color: ${({ category }) => getCategoryColor(category, theme)};
`;

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: ${theme.spacing.medium};
  margin: auto;
  padding: 0;
  width: 80%;
`;

const StyledInfoLabel = styled.li`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
`;

const StyledInfo = styled.li`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 10rem;
`;

const StyledDescription = styled.p`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  width: 80%;
  margin-top: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.xl};
  letter-spacing: 0.009rem;
  line-height: 1.4;
`;

const StyledButtonBox = styled.div`
  display: flex;
  gap: 2rem;
  padding: ${theme.spacing.medium};
`;

const StyledButton = styled.button`
  width: ${theme.button.medium};
`;

const StyledJoinButton = styled.button`
  width: ${theme.button.lx};
  background-color: ${(props) =>
    props.isJoined ? `${theme.alertColor}` : `${theme.confirmColor}`};
`;
