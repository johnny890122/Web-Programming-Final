import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContestScoreSetSchema = new Schema({
	contestScoreSetID: {type: mongoose.Types.ObjectId, required: true},
	myTeamScore: {type: Number, required: true},
	oppentScore: {type: Number, required: true},
	userPlaySet: [{type: mongoose.Types.ObjectId, ref: "UserPlaySet"}]
})


export default mongoose.model("ContestScoreSet", ContestScoreSetSchema);