import { theme } from "@/styles";
import styled from "styled-components";

export default function ActivityCard({ name, date, time, category }) {
  return (
    <StyledActivityCard category={category}>
      <h2>{name}</h2>
      <section>
        <p>{date}</p>
        <p>{time}</p>
        {joined && <StyledJoinMark>XX</StyledJoinMark>}
      </section>
    </StyledActivityCard>
  );
}

const StyledActivityCard = styled.div`
  display: flex;
  position: relative;
  border-style: solid;

  justify-content: space-evenly;
  padding: ${theme.spacing.small};
  border-style: solid;
  border-width: ${theme.borderWidth.medium};
  border-radius: ${theme.borderRadius.medium};
  height: ${theme.box.height};
  box-shadow: ${theme.box.shadow};
  margin: ${theme.spacing.medium};
  background-color: ${({ category }) => {
    switch (category) {
      case "Sports":
        return theme.secondaryColors.sports;
      case "Culture":
        return theme.secondaryColors.culture;
      case "Food":
        return theme.secondaryColors.food;
      case "Outdoor":
        return theme.secondaryColors.outdoor;
      default:
        return theme.secondaryColors.default;
    }
  }};
`;

const StyledJoinMark = styled.p`
  position: absolute;
  top: 0;
  left: 1rem;
`;
