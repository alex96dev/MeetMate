import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import SearchBar from "/components/SearchBar";
import Image from "next/image";
import Filter from "@/components/Filter/Index";
import ActivityCard from "@/components/ActivityCard";
import { useSession, signOut } from "next-auth/react";
import LoginPage from "./loginpage";
import LogoutIcon from "@/Icons/Logout";
import CardForm from "@/components/CardForm";

export default function HomePage({ onSubmit, setIsEditMode }) {
  const { data: session, status } = useSession();
  const { data: activities, isLoading } = useSWR("/api/activities");
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(null);
  const [city, setCity] = useState("Berlin");
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilterWindow, setShowFilterWindow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.weatherapi.com/v1/current.json?key=27d7a8c529bf4b43af9113412242203&q=${city}&aqi=no`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        const mainTemp = result.current.temp_c;
        const condition = result.current.condition.icon;

        setWeather(mainTemp);
        setCondition(condition);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = ({ author, category }) => {
    setAuthorFilter(author);
    setCategoryFilter(category);
  };

  function getFilteredActivities() {
    if (isLoading || !activities) {
      return [];
    }

    let filteredActivities = activities;

    if (authorFilter) {
      filteredActivities = filteredActivities.filter(
        (activity) =>
          activity.author.toLowerCase() === authorFilter.toLowerCase()
      );
    }

    if (categoryFilter) {
      filteredActivities = filteredActivities.filter(
        (activity) =>
          activity.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Comment out for coding ///////////////////////////////////////////////////////////////////////
    filteredActivities = filteredActivities.filter((activity) => {
      const activityDate = new Date(`${activity.date}T${activity.time}`);
      const currentDate = new Date();
      return activityDate >= currentDate;
    });
    // Comment out for coding ///////////////////////////////////////////////////////////////////////

    return filteredActivities;
  }

  const filteredActivities = getFilteredActivities();

  const displayedActivities = searchTerm
    ? filteredActivities.filter((activity) =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredActivities;

  displayedActivities.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  const handleCreateClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseClick = () => {
    setIsCreateMode(false);
  };

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  if (isLoading || status === "loading") return <div>loading...</div>;
  if (!session) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

  return (
    <>
      Signed in as {session.user.email} <br />
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledHeadline>MeetMate</StyledHeadline>
        <StyledLogoutButton onClick={() => signOut()}>
          <LogoutIcon />
        </StyledLogoutButton>
      </StyledHeadlineBox>
      <StyledSearchFilterBox>
        <SearchBar onSearch={handleSearch} />
        <StyledFilterButton onClick={toggleFilterWindow}>
          Filter
        </StyledFilterButton>
      </StyledSearchFilterBox>
      <Filter onSubmit={handleFilter} showFilterWindow={showFilterWindow} />
      <StyledWeather>
        {weather !== null && `${weather}°C`}
        {condition !== null && (
          <Image
            src={`https:${condition}`}
            width={64}
            height={64}
            alt="Weather Icon"
          />
        )}
      </StyledWeather>
      <StyledCardSection>
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity) => (
            <Link key={activity._id} href={`/${activity._id}`}>
              <ActivityCard
                name={activity.name}
                date={activity.date}
                time={activity.time}
                joined={activity.joined}
                category={activity.category}
              />
            </Link>
          ))
        ) : (
          <div>No results found</div>
        )}
      </StyledCardSection>
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
    </>
  );
}

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
const StyledLogoutButton = styled.button`
  position: relative;
  left: ${theme.spacing.xl};
`;

const StyledFilterButton = styled.button`
  height: 2.4rem;
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: ${theme.spacing.medium};
`;

const StyledSearchFilterBox = styled.div`
  display: flex;
  gap: ${theme.spacing.medium};
  margin: 0 auto;
  width: 20rem;
  height: 3rem;
  margin-bottom: ${theme.spacing.small};
`;

const StyledLogoWrapper = styled.div`
  width: 1.7rem;
  height: 1.7rem;
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

const StyledWeather = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: 225px;
  margin: 10px;
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.heading};
`;
