import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

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
        {activities.category !== "" && <li>category: {activities.category}</li>}
      </ul>
      {activities.description !== "" && (
        <p>description: {activities.description}</p>
      )}
      <Link href="/">
        <StyledCloseButton>Close</StyledCloseButton>
      </Link>
    </StyledDetailsCard>
  );
}

const StyledDetailsCard = styled.div`
  display: flex;
  border-style: solid;
  flex-direction: column;
  align-items: center;
  margin: 15px auto;
  padding: 10px;
  width: 600px;
  justify-content: space-evenly;
  border-radius: 15px;
`;

const StyledCloseButton = styled.button``;
