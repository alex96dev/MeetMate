import { toast } from "react-toastify";

export default async function handleDeleteClick(
  id,
  userId,
  myMates,
  setMyMates
) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const filteredMates = myMates.filter((mate) => mate !== id);
      setMyMates(filteredMates);
      return toast.success(`Friend successfully deleted!`);
    } else {
      console.error("Failed to delete friend.");
    }
  } catch (error) {
    console.error("Error occurred while deleting friend:", error);
  }
}
