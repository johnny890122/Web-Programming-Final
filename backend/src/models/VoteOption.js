import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VoteOptionSchema = new Schema({
	voteOptionID: {type: mongoose.Types.ObjectId, required: true},
	voteOptionName: {type: String, required: true},
	votedUser: [{type: mongoose.Types.ObjectId, ref: "User"}],
})

export default mongoose.model("VoteOption",VoteOptionSchema);