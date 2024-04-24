import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  const { userId } = request.body;
  const user = await User.findById(id).populate("friends");
  const user2 = await User.findById(userId).populate("friends");

  if (request.method === "POST") {
    if (user.friends.find((friend) => friend === userId) === undefined) {
      user.friends.push(userId);
      await user.save();
      if (user2.friends.find((friend) => friend === id) === undefined) {
        user2.friends.push(id);
        await user2.save();
      }
      return response
        .status(200)
        .json({ message: "This User is your friend now!" });
    } else {
      return response
        .status(409)
        .json({ message: "This User is already your friend!" });
    }
  }

  if (request.method === "DELETE") {
    console.log("userId: ", userId);
    console.log("id: ", id);
    try {
      await User.updateOne({ _id: userId }, { $pull: { friendRequests: id } });
      await user.save();
    } catch (error) {
      console.log(error);
    }
    return response
      .status(200)
      .json({ message: "User successfully deleted from friend Requests!" });
  }
}
