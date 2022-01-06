import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: { type: String, required: false },
  userAccount: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: false },
  userName: { type: String, required: false },
  userBirthday: { type: Number, required: false },
  userStatus: { type: String, required: false },
  userProfile: { type: String, required: false },
  allTeams: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
  userTodo: [{ type: mongoose.Types.ObjectId, ref: "DashboardTodo" }],
  
  userNotification: [{ type: Object, ref: "DashboardNotification" }],
  userAchievement: [{ type: Object, ref: "NotificationTaskModel" }],

  userEvent: [{ type: mongoose.Types.ObjectId, ref: "DashboardEvent" }],
  userPlaySet: [{ type: mongoose.Types.ObjectId, ref: "DashboardPlaySet" }],
});

const TodoSchema = new Schema({
  TodoID: { type: mongoose.Types.ObjectId, required: true },
  todoStatus: { type: String, required: true },
  todoContent: { type: String, required: true },
});

const TeamSchema = new Schema({
  teamID: { type: String, required: true },
  teamName: { type: String, required: true },
  teamDescription: { type: String, required: false },
  teamType: { type: String, required: true },
  //teamCreateDate: {type: Number, required: true},
  teamMember: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  teamPost: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  teamGantt: [{ type: mongoose.Types.ObjectId, ref: "Gantt" }],
  teamScore: [{ type: mongoose.Types.ObjectId, ref: "Score" }],
  teamVote: [{ type: mongoose.Types.ObjectId, ref: "Vote" }],
  teamEvent: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
});

const EventSchema = new Schema({
  eventID: { type: String, required: true },
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventStart: { type: String, required: true },
  eventEnd: { type: String, required: false },
  eventLocation: { type: String, required: false },
  eventCreater: { type: mongoose.Types.ObjectId, ref: "User" },
  eventPostTime: { type: String, required: true },
});

const GallerySchema = new Schema({
  galleryID: { type: String, required: true },
  galleryTitle: { type: String, required: true },
  originalUrl: { type: String },
  thumbnailUrl: { type: String },
});

const NotificationTaskSchema = new Schema({
  userID: { type: String, required: true },
  taskID: { type: String, required: true },
  taskTime: { type: Number, required: true },
  taskType: { type: String, required: true },
  taskContent: { type: String, required: true },
});

const AchievementSchema = new Schema({
  userID: {type: String, required: true},
  userAchievementID: {type: String, required: true},
  userAchievementTitle: {type: String, required: true},
  userAchievementContent: {type: String, required: false},
})

const UserModel = mongoose.model("User", UserSchema);
const TodoModel = mongoose.model("Todo", TodoSchema);
const TeamModel = mongoose.model("Team", TeamSchema);
const EventModel = mongoose.model("Event", EventSchema);
const GalleryModel = mongoose.model("Gallery", GallerySchema);
const NotificationTaskModel = mongoose.model("NotificationTask", NotificationTaskSchema);
const AchievementModel = mongoose.model("Achievement", AchievementSchema);

export {
  UserModel,
  TodoModel,
  TeamModel,
  EventModel,
  GalleryModel,
  NotificationTaskModel,
  AchievementModel
};
