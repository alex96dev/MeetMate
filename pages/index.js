import React, { useState } from "react";
import styled from "styled-components";
import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import PlaceholderLogo from "@/components/Logo/placeholder";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import SearchBar from "/components/SearchBar";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  let displayedActivities = searchTerm ? filteredActivities : activities;

  return (
    <>
      <StyledHeadlineBox>
        <PlaceholderLogo />
        <h1>MeetMate</h1>
      </StyledHeadlineBox>
      <SearchBar onSearch={handleSearch} />
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
`;
