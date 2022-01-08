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
  allTeams: [{ type: Object, ref: "Team" }],
  userTodo: [{ type: mongoose.Types.ObjectId, ref: "DashboardTodo" }],
  userNotification: [{ type: Object, ref: "DashboardNotification" }],
  userAchievement: [{ type: Object, ref: "NotificationTaskModel" }],
  userEvent: [{ type: Object, ref: "DashboardEvent" }],

  userPlaySet: [{ type: mongoose.Types.ObjectId, ref: "DashboardPlaySet" }],
});

const TodoSchema = new Schema({
  userID: { type: String, ref: "User" },
  todoID: { type: String, required: true },
  todoDone: { type: Boolean, required: true },
  todoDeleted: { type: Boolean, required: true },
  todoContent: { type: String, required: true },
});

const TeamSchema = new Schema({
  teamID: { type: String, required: true },
  teamName: { type: String, required: true },
  teamDescription: { type: String, required: false },
  teamType: { type: String, required: true },
  //teamCreateDate: {type: Number, required: true},
  teamMember: [{ type: Object, ref: "User" }],
  teamPost: [{ type: Object, ref: "Post" }],
  teamGantt: [{ type: Object, ref: "Gantt" }],
  teamScore: [{ type: Object, ref: "Score" }],
  teamVote: [{ type: Object, ref: "Vote" }],
  teamEvent: [{ type: Object, ref: "Event" }],
});

const EventSchema = new Schema({
  eventID: { type: String, required: true },
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventStart: { type: String, required: true },
  eventEnd: { type: String, required: false },
  eventLocation: { type: String, required: false },
  eventCreater: { type: Object, ref: "User" },
  eventPostTime: { type: String, required: true },
});

const GallerySchema = new Schema({
  teamID: { type: String, required: true },
  galleryID: { type: String, required: true },
  galleryTitle: { type: String, required: true },
  originalUrl: [{ type: String }],
  thumbnailUrl: [{ type: String }],
});

const GanttSchema = new Schema({
  teamID: { type: String, required: true },
  ganttID: { type: String, required: true },
  ganttTitle: { type: String, required: true },
  ganttTaskID: [{ type: mongoose.Types.ObjectId, ref: "GanttTask" }],
});

const NotificationTaskSchema = new Schema({
  userID: { type: String, required: true },
  taskID: { type: String, required: true },
  taskTime: { type: Number, required: true },
  taskType: { type: String, required: true },
  taskContent: { type: String, required: true },
});

const AchievementSchema = new Schema({
  userID: { type: String, required: true },
  userAchievementID: { type: String, required: true },
  userAchievementTitle: { type: String, required: true },
  userAchievementContent: { type: String, required: false },
});

const DashboardEventSchema = new Schema({
  userID: { type: String, ref: "User" },
  eventID: { type: String, required: true },
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventStart: { type: Number, required: true },
  eventEnd: { type: Number, required: true },
  eventLocation: { type: String, required: true },
  eventPostTime: { type: Number, required: true },
});

const ScoreSchema = new Schema({
  teamID: { type: String, required: true },
  contestID: { type: String, required: true },
  contestDate: { type: Number, required: true },
  contestOpponent: { type: String, required: true },
  contestIsWin: { type: Boolean, required: true },
  contestTitle: { type: String, required: true },
});

// const ScoreDetailSchema = new Schema({
//   contestScoreSetID: { type: String, required: true },
//   contestScoreSet: { type: String, required: true },
//   contestScoreItem: [{ type: String, required: true }],
// });

const UserModel = mongoose.model("User", UserSchema);
const TodoModel = mongoose.model("Todo", TodoSchema);
const TeamModel = mongoose.model("Team", TeamSchema);
const EventModel = mongoose.model("Event", EventSchema);
const GalleryModel = mongoose.model("Gallery", GallerySchema);
const GanttModel = mongoose.model("Gantt", GanttSchema);
const NotificationTaskModel = mongoose.model(
  "NotificationTask",
  NotificationTaskSchema
);
const AchievementModel = mongoose.model("Achievement", AchievementSchema);
const DashboardEventModel = mongoose.model(
  "DashboardEvent",
  DashboardEventSchema
);
const ScoreModel = mongoose.model("Score", ScoreSchema);
// const ScoreDetailModel = mongoose.model("ScoreDetail", ScoreDetailSchema);

export {
  UserModel,
  TodoModel,
  TeamModel,
  EventModel,
  GalleryModel,
  GanttModel,
  NotificationTaskModel,
  AchievementModel,
  DashboardEventModel,
  ScoreModel,
  // ScoreDetailModel,
};
