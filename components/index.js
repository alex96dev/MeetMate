import styled from "styled-components";

export default function ActivityCard({ name, date, time }) {
  return (
    <StyledActivityCard>
      <h2>{name}</h2>
      <section>
        <p>{date}</p>
        <p>{time}</p>
      </section>
    </StyledActivityCard>
  );
}

const StyledActivityCard = styled.div`
  display: flex;
  border-style: solid;
  justify-content: space-evenly;
  border-radius: 15px;
  margin: 15px;
`;
