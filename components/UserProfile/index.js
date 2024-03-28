import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/styles";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();
  return (
    <StyledUserProfileSection>
      <StyledUserProfile>
        {session && (
          <div>
            <StyledDivLeft>
              <StyledUserName>{session.user.name}</StyledUserName>
            </StyledDivLeft>
            <StyledDivRight>
              <StyledImage
                src={session.user.image}
                alt="Profile Picture"
                height={100}
                width={100}
              />
            </StyledDivRight>
          </div>
        )}
      </StyledUserProfile>
    </StyledUserProfileSection>
  );
}

const StyledImage = styled(Image)`
  height: 3.8rem;
  width: 3.8rem;
  border-radius: ${theme.borderRadius.medium};
  @media screen and (min-width: 600px) {
    height: 4.6rem;
    width: 4.6rem;
  }
  @media screen and (min-width: 900px) {
    height: 5.4rem;
    width: 5.4rem;
  }
  @media screen and (min-width: 1200px) {
    height: 6.2rem;
    width: 6.2rem;
  }
`;

const StyledUserProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 1rem;
  @media screen and (min-width: 600px) {
    margin-bottom: 1.8rem;
  }
  @media screen and (min-width: 900px) {
    margin-bottom: 2.6rem;
  }
  @media screen and (min-width: 1200px) {
    margin-bottom: 3.4rem;
  }
`;

const StyledUserProfile = styled.div`
  display: flex;
  position: relative;
  width: ${theme.box.width};
  justify-content: space-evenly;
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  height: ${theme.box.height};
  box-shadow: ${theme.box.shadow};
  &:hover {
    box-shadow: ${theme.box.hover};
  }
  &:active {
    box-shadow: ${theme.box.hover};
  }

  margin-bottom: ${theme.spacing.medium};
  background-color: ${theme.primaryColor};

  @media screen and (min-width: 600px) {
    width: ${theme.box.width.split("r")[0] * 1.4 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.2 + "rem"};
  }
  @media screen and (min-width: 900px) {
    width: ${theme.box.width.split("r")[0] * 1.6 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.4 + "rem"};
  }
  @media screen and (min-width: 1200px) {
    width: ${theme.box.width.split("r")[0] * 1.8 + "rem"};
    height: ${theme.box.height.split("r")[0] * 1.6 + "rem"};
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
  position: absolute;
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
  padding-left: 15px;
  border-left: solid;
  right: 0;
  border-width: ${theme.borderWidth.thin};
`;

const StyledUserName = styled.h2`
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
