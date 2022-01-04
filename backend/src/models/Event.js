import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	eventID: {type: String, required: true},
	eventTitle: {type: String, required: true},
	eventDescription: {type: String, required: true},
	eventStart: {type: String, required: true},
	eventEnd: {type: String, required: false},
	eventLocation: {type: String, required: false},
	eventCreater: {type: mongoose.Types.ObjectId, ref: "User"},
	eventPostTime: {type: String, required: true},
})


export default mongoose.model("Event", EventSchema);