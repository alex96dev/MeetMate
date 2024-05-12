export default async function handleEditActivity(event, endpoint, mutate) {
  event.preventDefault();
  console.log("Hi das ist der Test");
  setIsEditMode(true);
  const form = event.target;
  const formData = new FormData(form);

  const activityData = Object.fromEntries(formData.entries());

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  });
  if (response.ok) {
    mutate(endpoint);
    setIsEditMode(false);
    event.target.reset();
  }
}
