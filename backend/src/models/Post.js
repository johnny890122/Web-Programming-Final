import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	postID: {type: mongoose.Types.ObjectId, required: true},
	postTitle: {type: String, required: true},
	postContent: {type: String, required: true},
	postAuthor: {type: mongoose.Types.ObjectId, ref: "User"},
	postTime: {type: Number, required:true},
})


export  mongoose.model("Post", PostSchema);