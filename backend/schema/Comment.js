import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  parentId: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  creationDateAndTime: { type: Date, default: Date.now }
});

export default mongoose.model("comment", commentSchema);
