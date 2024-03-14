import { theme } from "@/styles";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledNavigation>
      <StyledSideButton onClick={() => (window.location.href = "/joined")}>
        XX
      </StyledSideButton>
      <StyledCenterButton onClick={() => (window.location.href = "/create")}>
        create
      </StyledCenterButton>
      <StyledSideButton onClick={() => (window.location.href = "/calendar")}>
        <span class="material-symbols-outlined">calendar_month</span>
      </StyledSideButton>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  padding-top: ${theme.spacing.large};
  padding-bottom: ${theme.spacing.large};
  background-color: ${theme.primaryColor};

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: ${theme.spacing.large};
    right: ${theme.spacing.large};
    height: ${theme.borderWidth.thin};
    background-color: ${theme.textColor};
  }
`;

const StyledSideButton = styled.button`
  height: ${theme.button.large};
  width: ${theme.button.large};
`;

const StyledCenterButton = styled.button`
  height: ${theme.button.large};
  width: ${theme.button.xl};
`;
