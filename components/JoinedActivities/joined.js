import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import useAuthentication from "../../pages/api/auth/useAuthentication";
import Navigation from "@/components/Navigation";
import styled from "styled-components";
import { theme } from "@/styles";
import useStore from "@/store";
import CardForm from "@/components/CardForm";

export default function JoinedActivities({ onSubmit }) {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();
  const {
    setIsEditMode,
    isCreateMode,
    setIsCreateMode,
    handleCreateClick,
    handleCloseClick,
  } = useStore();

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <div>
      <StyledPageDetailTitle>My joined activities</StyledPageDetailTitle>
      <StyledCardSection>
        {activities.map((activity) =>
          activity.joined ? (
            <Link key={activity._id} href={`/${activity._id}`}>
              <ActivityCard
                name={activity.name}
                date={activity.date}
                time={activity.time}
                joined={activity.joined}
                category={activity.category}
              />
            </Link>
          ) : null
        )}
        {!isCreateMode && <Navigation onCreateClick={handleCreateClick} />}
        {isCreateMode && (
          <Overlay>
            <CardForm
              pageTitle="Create your activity!"
              onCancel={handleCloseClick}
              setIsCreateMode={setIsCreateMode}
              setIsEditMode={setIsEditMode}
              isEditMode={false}
              onSubmit={onSubmit}
            />
          </Overlay>
        )}
      </StyledCardSection>
    </div>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: ${theme.spacing.large};
  width: 100%;
  height: 100%;
  background-color: ${theme.primaryColor};
  overflow-y: auto;
`;

const StyledPageDetailTitle = styled.h1`
  font-size: ${theme.fontSizes.ml};
  text-align: center;
  margin: ${theme.spacing.medium};
`;

const StyledCardSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  margin-bottom: 6rem;
  @media screen and (min-width: 600px) {
    margin-bottom: 6.5rem;
  }
  @media screen and (min-width: 900px) {
    margin-bottom: 7rem;
  }
  @media screen and (min-width: 1200px) {
    margin-bottom: 7.5rem;
  }
`;
