import { toast } from "react-toastify";
export default async function handleDelete(endpoint, router) {
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
  if (response.ok) {
    toast.success("Activity deleted successfully!");
    router.back();
  } else {
    toast.error("Failed to delete activity");
  }
}
