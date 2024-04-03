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
import { FiLogOut, FiUser } from "react-icons/fi";
import CardForm from "@/components/CardForm";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import useStore from "@/store";
import NextActivity from "@/components/NextActivity";
import { toast } from "react-toastify";

export default function HomePage({ onSubmit }) {
  const { data: session, status } = useSession();
  const { data: activities, isLoading: activitiesIsLoading } =
    useSWR("/api/activities");
  const { data: appUsers, isLoading: appUsersIsLoading } = useSWR("/api/users");
  const [appUserFriendsList, setAppUserFriendsList] = useState([]);
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(null);
  const [city, setCity] = useState("Berlin");
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const {
    setIsEditMode,
    isCreateMode,
    setIsCreateMode,
    handleCreateClick,
    handleCloseClick,
  } = useStore();

  useEffect(() => {
    const hasDisplayedToast = sessionStorage.getItem("hasDisplayedToast");
    if (session && !hasDisplayedToast) {
      toast.success(`Signed in as ${session.user.email}`);
      sessionStorage.setItem("hasDisplayedToast", true);
    }

    return () => {
      if (!session) {
        sessionStorage.removeItem("hasDisplayedToast");
      }
    };
  }, [session]);

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
        if (appUsers && session?.user?.id) {
          const user = appUsers.find((user) => user._id === session.user.id);
          setAppUserFriendsList(user?.friends || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (appUsers) {
      fetchData();
    }
  }, [appUsers, session, city]);

  if (!activities) return <div>failed to load</div>;

  if (
    activitiesIsLoading ||
    status === "loading" ||
    appUsersIsLoading ||
    !appUsers
  )
    return <div>loading...</div>;

  if (!session) {
    return <LoginPage />;
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = ({ author, category }) => {
    setAuthorFilter(author);
    setCategoryFilter(category);
  };

  function getFilteredActivities() {
    if (activitiesIsLoading || !activities) {
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

  return (
    <>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledHeadline>MeetMate</StyledHeadline>
        {/* <StyledUpperButtonWrapper>
          <StyledFriendlistLink href="/friendlist">
            <StyledFiUser size={theme.button.xs} color={theme.textColor} />
          </StyledFriendlistLink>
          <StyledLogoutButton onClick={() => signOut()}>
            <StyledFiLogOut size={theme.button.xs} color={theme.textColor} />
          </StyledLogoutButton>
        </StyledUpperButtonWrapper> */}
      </StyledHeadlineBox>
      <StyledSearchFilterBox>
        <SearchBar onSearch={handleSearch} />
        <StyledUpperButtonWrapper>
          <StyledFilterButton onClick={toggleFilterWindow}>
            <StyledHiOutlineAdjustmentsHorizontal
              size={theme.button.xs}
              color={theme.textColor}
            />
          </StyledFilterButton>
          <StyledFriendlistLink href="/friendlist">
            <StyledFiUser size={theme.button.xs} color={theme.textColor} />
          </StyledFriendlistLink>
          <StyledLogoutButton onClick={() => signOut()}>
            <StyledFiLogOut size={theme.button.xs} color={theme.textColor} />
          </StyledLogoutButton>
        </StyledUpperButtonWrapper>
      </StyledSearchFilterBox>
      <Filter onSubmit={handleFilter} showFilterWindow={showFilterWindow} />
      <StyledWeather>
        {weather !== null && `${weather}°C`}
        {condition !== null && (
          <Image
            src={`https:${condition}`}
            width={50}
            height={50}
            alt="Weather Icon"
          />
        )}
        <StyledWeatherLocation>Berlin</StyledWeatherLocation>
      </StyledWeather>
      <NextActivity activities={activities} />
      <StyledCardSection>
        {displayedActivities.length > 0 ? (
          displayedActivities
            .filter((activity) =>
              appUserFriendsList?.find((user) => user === activity.authorId)
            )
            .map((activity) => (
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

const StyledHeadlineBox = styled.div`
  display: flex;
  align-items: center;
  width: ${theme.box.width};
  margin: 0 auto;
  gap: ${theme.spacing.xs};
  padding-bottom: ${theme.spacing.medium};
  padding-top: ${theme.spacing.large};
`;

const StyledLogoWrapper = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  margin: 0;
  padding: 0.15rem;
`;

const StyledHeadline = styled.h1`
  margin: 0;
`;

const StyledSearchFilterBox = styled.div`
  display: flex;
  position: relative;
  gap: ${theme.spacing.small};
  margin: 0 auto;
  margin-bottom: 0;
  width: 20rem;
  height: 3rem;
`;

const StyledUpperButtonWrapper = styled.div`
  display: flex;
  right: 0;
  top: 0;
  bottom: ${theme.spacing.small};

  gap: ${theme.spacing.small};
`;

const StyledLogoutButton = styled.button`
  padding: ${theme.spacing.xs};
  height: ${theme.button.small};
  min-width: ${theme.button.small};
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledFilterButton = styled.button`
  height: ${theme.button.small};
  min-width: ${theme.button.small};
  padding: 0.25rem;
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledFiLogOut = styled(FiLogOut)`
  width: 100%;
  height: 100%;
`;

const StyledFriendlistLink = styled(Link)`
  height: ${theme.button.small};
  min-width: ${theme.button.small};
  padding: ${theme.spacing.xs};
  background-color: ${theme.primaryColor};
  border-color: ${theme.textColor};
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  border-style: solid;
  box-shadow: ${theme.box.shadowSmall};
`;

const StyledFiUser = styled(FiUser)`
  width: 100%;
  height: 100%;
`;

const StyledHiOutlineAdjustmentsHorizontal = styled(
  HiOutlineAdjustmentsHorizontal
)`
  width: 100%;
  height: 100%;
`;

const StyledWeather = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0 auto;
  margin-top: -1.5rem;
  margin-bottom: ${theme.spacing.small};
  width: ${theme.box.width};
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.heading};
`;

const StyledWeatherLocation = styled.h2`
  padding-left: ${theme.spacing.small};
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 6rem;
`;
