import ActivityCard from "../ActivityCard";
import { theme } from "@/styles";
import styled from "styled-components";
import Link from "next/link";

export default function NextActivity({ activities }) {
  const joinedFutureActivities = activities.filter((activity) => {
    const activityDateTime = new Date(`${activity.date}T${activity.time}`);
    const currentDateTime = new Date();
    return activity.joined && activityDateTime > currentDateTime;
  });

  joinedFutureActivities.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  if (joinedFutureActivities.length === 0) {
    return (
      <div>No upcomming activity found, you should join your friends! </div>
    );
  }

  const nextActivity = joinedFutureActivities[0];

  return (
    <>
      <StyledCardSection>
        <StyledSecondary>Your next Activity:</StyledSecondary>
        <Link key={nextActivity._id} href={`/${nextActivity._id}`}>
          <ActivityCard
            name={nextActivity.name}
            date={nextActivity.date}
            time={nextActivity.time}
            joined={nextActivity.joined}
            category={nextActivity.category}
          />
        </Link>
      </StyledCardSection>
      <StyledLine />
    </>
  );
}

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 1.2rem;
`;

const StyledLine = styled.div`
  position: relative;
  width: ${theme.line.width};
  height: 1px;
  background-color: ${theme.textColor};
  margin-top: -10px;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 1.2rem;
`;

const StyledSecondary = styled.div`
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.heading};
  margin-bottom: 1.2rem;
  width: ${theme.box.width};
`;
