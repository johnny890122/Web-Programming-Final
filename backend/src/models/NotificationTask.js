import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationTaskSchema = new Schema({
	taskID: {type: String, required: true},
	taskType: {type: String, required: true},
	taskContent: {type: String, required: true},
})


export default mongoose.model("NotificationTask", NotificationTaskSchema);