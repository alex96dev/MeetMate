import ActivityCard from "@/components/ActivityCard";
import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");

  console.log(activities);
  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  return (
    <div>
      <h1>Easy Meet Up with Friends</h1>

      {activities.map((activity) => (
        <Link key={activity._id} href={`/${activity._id}`}>
          <ActivityCard
            name={activity.name}
            date={activity.date}
            time={activity.time}
          />
        </Link>
      ))}
    </div>
  );
}
