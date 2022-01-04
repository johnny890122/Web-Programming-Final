import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DashboardNotificationSchema = new Schema({
	notificationId: {type: String, required: true},
	notificationDDL: {type: Number, required: true},
	notificationTask: [{type: String, ref: "notificationTask"}],
})


export default mongoose.model("DashboardNotification", DashboardNotificationSchema);