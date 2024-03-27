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
import { useEffect } from "react";
import CardForm from "@/components/CardForm";
import useStore from "@/store";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const CalendarPage = ({ onSubmit }) => {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();
  const [selectedDateActivities, setSelectedDateActivities] = useState([]);
  const currentDate = new Date();
  const {
    setIsEditMode,
    isCreateMode,
    setIsCreateMode,
    handleCreateClick,
    handleCloseClick,
  } = useStore();

  useEffect(() => {
    if (!isLoading && activities) {
      const activitiesForCurrentDate = getActivitiesForDate(currentDate);
      setSelectedDateActivities(activitiesForCurrentDate);
    }
  }, [isLoading, activities]);

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
        <StyledRenderTileContent>
          {activities.map((activity, index) => (
            <StyledEntry key={index} index={index} category={activity.category}>
              XX
            </StyledEntry>
          ))}
        </StyledRenderTileContent>
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
      <StyledCalendarWrapper>
        <Calendar
          tileContent={renderTileContent}
          onClickDay={handleDateClick}
          locale="en-GB"
        />
      </StyledCalendarWrapper>
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
    </StyledCalendarPage>
  );
};

export default CalendarPage;

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
  margin: ${theme.spacing.small};
`;

const StyledCalendarWrapper = styled.div`
  .react-calendar {
    font-family: ${theme.fonts.heading};
    width: ${theme.box.width};
    border-style: solid;
    border-color: ${theme.textColor};
    border-width: ${theme.borderWidth.medium};
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.box.shadow};
    padding: ${theme.spacing.xs};
    padding-top: 0;
    padding-bottom: 0;
  }
  g .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: ${theme.button.small};
  }

  .react-calendar__navigation__arrow {
    border: none;
    box-shadow: none;
  }

  .react-calendar__navigation__label {
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.heading};
    border: none;
    box-shadow: none;
  }

  .react-calendar__viewContainer {
    margin-top: ${theme.spacing.medium};
  }

  .react-calendar__month-view {
    margin: ${theme.spacing.xs};
  }

  .react-calendar__month-view__weekdays__weekday {
    flex: 1;
    text-align: center;
  }

  .react-calendar__month-view__days__day {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: ${theme.spacing.xs};
    max-width: ${theme.button.medium};
    gap: ${theme.spacing.xs};
    padding: 0;
    margin: 0;
    padding-top: ${theme.spacing.small};
    font-size: ${theme.fontSizes.xs};
    height: ${theme.button.large};
  }

  .react-calendar__month-view__days {
    :hover {
      font-weight: bold;
    }
  }

  .react-calendar__tile {
    border: none;
    box-shadow: none;
    background-color: none;
    border-radius: ${theme.borderRadius.small};
    margin: 2px;
    padding: 1px;
  }

  .react-calendar__tile--active {
    border-style: solid;
    border-color: ${theme.textColor};
    border-width: ${theme.borderWidth.thin};
    border-radius: ${theme.borderRadius.small};
    box-shadow: ${theme.box.shadowSmall};
  }

  .react-calendar__tile--now {
    background-color: ${theme.confirmColor};
    color: ${theme.textColor};
  }
`;

const StyledRenderTileContent = styled.div`
  display: flex;
  position: relative;
`;

const StyledEntry = styled.div`
  display: flex;
  position: absolute;

  top: ${({ index }) => index * -0.35 + 0.1}rem;
  left: ${({ index }) => index * -0.3 + -0.3}rem;

  font-size: ${theme.fontSizes.xs};
  color: ${theme.textColor};
  border-style: solid;
  border-color: ${theme.textColor};
  border-width: ${theme.borderWidth.thin};
  border-radius: ${theme.borderRadius.small};
  box-shadow: ${theme.box.shadowSmall};
  background-color: ${({ category }) => getCategoryColor(category, theme)};
  margin: 0;
  padding: 0.05rem;
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
