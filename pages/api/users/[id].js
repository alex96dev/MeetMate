import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  const user = await User.findById(id).populate("friends");

  if (request.method === "POST") {
    user.friends.push(request.body.id);
    await user.save();
    return response.status(200).json({ message: "User updated " });
  }
}
