import ActivityCard from "@/components/ActivityCard";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import PlaceholderLogo from "@/Icons/Placeholder";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import SearchBar from "/components/SearchBar";
import Image from "next/image";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("Berlin");

  useEffect(() => {
    async function fetchData() {
      const url = `http://api.weatherapi.com/v1/current.json?key=27d7a8c529bf4b43af9113412242203&q=${city}&aqi=no`;

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
    if (!searchTerm) {
      setFilteredActivities([]);
      return;
    }
    const filtered = activities.filter((activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  };
  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;
  const displayedActivities = searchTerm ? filteredActivities : activities;

  return (
    <>
      <StyledHeadlineBox>
        <PlaceholderLogo />
        <StyledHeadline>MeetMate</StyledHeadline>
      </StyledHeadlineBox>
      <StyledSearchBarContainer>
        <SearchBar onSearch={handleSearch} />
      </StyledSearchBarContainer>
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
        {searchTerm === "" &&
          activities.length > 0 &&
          activities.map((activity) => (
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
        {displayedActivities.length > 0
          ? displayedActivities.map((activity) => (
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
          : searchTerm !== "" && <div>No results found</div>}
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
  position: relative;
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

const StyledSearchBarContainer = styled.div`
  position: relative;
`;
