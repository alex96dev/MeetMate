import { toast } from "react-toastify";

export default async function handleSendFriendRequest(
  id,
  userId,
  setFriendRequests,
  friendRequests
) {
  if (!userId) {
    console.error("User ID is not available.");
    return;
  }

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setFriendRequests([userId, ...friendRequests]);
      return toast.success(`Friend Request successfully send!`);
    } else {
      toast.error(`Friend Request has already been send!`);
      console.error("Friend Request has already been send!");
    }
  } catch (error) {
    console.error("Error occurred while updating user:", error);
  }
}
