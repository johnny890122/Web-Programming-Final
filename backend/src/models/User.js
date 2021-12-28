import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userID: {type: mongoose.Types.ObjectId, required: true},
	userAccount: {type: String, required: true},
	userPassword: {type: String, required: true},
	userEmail: {type: String, required: true},
	userName: {type: String, required: true},
	userBirthday: {type: Number, required: true},
	userStatus: {type: String, required: true},
	userProfile: {type: String, required: true},
	allTeams: [{type: mongoose.Types.ObjectId, ref: "Team"}],
	userTodo: [{type: mongoose.Types.ObjectId, ref: "DashboardTodo"}],
	userNotification: [{type: mongoose.Types.ObjectId, ref: "DashboardNotification"}],
	userEvent: [{type: mongoose.Types.ObjectId, ref: "DashboardEvent"}],
	userPlaySet: [{type: mongoose.Types.ObjectId, ref: "DashboardPlaySet"}],
})


export  mongoose.model("User", UserSchema);