import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
	contestID: {type: mongoose.Types.ObjectId, required: true},
	contestMyTeam: {type: mongoose.Types.ObjectId, ref: "Team"},
	contestDate: {type: Number, required: true},
	contestOppent: {type: String, required: true},
	contestIsWin: {type: Boolean, required: true},
	contestScoreSet: [{type: mongoose.Types.ObjectId, ref: "ContestScoreSet"}],
	contestScoreItem: [{type: String, required: true}],
})


export default mongoose.model("Contest", ContestSchema);