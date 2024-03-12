import CardForm from "@/components/CardForm";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Create() {
  const { mutate } = useSWR("/api/activities");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const activityData = Object.fromEntries(formData);
    activityData.joined = false;
    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });
    if (response.ok) {
      mutate();
      event.target.reset();
      router.push("/");
    }
  }
  return <CardForm onSubmit={handleSubmit} />;
}
