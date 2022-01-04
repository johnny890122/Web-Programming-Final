import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userID: {type: String, required: false},
	userAccount: {type: String, required: true},
	userPassword: {type: String, required: true},
	userEmail: {type: String, required: false},
	userName: {type: String, required: false},
	userBirthday: {type: Number, required: false},
	userStatus: {type: String, required: false},
	userProfile: {type: String, required: false},
	allTeams: [{type: mongoose.Types.ObjectId, ref: "Team"}],
	userTodo: [{type: mongoose.Types.ObjectId, ref: "DashboardTodo"}],
	userNotification: [{type: String, ref: "DashboardNotification"}],
	userEvent: [{type: mongoose.Types.ObjectId, ref: "DashboardEvent"}],
	userPlaySet: [{type: mongoose.Types.ObjectId, ref: "DashboardPlaySet"}],
})

export default mongoose.model("User", UserSchema);