import styled from "styled-components";
import { theme } from "@/styles";
import handleRemoveFromFriendRequests from "@/utils/components/FriendRequest/handleRemoveFromFriendRequests";
import handleAccept from "@/utils/components/FriendRequest/handleAccept";

export default function FriendRequest({
  showRequestWindow,
  friendRequestList,
  allUsers,
  session,
  myMates,
  setMyMates,
  userId,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <StyledRequestBox $show={showRequestWindow} onSubmit={handleSubmit}>
      <div>
        <p>We wanna be your Mates!</p>
        {allUsers &&
          friendRequestList.map((request) => (
            <StyledFriendCard key={request}>
              <StyledDivLeft>
                <StyledFriendName>
                  {allUsers?.find((user) => user._id === request)
                    ? allUsers?.find((user) => user._id === request).name
                    : ""}
                </StyledFriendName>
              </StyledDivLeft>
              <StyledDivRight>
                <StyledButton
                  onClick={() => {
                    handleAccept(request, session, setMyMates, myMates);
                    handleRemoveFromFriendRequests(request, userId);
                  }}
                >
                  Accept
                </StyledButton>
                <StyledButton
                  onClick={() =>
                    handleRemoveFromFriendRequests(request, userId)
                  }
                >
                  x
                </StyledButton>
              </StyledDivRight>
            </StyledFriendCard>
          ))}
      </div>
    </StyledRequestBox>
  );
}

const StyledRequestBox = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${theme.primaryColor};
  padding-top: ${theme.spacing.small};
  margin: ${theme.spacing.small} auto;
  width: calc(${theme.box.width} + 10px);
  overflow: hidden;

  transition: max-height 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);

  max-height: ${(props) => (props.$show ? "2000px" : "0")};
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

const StyledButton = styled.button`
  width: 2rem;
  height: 2rem;
  margin-top: 2px;
  background-color: ${theme.alertColor};
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
