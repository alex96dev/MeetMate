import ActivityCard from "@/components";
import useSWR from "swr";
// import activities from "@/lib/db";

export default function HomePage() {
  const { data: activities, isLoading } = useSWR("/api/activities");

  console.log(activities);
  if (isLoading) return <div>loading...</div>;
  if (!activities) return <div>failed to load</div>;

  return (
    <div>
      <h1>Easy Meet Up with Friends</h1>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          name={activity.name}
          date={activity.date}
          time={activity.time}
        />
      ))}
    </div>
  );
}
