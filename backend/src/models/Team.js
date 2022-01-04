import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
	teamID: {type: String, required: true},
	teamName: {type: String, required: true},
	teamDescription: {type: String, required: false},
	teamType: {type: String, required: true},
	//teamCreateDate: {type: Number, required: true},
	teamMember: [{ type: mongoose.Types.ObjectId, ref: "User" }],
	teamPost: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
	teamGantt: [{ type: mongoose.Types.ObjectId, ref: "Gantt" }],
	teamScore: [{ type: mongoose.Types.ObjectId, ref: "Score" }],
	teamVote: [{ type: mongoose.Types.ObjectId, ref: "Vote" }],
	teamEvent: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
})


export default mongoose.model("Team", TeamSchema);