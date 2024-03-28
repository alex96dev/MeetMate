import { useState } from "react";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import { theme } from "@/styles";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import useAuthentication from "./api/auth/useAuthentication";

export default function FriendList({ onSubmit, setIsEditMode }) {
  const { authenticated, loading, session } = useAuthentication();
  const userId = session?.user?.id;
  const id = "65fd9d760c057e6bcdb880cd";

  const [isCreateMode, setIsCreateMode] = useState(false);
  const handleCreateClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseClick = () => {
    setIsCreateMode(false);
  };

  async function handleTestClick() {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return;
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error occurred while updating user:", error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  const friendCardsData = [
    { name: `Machsiemilian` },
    { name: `Annabelschnell` },
    { name: `Peter Enis` },
    { name: `Peli Kann` },
    { name: `Hom Thanks` },
    { name: `Hellga` },
    { name: `Sandra Klaus` },
    { name: `Mari Johanna` },
    { name: `User` },
    { name: `Guillermo` },
    { name: `Pedro` },
    { name: `Consuela` },
    { name: `Steven Seagull` },
  ];

  return (
    <StyledFriendList>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
        <button onClick={handleTestClick}>Add friend (Hardcoded - fix)</button>
      </StyledHeadlineBox>
      <StyledHeadline>Your Mates</StyledHeadline>
      <StyledCardSection>
        {friendCardsData.map((friend, index) => (
          <StyledFriendCard key={index}>
            <StyledDivLeft>
              <StyledActivityName>{friend.name}</StyledActivityName>
            </StyledDivLeft>
          </StyledFriendCard>
        ))}
        {!isCreateMode && <Navigation onCreateClick={handleCreateClick} />}
        {isCreateMode && (
          <Overlay>
            <CardForm
              pageTitle="Create your activity!"
              onCancel={handleCloseClick}
              setIsCreateMode={setIsCreateMode}
              setIsEditMode={setIsEditMode}
              isEditMode={false}
              onSubmit={onSubmit}
            />
          </Overlay>
        )}
      </StyledCardSection>
    </StyledFriendList>
  );
}

const StyledFriendList = styled.div`
  margin: ${theme.spacing.small} auto;
  max-width: ${theme.box.width};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StyledHeadline = styled.h1`
  text-align: center;
  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.large.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledLogoWrapper = styled.div`
  width: 1.7rem;
  height: 1.7rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: ${theme.spacing.large};
  width: 100%;
  height: 100%;
  background-color: ${theme.primaryColor};
  overflow-y: auto;
`;

const StyledFriendCard = styled.div`
  display: flex;
  position: relative;
  border-style: solid;
  width: ${theme.box.width};
  justify-content: space-evenly;
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  height: ${theme.box.friendheight};
  box-shadow: ${theme.box.shadow};
  &:hover {
    box-shadow: ${theme.box.hover};
  }
  &:active {
    box-shadow: ${theme.box.hover};
  }

  margin-bottom: ${theme.spacing.medium};
  background-color: ${theme.primaryColor};

  @media screen and (min-width: 600px) {
    width: ${theme.box.width.split("r")[0] * 1.4 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    width: ${theme.box.width.split("r")[0] * 1.6 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    width: ${theme.box.width.split("r")[0] * 1.8 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledSection = styled.section`
  top: 50%;
  transform: translateY(-50%);
  position: relative;
`;

const StyledDivLeft = styled.div`
  position: absolute;
  top: 50%;
  left: ${theme.spacing.xs};
  transform: translateY(-50%);
  width: 11rem;
  @media screen and (min-width: 600px) {
    width: 19rem;
  }
  @media screen and (min-width: 900px) {
    width: 21rem;
  }
  @media screen and (min-width: 1200px) {
    width: 24rem;
  }
  align-items: center;
`;
const StyledDivRight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 8rem;
  @media screen and (min-width: 600px) {
    width: 9rem;
  }
  @media screen and (min-width: 900px) {
    width: 11rem;
  }
  @media screen and (min-width: 1200px) {
    width: 12rem;
  }
  height: 85%;
  padding-left: 15px;
  border-left: solid;
  right: 0;
  border-width: ${theme.borderWidth.thin};
`;

const StyledActivityName = styled.h2`
  text-align: center;

  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 6rem;
  @media screen and (min-width: 600px) {
    margin-bottom: 6.5rem;
  }
  @media screen and (min-width: 900px) {
    margin-bottom: 7rem;
  }
  @media screen and (min-width: 1200px) {
    margin-bottom: 7.5rem;
  }
`;
