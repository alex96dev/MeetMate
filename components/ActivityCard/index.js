import styled from "styled-components";

export default function ActivityCard({ name, date, time, joined }) {
  return (
    <StyledActivityCard>
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
  border-radius: 15px;
  margin: 15px;
`;

const StyledJoinMark = styled.p`
  position: absolute;
  top: 0;
  left: 1rem;
`;
