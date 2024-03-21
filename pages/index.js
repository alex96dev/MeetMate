import ActivityCard from "@/components/ActivityCard";
import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import PlaceholderLogo from "@/Icons/Placeholder";
import Navigation from "@/components/Navigation";
import { theme } from "@/styles";
import SearchBar from "/components/SearchBar";
import { useSession, signOut } from "next-auth/react";
import LoginPage from "./loginpage";
import LogoutIcon from "@/Icons/Logout";

export default function HomePage() {
  const { data: session } = useSession();
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
  const displayedActivities = searchTerm ? filteredActivities : activities;

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <StyledHeadlineBox>
          <PlaceholderLogo />
          <StyledHeadline>MeetMate</StyledHeadline>
          <StyledLogoutButton onClick={() => signOut()}>
            <LogoutIcon />
          </StyledLogoutButton>
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
  return (
    <>
      <LoginPage />
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

const StyledLogoutButton = styled.button`
  position: relative;
  left: ${theme.spacing.xl};
`;
