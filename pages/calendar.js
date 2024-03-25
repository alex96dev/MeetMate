import "react-calendar/dist/Calendar.css";
import dynamic from "next/dynamic";
import styled from "styled-components";
import useAuthentication from "./api/auth/useAuthentication";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import { theme } from "@/styles";
import Logo from "@/Icons/Logo";
import useSWR from "swr";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const CalendarPage = () => {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();
  const [selectedDateActivities, setSelectedDateActivities] = useState([]);

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  const getActivitiesForDate = (date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate();

    return activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      return date.toDateString() === activityDate.toDateString();
    });
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const activities = getActivitiesForDate(date);
      return activities.length > 0 ? (
        <StyledRenderTileContent>{activities.length}</StyledRenderTileContent>
      ) : null;
    }
  };

  const handleDateClick = (date) => {
    const activities = getActivitiesForDate(date);
    setSelectedDateActivities(activities);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <StyledCalendarPage>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledPageDetailTitle>Calendar</StyledPageDetailTitle>

      <Calendar tileContent={renderTileContent} onClickDay={handleDateClick} />

      <StyledCardSection>
        {selectedDateActivities.map((activity) => (
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
        <Navigation />
      </StyledCardSection>
    </StyledCalendarPage>
  );
};

export default CalendarPage;

const StyledRenderTileContent = styled.div`
  color: black;
  background-color: white;
`;

const StyledCalendarPage = styled.div`
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
  margin: ${theme.spacing.medium};
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${theme.spacing.medium};
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
