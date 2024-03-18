import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import PlaceholderLogo from "@/Icons/Placeholder";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  return (
    <>
      <StyledHeadlineBox>
        <PlaceholderLogo />
        <h1>MeetMate</h1>
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
      <Navigation />
    </>
  );
}

const StyledHeadlineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: ${theme.spacing.medium};
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 6rem;
`;
