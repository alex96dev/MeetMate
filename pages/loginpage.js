import { signIn } from "next-auth/react";
import styled from "styled-components";
import { theme } from "@/styles";

export default function LoginPage() {
  return (
    <>
      <StyledButtonBox>
        <h2>Not signed in</h2> <br />
        <StyledLoginButton onClick={() => signIn()}>Sign in</StyledLoginButton>
      </StyledButtonBox>
    </>
  );
}

const StyledButtonBox = styled.div`
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  padding: ${theme.spacing.large};
  margin: ${theme.spacing.xl.split("r")[0] * 8 + "rem"};
  margin-left: ${theme.spacing.xl.split("r")[0] * 10 + "rem"};
  margin-right: ${theme.spacing.xl.split("r")[0] * 10 + "rem"};
`;

const StyledLoginButton = styled.button`
  width: ${theme.button.xl};
`;
