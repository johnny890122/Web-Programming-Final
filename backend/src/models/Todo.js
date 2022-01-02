import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	TodoID: {type: mongoose.Types.ObjectId, required: true},
	todoStatus: {type: String, required: true},
	todoContent: {type: String, required: true},
})

export default mongoose.model("Todo", TodoSchema);