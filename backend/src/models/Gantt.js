import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GanttSchema = new Schema({
	ganttID: {type: mongoose.Types.ObjectId, required: true},
	ganttTaskID: {type: mongoose.Types.ObjectId, ref: "GanttTask"},
})


export default mongoose.model("Gantt", GanttSchema);