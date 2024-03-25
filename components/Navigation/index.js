import { useRouter } from "next/router";
import { theme } from "@/styles";
import styled from "styled-components";
import Link from "next/link";
import BackIcon from "@/Icons/BackIcon";
import CalendarIcon from "@/Icons/CalendarIcon";

export default function Navigation({ onCreateClick }) {
  const router = useRouter();

  return (
    <StyledNavigation>
      <StyledNavButtonBox>
        {router.pathname === "/joined" ? (
          <StyledSideLink href="/">
            <BackIcon />
          </StyledSideLink>
        ) : (
          <StyledSideLink href="/joined">XX</StyledSideLink>
        )}
        <StyledCenterButton onClick={onCreateClick}>create</StyledCenterButton>
        {router.pathname === "/calendar" ? (
          <StyledSideLink href="/">
            <BackIcon />
          </StyledSideLink>
        ) : (
          <StyledSideLink href="/calendar">
            <CalendarIcon />
          </StyledSideLink>
        )}
      </StyledNavButtonBox>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100%;
  bottom: 0;
  z-index: 999;
  background-color: ${theme.primaryColor};

  ::before {
    content: "";
    position: absolute;
    justify-content: center;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: ${theme.line.width};
    @media screen and (min-width: 600px) {
      width: ${theme.box.width.split("r")[0] * 1.4 * 1.075 + "rem"};
    }
    @media screen and (min-width: 900px) {
      width: ${theme.box.width.split("r")[0] * 1.6 * 1.075 + "rem"};
    }
    @media screen and (min-width: 1200px) {
      width: ${theme.box.width.split("r")[0] * 1.8 * 1.075 + "rem"};
    }
    height: ${theme.borderWidth.thin};
    background-color: ${theme.textColor};
  }
`;

const StyledNavButtonBox = styled.div`
  display: flex;
  width: ${theme.box.width};
  @media screen and (min-width: 600px) {
    width: ${theme.box.width.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 900px) {
    width: ${theme.box.width.split("r")[0] * 1.6 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    width: ${theme.box.width.split("r")[0] * 1.8 + "rem"};
  }
  justify-content: space-between;
  padding-top: ${theme.spacing.medium};
  padding-bottom: ${theme.spacing.medium};
`;

const StyledSideLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fonts.heading};
  padding: ${theme.spacing.small};
  height: ${theme.button.large};
  width: ${theme.button.large};
  background-color: ${theme.primaryColor};
  border-color: ${theme.textColor};
  border-radius: ${theme.borderRadius.medium};
  border-width: ${theme.borderWidth.medium};
  border-style: solid;
  box-shadow: ${theme.box.shadow};
  @media screen and (min-width: 600px) {
    height: ${theme.button.large.split("r")[0] * 1.4 + "rem"};
    width: ${theme.button.large.split("r")[0] * 1.4 + "rem"};
    font-size: ${theme.fontSizes.small};
  }
  @media screen and (min-width: 900px) {
    height: ${theme.button.large.split("r")[0] * 1.6 + "rem"};
    width: ${theme.button.large.split("r")[0] * 1.6 + "rem"};
    font-size: ${theme.fontSizes.medium};
  }
  @media screen and (min-width: 1200px) {
    height: ${theme.button.large.split("r")[0] * 1.8 + "rem"};
    width: ${theme.button.large.split("r")[0] * 1.8 + "rem"};
  }
`;

const StyledCenterButton = styled.button`
  height: ${theme.button.large};
  width: ${theme.button.xl};
  @media screen and (min-width: 600px) {
    height: ${theme.button.large.split("r")[0] * 1.4 + "rem"};
    width: ${theme.button.xl.split("r")[0] * 1.4 + "rem"};
    font-size: ${theme.fontSizes.small};
  }
  @media screen and (min-width: 900px) {
    height: ${theme.button.large.split("r")[0] * 1.6 + "rem"};
    width: ${theme.button.xl.split("r")[0] * 1.6 + "rem"};
    font-size: ${theme.fontSizes.medium};
  }
  @media screen and (min-width: 1200px) {
    height: ${theme.button.large.split("r")[0] * 1.8 + "rem"};
    width: ${theme.button.xl.split("r")[0] * 1.8 + "rem"};
  }
`;
