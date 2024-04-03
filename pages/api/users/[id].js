import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  const { userId } = request.body;
  const user = await User.findById(id).populate("friends");

  if (request.method === "POST") {
    user.friends.push(request.body.id);
    await user.save();
    return response.status(200).json({ message: "User updated " });
  }

  if (request.method === "DELETE") {
    // user.friends = user.friends.filter((friend) => friend !== id);
    // await user.friends.pull({ _id: id });
    // await user.save();
    console.log(user.id);
    console.log(userId);
    try {
      await User.updateOne({ _id: userId }, { $pull: { friends: id } });
      await user.save();
    } catch (error) {
      console.log(error);
    }
    return response
      .status(200)
      .json({ message: "Friend successfully deleted" });
  }
}
