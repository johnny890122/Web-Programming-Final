import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GanttTaskSchema = new Schema({
	ganttTaskID: {type: mongoose.Types.ObjectId, required: true},
	dateStart: {type: Number, required: true},
	dateEnd: {type: Number, required: true},
	duration: {type: Number, required: true},
	percComplete: {type: Number, required: true},
	dependenies: {type: String, required: true},
})


export default mongoose.model("GanttTask", GanttTaskSchema);