import CardForm from "@/components/CardForm";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useAuthentication } from "./api/useAuthentication";

export default function Create() {
  const { authenticated, loading } = useAuthentication();
  const { mutate } = useSWR("/api/activities");
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

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
