import { theme } from "@/styles";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledNavigation>
      <StyledNavButtonBox>
        <StyledSideButton onClick={() => (window.location.href = "/joined")}>
          XX
        </StyledSideButton>
        <StyledCenterButton onClick={() => (window.location.href = "/create")}>
          create
        </StyledCenterButton>
        <StyledSideButton onClick={() => (window.location.href = "/calendar")}>
          <span class="material-symbols-outlined">calendar_month</span>
        </StyledSideButton>
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
    height: ${theme.borderWidth.thin};
    background-color: ${theme.textColor};
  }
`;

const StyledNavButtonBox = styled.div`
  display: flex;
  width: ${theme.box.width};
  justify-content: space-between;
  padding-top: ${theme.spacing.large};
  padding-bottom: ${theme.spacing.large};
`;

const StyledSideButton = styled.button`
  height: ${theme.button.large};
  width: ${theme.button.large};
`;

const StyledCenterButton = styled.button`
  height: ${theme.button.large};
  width: ${theme.button.xl};
`;
