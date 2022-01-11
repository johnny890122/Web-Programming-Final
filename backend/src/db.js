import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: { type: String, required: false },
  userAccount: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: false },
  userName: { type: String, required: false },
  userBirthday: { type: String, required: false },
  userStatus: { type: String, required: false },
  userProfile: { type: String, required: false },
  allTeams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  manageTeams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  userTodo: [{ type: Schema.Types.ObjectId, ref: "DashboardTodo" }],
  userNotification: [
    { type: Schema.Types.ObjectId, ref: "DashboardNotification" },
  ],
  userAchievement: [
    { type: Schema.Types.ObjectId, ref: "NotificationTaskModel" },
  ],
  userEvent: [{ type: Schema.Types.ObjectId, ref: "DashboardEvent" }],
  userPlaySet: [{ type: Schema.Types.ObjectId, ref: "DashboardPlaySet" }],
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
  teamType: { type: String, required: false },
  teamCreateTime: { type: String, required: false },
  teamMember: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teamPost: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  teamGantt: [{ type: Schema.Types.ObjectId, ref: "Gantt" }],
  teamContest: [{ type: Schema.Types.ObjectId, ref: "Contest" }],
  teamVote: [{ type: Schema.Types.ObjectId, ref: "Vote" }],
  teamEvent: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  teamManager: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const EventSchema = new Schema({
  eventID: { type: String, required: true },
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventStart: { type: String, required: true },
  eventEnd: { type: String, required: false },
  eventLocation: { type: String, required: false },
  eventCreator: { type: Schema.Types.ObjectId, ref: "User" },
  eventPostTime: { type: String, required: true },
  eventReply: [{ type: Schema.Types.ObjectId, ref: "EventReply" }],
});

const EventReplySchema = new Schema({
  eventReplyID: { type: String, required: true },
  eventReplyMemeber: { type: Schema.Types.ObjectId, ref: "User" },
  eventReplyOption: { type: String, required: false },
  eventReplyContent: { type: String, required: false },
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
  ganttTaskID: [{ type: Schema.Types.ObjectId, ref: "GanttTask" }],
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
  eventPostTime: { type: String, required: true },
});

const ContestSchema = new Schema({
  contestID: { type: String, required: false },
  contestTitle: { type: String, required: false },
  contestDate: { type: String, required: false },
  contestMyTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  contestOpponent: { type: String, required: false },
  contestIsWin: { type: String, required: false },
  contestMySet: { type: Number, required: false },
  contestOppoSet: { type: Number, required: false },
});

const PostSchema = new Schema({
  postID: { type: String, required: true },
  postTitle: { type: String, required: true },
  postContent: { type: String, required: true },
  postAuthor: { type: Schema.Types.ObjectId, ref: "User" },
  postTime: { type: String, required: true },
});

const VoteSchema = new Schema({
  voteID: { type: String, required: true },
  voteTitle: { type: String, required: true },
  voteDescription: { type: String, required: true },
  voteEnd: { type: String, required: true },
  voteLimit: { type: Number, required: false },
  voteCreator: { type: Schema.Types.ObjectId, ref: "User" },
  voteOption: [{ type: Schema.Types.ObjectId, ref: "VoteOption" }],
  voteCreateTime: { type: String, required: true },
});

const VoteOptionSchema = new Schema({
  voteOptionID: { type: String, required: true },
  voteOptionName: { type: String, required: true },
  votedUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
const EventReplyModel = mongoose.model("EventReply", EventReplySchema);
const PostModel = mongoose.model("Post", PostSchema);
const VoteModel = mongoose.model("Vote", VoteSchema);
const VoteOptionModel = mongoose.model("VoteOption", VoteOptionSchema);
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
const ContestModel = mongoose.model("Contest", ContestSchema);
// const ScoreDetailModel = mongoose.model("ScoreDetail", ScoreDetailSchema);

export {
  UserModel,
  TodoModel,
  TeamModel,
  EventModel,
  EventReplyModel,
  PostModel,
  VoteModel,
  VoteOptionModel,
  GalleryModel,
  GanttModel,
  NotificationTaskModel,
  AchievementModel,
  DashboardEventModel,
  ContestModel,
  // ScoreDetailModel,
};
