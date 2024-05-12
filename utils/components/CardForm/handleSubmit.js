import { toast } from "react-toastify";

export default async function handleSubmit(
  event,
  session,
  endpoint,
  method,
  onCancel,
  setIsEditMode,
  isEditMode,
  mutate
) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const activityData = Object.fromEntries(formData);
  activityData.authorId = session.user.id;

  const response = await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  });
  if (response.ok) {
    mutate();
    onCancel();
    setIsEditMode(false);
    event.target.reset();
    if (isEditMode) {
      toast.success("Activity updated successfully!");
    } else {
      toast.success("Activity created successfully!");
    }
  } else {
    toast.error("Failed to save changes. Please try again.");
  }
}
