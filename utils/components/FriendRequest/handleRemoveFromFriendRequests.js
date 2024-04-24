import { toast } from "react-toastify";

export default async function handleRemoveFromFriendRequests(
  friendRequestId,
  userId
) {
  try {
    const response = await fetch(`/api/users/addFriend/${friendRequestId}`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return toast.success(`User successfully deleted from friend Requests!`);
    } else {
      toast.error(`User not found in friend Requests!`);
      console.error("Failed to delete user.");
    }
  } catch {
    console.error("Error occurred while deleting user:", error);
  }
}
