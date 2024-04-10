import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String },
  friends: [{ type: String }],
  friendRequests: [{ id: { type: String }, value: { type: Boolean } }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
