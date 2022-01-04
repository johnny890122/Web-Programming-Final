import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	postID: {type: String, required: true},
	postTitle: {type: String, required: true},
	postContent: {type: String, required: true},
	postAuthor: {type: mongoose.Types.ObjectId, ref: "User"},
	postTime: {type: String, required:true},
})


export default mongoose.model("Post", PostSchema);