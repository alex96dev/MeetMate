import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import { useState } from "react";
import CardForm from "@/components/CardForm";

export default function HomePage() {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const { data: activities, isLoading } = useSWR("/api/activities");

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  const handleCreateClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseClick = () => {
    setIsCreateMode(false);
  };

  return (
    <>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledHeadline>MeetMate</StyledHeadline>
      </StyledHeadlineBox>
      <StyledCardSection>
        {activities.map((activity) => (
          <Link key={activity._id} href={`/${activity._id}`}>
            <ActivityCard
              name={activity.name}
              date={activity.date}
              time={activity.time}
              joined={activity.joined}
              category={activity.category}
            />
          </Link>
        ))}
      </StyledCardSection>

      <Navigation onCreateClick={handleCreateClick} />
      {isCreateMode && (
        <Overlay>
          <CardForm
            pageTitle="Create your activity!"
            onCancel={handleCloseClick}
          />
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.primaryColor};
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: ${theme.spacing.medium};
`;

const StyledLogoWrapper = styled.div`
  width: ${theme.button.small};
  height: ${theme.button.small};
`;

const StyledHeadline = styled.h1`
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
