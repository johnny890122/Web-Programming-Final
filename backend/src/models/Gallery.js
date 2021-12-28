import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
	galleryID: {type: mongoose.Types.ObjectId, required: true},
	originalUrl: {type: String, required: true},
	thumbnailUrl: {type: String, required: true},
})


export  mongoose.model("Gallery", GallerySchema);