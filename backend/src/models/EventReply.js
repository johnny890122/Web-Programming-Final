import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventReplySchema = new Schema({
	eventReplyID: {type: mongoose.Types.ObjectId, required: true},
	eventReplyMemeber: [{type: mongoose.Types.ObjectId, ref: "User"}],
	eventReplyAttend: {type: Boolean, required: true},
	eventReplyContent: {type: String, required: true},
})


export default mongoose.model("EventReply", EventReplySchema);