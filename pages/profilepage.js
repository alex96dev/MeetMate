import { theme } from "@/styles";
import styled from "styled-components";
import Logo from "@/Icons/Logo";
import UserProfile from "@/components/UserProfile";
import JoinedActivities from "@/components/JoinedActivities/joined";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

export default function ProfilePage() {
  return (
    <StyledProfileWrapper>
      <StyledFriendlistLink href="/">
        <FiHome size={theme.button.xs} color={theme.textColor} />
      </StyledFriendlistLink>
      <StyledHeadlineBox>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <StyledAppName> MeetMate</StyledAppName>
      </StyledHeadlineBox>
      <StyledHeadline>My Profile</StyledHeadline>
      <p>This is me:</p>
      <Link key="friendlist" href="/friendlist">
        <UserProfile />
      </Link>
      <JoinedActivities />
    </StyledProfileWrapper>
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

const StyledProfileWrapper = styled.div`
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
  width: 1.7rem;
  height: 1.7rem;
`;

const StyledAppName = styled.h1`
  font-size: ${theme.fontSizes.small};
  margin: 0;
  padding-top: 0.3rem;
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
