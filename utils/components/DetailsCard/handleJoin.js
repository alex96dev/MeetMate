export default async function handleJoin(
  setJoinState,
  joinState,
  endpoint,
  mutate
) {
  const updatedIsJoined = !joinState.isJoined;
  setJoinState((prevState) => ({
    ...prevState,
    isJoined: updatedIsJoined,
  }));
  const type = updatedIsJoined ? "success" : "error";
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ joined: updatedIsJoined }),
  });
  if (response.ok) {
    mutate();
  }
}
