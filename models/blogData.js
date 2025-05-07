import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // important
  content: String,
  image: String,
}, { timestamps: true });


export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
