import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  const { userId } = request.body;
  const user = await User.findById(id).populate("friends");

  if (request.method === "POST") {
    if (
      user.friendRequests.find((request) => request === userId) === undefined
    ) {
      user.friendRequests.push(userId);
      await user.save();
      return response
        .status(200)
        .json({ message: "Friend Request successfully send!" });
    } else {
      return response
        .status(409)
        .json({ message: "Friend Request has already been send!" });
    }
  }

  if (request.method === "DELETE") {
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
