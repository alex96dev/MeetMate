import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: false },
  time: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
