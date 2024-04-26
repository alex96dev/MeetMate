import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Logo from "@/Icons/Logo";
import { theme } from "@/styles";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import useAuthentication from "./api/auth/useAuthentication";
import UserProfile from "@/components/UserProfile";
import FriendRequest from "@/components/FriendRequest";
import { FiUserPlus, FiHome } from "react-icons/fi";
import useSWR from "swr";
import Fuse from "fuse.js";
import SearchForm from "@/components/SearchForm";
import handleDeleteClick from "@/utils/pages/friendlist/handleDeleteClick";
import handleSendFriendRequest from "@/utils/pages/friendlist/handleSendFriendRequest";

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};

export default function FriendList({ onSubmit, setIsEditMode }) {
  const { authenticated, loading, session } = useAuthentication();
  const userId = session?.user?.id;
  const [myMates, setMyMates] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [showRequestWindow, setShowRequestWindow] = useState(false);
  const [mates, setMates] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const {
    data: allUser,
    error: error2,
    isLoading: isLoading2,
  } = useSWR(`/api/users`);

  useEffect(() => {
    if (session) {
      setMyMates(session.user?.friends);
      setFriendRequests(session.user?.friendRequests);
    }
  }, [session]);

  const { error, isLoading } = useSWR(`/api/users`, {
    onSuccess: (fetchedUsers) => {
      setFuse(new Fuse(fetchedUsers, fuseOptions));
    },
  });

  const handleCreateClick = () => {
    setIsCreateMode(true);
  };

  const handleCloseClick = () => {
    setIsCreateMode(false);
  };

  async function handleSearch(event) {
    event.preventDefault();

    setIsSearching(true);

    const searchTerm = event.target.value;
    if (!fuse) return;

    const searchResult = fuse.search(searchTerm);
    const updatedSearchResult = searchResult.map((result) => result.item);

    setMates(updatedSearchResult);

    // setTimeout(() => setIsSearching(false), 5000);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const toggleRequestWindow = () => {
    setShowRequestWindow(!showRequestWindow);
  };

  if (isLoading2) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <StyledFriendList>
      <StyledFriendlistLink href="/">
        <FiHome size={theme.button.xs} color={theme.textColor} />
      </StyledFriendlistLink>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledHeadline>Me and my Mates</StyledHeadline>
      <p>This is me:</p>
      <UserProfile />
      <StyledSearchbarBox>
        <SearchForm onSearch={handleSearch} onKeyPress={handleKeyPress} />
        <button onClick={toggleRequestWindow}>
          <FiUserPlus size={theme.button.xs} color={theme.textColor} />
        </button>
      </StyledSearchbarBox>
      {isSearching && mates.length !== 0 && (
        <>
          <StyledMatesLabel>Potential Mates:</StyledMatesLabel>
          <StyledList>
            {mates.map((mate) => (
              <StyledFriendCard key={mate._id}>
                <StyledDivLeft>
                  <StyledFriendName>{mate.name}</StyledFriendName>
                </StyledDivLeft>
                <StyledDivRight>
                  {allUser?.find(
                    (user) =>
                      user._id ===
                      session.user.friends.find((friend) => friend === mate._id)
                  ) !== undefined ? (
                    "Already Friends"
                  ) : (
                    <StyledButtonAddFriend
                      onClick={() =>
                        handleSendFriendRequest(
                          mate._id,
                          userId,
                          setFriendRequests,
                          friendRequests
                        )
                      }
                    >
                      +
                    </StyledButtonAddFriend>
                  )}
                </StyledDivRight>
              </StyledFriendCard>
            ))}
          </StyledList>
        </>
      )}
      {isSearching && mates.length === 0 && (
        <div>No users matching your query were found</div>
      )}
      {allUser && myMates && (
        <FriendRequest
          showRequestWindow={showRequestWindow}
          friendRequestList={friendRequests}
          allUsers={allUser}
          session={session}
          myMates={myMates}
          setMyMates={setMyMates}
          userId={userId}
        />
      )}

      <StyledLine />
      <p>These are my Mates:</p>
      <StyledCardSection>
        {allUser &&
          allUser
            .filter((user) => myMates.find((friend) => friend === user._id))
            .map((user) => (
              <StyledFriendCard key={user._id}>
                <StyledDivLeft>
                  <StyledFriendName>{user.name}</StyledFriendName>
                </StyledDivLeft>
                <StyledDivRight>
                  <StyledButtonDeleteFriend
                    onClick={() =>
                      handleDeleteClick(user._id, userId, myMates, setMyMates)
                    }
                  >
                    x
                  </StyledButtonDeleteFriend>
                </StyledDivRight>
              </StyledFriendCard>
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
    </StyledFriendList>
  );
}

const StyledFriendlistLink = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${theme.button.medium};
  width: ${theme.button.medium};
  background-color: ${theme.primaryColor};
  border-color: ${theme.textColor};
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  border-style: solid;
  box-shadow: ${theme.box.shadow};
  right: 3.2rem;
`;

const StyledFriendList = styled.div`
  margin: ${theme.spacing.small} auto;
  max-width: ${theme.box.width};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
`;

const StyledHeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const StyledHeadline = styled.h1`
  text-align: center;
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

const StyledLogoWrapper = styled.div`
  width: 1.7rem;
  height: 1.7rem;
`;

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

const StyledFriendCard = styled.div`
  display: flex;
  position: relative;
  border-style: solid;
  width: ${theme.box.width};
  justify-content: space-evenly;
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  height: ${theme.box.friendheight};
  box-shadow: ${theme.box.shadow};
  margin-bottom: ${theme.spacing.medium};
  background-color: ${theme.primaryColor};

  @media screen and (min-width: 600px) {
    width: ${theme.box.width.split("r")[0] * 1.4 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    width: ${theme.box.width.split("r")[0] * 1.6 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    width: ${theme.box.width.split("r")[0] * 1.8 + "rem"};
    height: ${theme.box.friendheight.split("r")[0] * 1.6 + "rem"};
  }
`;

const StyledDivLeft = styled.div`
  position: absolute;
  top: 50%;
  left: ${theme.spacing.xs};
  transform: translateY(-50%);
  width: 11rem;
  @media screen and (min-width: 600px) {
    width: 19rem;
  }
  @media screen and (min-width: 900px) {
    width: 21rem;
  }
  @media screen and (min-width: 1200px) {
    width: 24rem;
  }
  align-items: center;
`;

const StyledFriendName = styled.h2`
  text-align: center;

  @media screen and (min-width: 600px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    font-size: ${theme.fontSizes.medium.split("r")[0] * 1.6 + "rem"};
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

const StyledLine = styled.div`
  position: relative;
  width: ${theme.line.width};
  height: 1px;
  background-color: ${theme.textColor};
  margin-top: -10px;
  /* top: 50%; */
  left: 50%;
  transform: translate(-50%);
`;

const StyledList = styled.div``;

const StyledSearchbarBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.2rem;
`;

const StyledMatesLabel = styled.p`
  margin-bottom: 1.2rem;
`;

const StyledDivRight = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-evenly;
  top: 50%;
  transform: translateY(-50%);
  width: 8rem;
  @media screen and (min-width: 600px) {
    width: 9rem;
  }
  @media screen and (min-width: 900px) {
    width: 11rem;
  }
  @media screen and (min-width: 1200px) {
    width: 12rem;
  }
  height: 85%;
  border-left: solid;
  right: 0;
  border-width: ${theme.borderWidth.thin};
`;

const StyledButtonAddFriend = styled.button`
  width: 2rem;
  height: 2rem;
  margin-top: 2px;
  background-color: ${theme.confirmColor};
`;

const StyledButtonDeleteFriend = styled.button`
  width: 2rem;
  height: 2rem;
  margin-top: 2px;
  background-color: ${theme.alertColor};
`;
