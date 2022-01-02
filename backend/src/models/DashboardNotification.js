import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DashboardNotificationSchema = new Schema({
	notificationDDL: {type: Number, required: true},
	notificationTask: [{type: mongoose.Types.ObjectId, ref: "notificationTask"}],
})


export default mongoose.model("DashboardTodo", DashboardTodoSchema);