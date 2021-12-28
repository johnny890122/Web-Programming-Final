import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	eventID: {type: mongoose.Types.ObjectId, required: true},
	eventTitle: {type: String, required: true},
	eventDescription: {type: String, required: true},
	eventStart: {type: Number, required: true},
	eventEnd: {type: Number, required: true},
	eventLocation: {type: String, required: true},
	eventCreater: {type: mongoose.Types.ObjectId, ref: "User"},
	eventPostTime: {type: Number, required: true},
})


export  mongoose.model("Event", EventSchema);