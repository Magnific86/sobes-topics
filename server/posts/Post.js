import mongoose from "mongoose";

const Post = new mongoose.Schema({
  hash: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  timeCreated: { type: String, required: true },
});

export default mongoose.model("Post", Post);
