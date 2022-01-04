import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	voteID: {type: String, required: true},
	voteTitle: {type: String, required: true},
	voteDescription: {type: String, required: true},
	voteEnd: {type: String, required: true},
	voteLimit: {type: Number, required: false},
	voteCreator: {type: mongoose.Types.ObjectId, ref: "User"},
	voteOption: [{ type: mongoose.Types.ObjectId, ref: "VoteOption" }],
})

export default mongoose.model("Vote", VoteSchema);