import mongoose, { Schema } from "mongoose";

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
  userNotification: [
    { type: Schema.Types.ObjectId, ref: "DashboardNotification" },
  ],
  userAchievement: [
    { type: Schema.Types.ObjectId, ref: "NotificationTaskModel" },
  ],
  userEvent: [{ type: Schema.Types.ObjectId, ref: "DashboardEvent" }],
  //userTodo: [{ type: Schema.Types.ObjectId, ref: "DashboardTodo" }],
  //userPlaySet: [{ type: Schema.Types.ObjectId, ref: "DashboardPlaySet" }],
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
  teamContest: [{ type: Schema.Types.ObjectId, ref: "Contest" }],
  teamVote: [{ type: Schema.Types.ObjectId, ref: "Vote" }],
  teamEvent: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  teamManager: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //teamGantt: [{ type: Schema.Types.ObjectId, ref: "Gantt" }],
  //teamGallery: [{ type: Schema.Types.ObjectId, ref: "Gallery" }],
});

const EventSchema = new Schema({
  teamID: { type: String, required: true },
  eventID: { type: String, required: false },
  eventTitle: { type: String, required: false },
  eventDescription: { type: String, required: false },
  eventStart: { type: Number, required: false },
  eventEnd: { type: Number, required: false },
  eventLocation: { type: String, required: false },
  eventCreator: { type: Schema.Types.ObjectId, ref: "User" },
  eventPostTime: { type: String, required: false },
  eventReply: [{ type: Schema.Types.ObjectId, ref: "EventReply" }],
  type: { type: String, required: false },
});

const EventReplySchema = new Schema({
  eventReplyID: { type: String, required: true },
  eventReplyMemeber: { type: String, ref: "User" },
  eventReplyOption: { type: String, required: false },
  eventReplyContent: { type: String, required: false },
  eventReplyTime: { type: String, required: false },
});

const NotificationTaskSchema = new Schema({
  userID: { type: String, required: false },
  taskID: { type: String, required: false },
  taskTime: { type: Number, required: false },
  taskTitle: { type: String, required: false },
  taskType: { type: String, required: false },
  taskContent: { type: String, required: false },
});

const AchievementSchema = new Schema({
  userID: { type: String, required: true },
  userAchievementID: { type: String, required: true },
  userAchievementTitle: { type: String, required: true },
  userAchievementContent: { type: String, required: false },
});

const DashboardEventSchema = new Schema({
  userID: { type: String, ref: "User" },
  eventID: { type: String, required: false },
  eventTitle: { type: String, required: false },
  eventDescription: { type: String, required: false },
  eventStart: { type: Number, required: false },
  eventEnd: { type: Number, required: false },
  eventLocation: { type: String, required: false },
  eventPostTime: { type: String, required: false },
  type: { type: String, required: false },
});

const ContestSchema = new Schema({
  contestID: { type: String, required: false },
  contestTitle: { type: String, required: false },
  contestDate: { type: String, required: false },
  contestMyTeam: { type: Schema.Types.ObjectId, ref: "Team" },
  contestOpponent: { type: String, required: false },
  contestIsWin: { type: String, required: false }, // win, lose, tie
  contestMySet: { type: Number, required: false },
  contestOppoSet: { type: Number, required: false },
  contestSetDetail: [{ type: Schema.Types.ObjectId, ref: "SetDetail" }],
});

const SetDetailSchema = new Schema({
  setID: { type: String, required: false },
  setNumber: { type: Number, required: false }, // ??????
  setScore: { type: String, required: false }, // ????????????: "o"= ?????????"x"= ??????
  setMyPoint: { type: Number, required: false }, // ????????????
  setOppoPoint: { type: Number, required: false }, // ????????????
  setOppoErrServe: { type: Number, required: false }, // ??????????????????
  setOppoErrAttack: { type: Number, required: false }, // ??????????????????
  setOppoErrOther: { type: Number, required: false }, // ??????????????????
  setNote: { type: String, required: false }, // ??????
  setPlayerDetail: [{ type: Schema.Types.ObjectId, ref: "DetailPlayer" }], // ????????????
});

const DetailPlayerSchema = new Schema({
  detailID: { type: String, required: false },
  detailPlayer: { type: Schema.Types.ObjectId, ref: "User" },
  detailPointServe: { type: Number, required: false }, // ????????????
  detailPointAttack: { type: Number, required: false }, // ????????????
  detailPointTip: { type: Number, required: false }, // ????????????
  detailTimeAttack: { type: Number, required: false }, // ????????????
  detailTimePass: { type: Number, required: false }, // ??????/??????????????????
  detailTimeNoPass: { type: Number, required: false }, // ??????/?????????????????????
  detailErrPassS: { type: Number, required: false }, // ????????????
  detailErrPassA: { type: Number, required: false }, // ????????????
  detailErrPass1: { type: Number, required: false }, // ????????????
  detailErrSet: { type: Number, required: false }, // ????????????
  detailErrOther: { type: Number, required: false }, // ????????????
  detailErrAttack: { type: Number, required: false }, // ????????????
  detailErrServe: { type: Number, required: false }, // ????????????
  detailComboServe: { type: String, required: false }, // ??????????????????
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

const VoteReplySchema = new Schema({
  userID: { type: String, required: true },
  voteOptionID: [{ type: String, required: true }],
  checked: [{ type: Boolean, required: true }],
});

const UserModel = mongoose.model("User", UserSchema);
const TodoModel = mongoose.model("Todo", TodoSchema);
const TeamModel = mongoose.model("Team", TeamSchema);
const EventModel = mongoose.model("Event", EventSchema);
const EventReplyModel = mongoose.model("EventReply", EventReplySchema);
const PostModel = mongoose.model("Post", PostSchema);
const VoteModel = mongoose.model("Vote", VoteSchema);
const VoteOptionModel = mongoose.model("VoteOption", VoteOptionSchema);
const VoteReplyModel = mongoose.model("VoteReply", VoteReplySchema);
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
const SetDetailModel = mongoose.model("SetDetail", SetDetailSchema);
const DetailPlayerModel = mongoose.model("DetailPlayer", DetailPlayerSchema);

export {
  UserModel,
  TodoModel,
  TeamModel,
  EventModel,
  EventReplyModel,
  PostModel,
  VoteModel,
  VoteOptionModel,
  VoteReplyModel,
  NotificationTaskModel,
  AchievementModel,
  DashboardEventModel,
  ContestModel,
  SetDetailModel,
  DetailPlayerModel,
};

//GalleryModel,
//GanttModel,
//const GalleryModel = mongoose.model("Gallery", GallerySchema);
//const GanttModel = mongoose.model("Gantt", GanttSchema);
//const GallerySchema = new Schema({ teamID: { type: String, required: true }, galleryID: { type: String, required: true }, galleryTitle: { type: String, required: true }, originalUrl: [{ type: String }], thumbnailUrl: [{ type: String }], });
//const GanttSchema = new Schema({ teamID: { type: String, required: true }, ganttID: { type: String, required: true }, ganttTitle: { type: String, required: true }, ganttTaskID: [{ type: Schema.Types.ObjectId, ref: "GanttTask" }], });
