import { signIn } from "next-auth/react";
import styled from "styled-components";
import { theme } from "@/styles";
import { FiLogIn } from "react-icons/fi";

export default function LoginPage() {
  return (
    <StyledLoginPage>
      <StyledButtonBox>
        <h3>Not signed in</h3> <br />
        <StyledLoginButton onClick={() => signIn()}>
          Sign in <FiLogIn size={theme.button.small} color={theme.textColor} />
        </StyledLoginButton>
      </StyledButtonBox>
    </StyledLoginPage>
  );
}

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30%;
`;

const StyledButtonBox = styled.div`
  border-style: solid;
  border-radius: ${theme.borderRadius.medium};
  text-align: center;
  width: ${theme.box.width};
  padding: ${theme.spacing.large};
  margin: auto;
`;

const StyledLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  width: ${theme.button.xl};
`;
