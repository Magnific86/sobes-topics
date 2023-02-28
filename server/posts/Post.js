import mongoose from "mongoose";

const Post = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  timeCreated: { type: String, required: true },
});

export default mongoose.model("Post", Post);
