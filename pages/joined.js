import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");

  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

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
            />
          </Link>
        ) : null
      )}
    </div>
  );
}
