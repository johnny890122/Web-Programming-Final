import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserPlaySetSchema = new Schema({
	userPlaySetID: {type: mongoose.Types.ObjectId, required: true},
	playSetUser: [{type: mongoose.Types.ObjectId, ref: "User"}],
	scoreDetail: [{type: Number, required: true}],
})

export default mongoose.model("UserPlaySet", UserPlaySetSchema);