import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

// const Activity = mongoose.models || mongoose.model("Activity", activitySchema);
let Activity;

// Überprüfe, ob das Modell bereits existiert, und verwende es, sonst erstelle es
if (mongoose.models.Activity) {
  Activity = mongoose.model("Activity");
} else {
  Activity = mongoose.model("Activity", activitySchema);
}

export default Activity;
