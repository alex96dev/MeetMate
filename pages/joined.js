import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";
import useAuthentication from "./api/auth/useAuthentication";
export default function Joined() {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();

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
      <h1>Joined</h1>
      <Link href="/create">
        <button>+</button>
      </Link>
      <Link href="/">
        <button>back</button>
      </Link>
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
    </div>
  );
}
