import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import CardForm from "../CardForm";
import { useState, useEffect } from "react";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";
import useStore from "@/store";
import "react-toastify/dist/ReactToastify.css";
import handleDelete from "@/utils/components/DetailsCard/handleDelete";
import handleJoin from "@/utils/components/DetailsCard/handleJoin";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = `/api/activities/${id}`;
  const { data: activities, isLoading, mutate, error } = useSWR(endpoint);
  const { isEditMode, setIsEditMode, handleEditClick } = useStore();
  const [joinState, setJoinState] = useState({
    isJoined: false,
    joinButtonText: "Join",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(endpoint);
          if (!response.ok) {
            console.error("Error fetching activity:", response.statusText);
            return;
          }
          const activityData = await response.json();

          setJoinState((prevState) => ({
            ...prevState,
            isJoined: activityData.joined,
          }));
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchData();
  }, [id, endpoint]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!activities || error) {
    return <p>Ups! Something went wrong...</p>;
  }

  return (
    <StyledDetailsCard>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledPageDetailTitle>Join your friend!</StyledPageDetailTitle>
      <StyledAcitivityNameBox category={activities.category}>
        <StyledJoinedmarkWrapper>
          {joinState.isJoined && <StyledJoinBookmark>XX</StyledJoinBookmark>}
        </StyledJoinedmarkWrapper>
        <StyledActivityName>{activities.name}</StyledActivityName>
      </StyledAcitivityNameBox>
      <StyledInformationBox>
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
        <StyledJoinButton
          isJoined={joinState.isJoined}
          onClick={() => handleJoin(setJoinState, joinState, endpoint, mutate)}
        >
          {joinState.isJoined ? "Disjoin" : "XX Join"}
        </StyledJoinButton>
        <StyledButtonBox>
          <StyledButton onClick={() => router.back()}>
            <TbArrowBackUp size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
          <StyledButton onClick={handleEditClick}>
            <FiEdit3 size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
          <StyledButton
            onClick={() => {
              if (
                window.confirm("Do you really want to delete this activity?")
              ) {
                handleDelete(endpoint, router);
              }
            }}
          >
            <FiTrash2 size={theme.button.xs} color={theme.textColor} />
          </StyledButton>
        </StyledButtonBox>
        {isEditMode && (
          <Overlay>
            <CardForm
              onCancel={() => setIsEditMode(false)}
              existingActivityData={activities}
              pageTitle="Join your friend!"
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
  margin-top: 0;
  top: 0;
  left: 0;
  padding-bottom: ${theme.spacing.medium};
  width: 100%;
  height: 100%;
  background-color: ${theme.primaryColor};
  overflow-y: auto;
`;

const StyledDetailsCard = styled.div`
  margin: ${theme.spacing.small} auto;
  max-width: ${theme.box.width};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
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

const StyledPageDetailTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
  text-align: center;
  margin: ${theme.spacing.small};
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
  height: ${theme.box.height};
  background-color: ${({ category }) => getCategoryColor(category, theme)};
`;

const StyledJoinBookmark = styled.h4`
  display: flex;
  position: absolute;
  top: -0.8rem;
  font-family: ${theme.fonts.heading};
  border: ${theme.borderWidth.medium} solid ${theme.textColor};
  border-top-left-radius: ${theme.borderRadius.small};
  border-top-right-radius: ${theme.borderRadius.small};
  border-bottom-left-radius: ${theme.borderRadius.medium};
  border-bottom-right-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.box.shadowXs};
  padding: ${theme.spacing.xs};
  padding-bottom: 0.1rem;
  background-color: white;
`;
const StyledJoinedmarkWrapper = styled.div`
  position: absolute;
  top: -1rem;
  left: 0.6rem;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.large};
`;

const StyledActivityName = styled.h2`
  font-size: ${theme.fontSizes.large};
  margin: auto;
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
  margin-top: ${theme.spacing.medium};
  padding-top: ${theme.spacing.large};
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
  font-family: ${theme.fonts.text};
  width: 80%;
  margin-top: ${theme.spacing.small};
  margin-bottom: 0;
  letter-spacing: 0.009rem;
  line-height: 1.4;
`;
const StyledJoinButton = styled.button`
  width: ${theme.button.xxl};
  margin-top: ${theme.spacing.medium};
  background-color: ${(props) =>
    props.isJoined ? `${theme.alertColor}` : `${theme.confirmColor}`};
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${theme.button.xxl};
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledButton = styled.button`
  width: ${theme.button.medium};
`;
