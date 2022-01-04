import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  galleryID: { type: String, required: true },
  galleryTitle: { type: String, required: true },
  originalUrl: { type: String },
  thumbnailUrl: { type: String },
});

export default mongoose.model("Gallery", GallerySchema);
