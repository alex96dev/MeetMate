import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;

  const { data: activities, isLoading } = useSWR(`/api/activities/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!activities) {
    return;
  }

  return (
    <StyledDetailsCard>
      <h1>{activities.name}</h1>
      <ul>
        <li>author: {activities.author}</li>
        <li>date: {activities.date}</li>
        <li>time: {activities.time}</li>
        <li>location: {activities.location}</li>
        <li>category: {activities.category}</li>
        <li>description: {activities.description}</li>
      </ul>
      <StyledCloseButton>Close</StyledCloseButton>
    </StyledDetailsCard>
  );
}

const StyledDetailsCard = styled.div`
  display: flex;
  border-style: solid;
  justify-content: space-evenly;
  border-radius: 15px;
  margin: 15px;
`;

const StyledCloseButton = styled.button``;
