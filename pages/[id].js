import DetailsCard from "@/components/DetailsCard";
import { useAuthentication } from "./api/useAuthentication";

export default function DetailsCardPage() {
  const { authenticated, loading } = useAuthentication();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <>
      <DetailsCard />
    </>
  );
}
