import { v4 as uuidv4 } from "uuid";
const ObjectId = require("mongodb").ObjectID;

const Mutation = {
  createUser: async (parent, args, { db, pubSub }) => {
    const { userAccount, userPassword, userEmail } = args;
    const accountExists = await db.UserModel.findOne({ userAccount });
    const emailExists = await db.UserModel.findOne({ userEmail });

    if (accountExists) {
      throw new Error("This account has existed!");
    } else if (emailExists) {
      throw new Error("This email has been used!");
    }
    const userID = uuidv4();
    const OBID = ObjectId();
    const newUser = new db.UserModel({
      _id: OBID,
      userID: userID,
      userAccount: userAccount,
      userPassword: userPassword,
      userEmail: userEmail,
    });
    await newUser.save();
    console.log("New User Saved!");

    return newUser;
  },

  updateUser: async (parent, args, { db, pubSub }) => {
    const { userID, userName, userBirthday } = args;
    const User = await db.UserModel.findOne({ userID });

    if (!User) {
      throw new Error("User not found!");
    }

    const updatedUser = await db.UserModel.findOneAndUpdate(
      { userID: userID },
      {
        userName: userName,
        userBirthday: userBirthday,
      }
    );

    return User;
  },

  createUserTodo: async (parent, { userID, todoContent }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }

    const todoID = uuidv4();
    const todo = await new db.TodoModel({
      userID: userID,
      todoID: todoID,
      todoDone: false,
      todoDeleted: false,
      todoContent: todoContent,
    }).save();

    const newTodo = await db.UserModel.findOneAndUpdate(
      { userID },
      { $push: { userTodo: todo } }
    );

    return todo;
  },

  updateUserNotification: async (
    parent,
    { userID, time, type, content },
    { db, pubSub }
  ) => {
    // 找到要更新通知的 user
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }
    const itemId = uuidv4();
    const item = await new db.NotificationTaskModel({
      taskID: itemId,
      userID: userID,
      taskTime: time,
      taskType: type,
      taskContent: content,
    }).save();

    const newNotification = await db.UserModel.findOneAndUpdate(
      { userID },
      { $push: { userNotification: item } }
    );

    return itemId;
  },

  createUserEvent: async (
    parent,
    {
      eventCreator,
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
    },
    { db, pubSub }
  ) => {
    const user = await db.UserModel.findOne({ userID: eventCreator });
    if (!user) {
      throw new Error("User not found!");
    }

    const eventID = uuidv4();
    const event = await new db.DashboardEventModel({
      userID: eventCreator,
      type: "user",
      eventID: eventID,
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventLocation: eventLocation,
      eventPostTime: Date.now(),
    }).save();

    const newEvent = await db.UserModel.findOneAndUpdate(
      { userID: eventCreator },
      { $push: { userEvent: event } }
    );

    return eventID;
  },

  updateUserEvent: async (
    parent,
    {
      eventID,
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
    },
    { db, pubSub }
  ) => {
    const event = await db.DashboardEventModel.findOne({ eventID });

    if (!event) {
      throw new Error("Event not found!");
    }

    const updatedEvent = await db.DashboardEventModel.findOneAndUpdate(
      { eventID: eventID },
      {
        type: "user",
        eventTitle: eventTitle,
        eventDescription: eventDescription,
        eventStart: eventStart,
        eventEnd: eventEnd,
        eventLocation: eventLocation,
      }
    );

    return eventID;
  },

  deleteUserEvent: async (parent, { eventID }, { db, pubSub }) => {
    const event = await db.DashboardEventModel.findOne({ eventID });

    if (!event) {
      throw new Error("Event not found!");
    }

    await db.DashboardEventModel.deleteOne({ eventID });

    return eventID;
  },

  createGallery: async (parent, { teamID, galleryTitle }, { db, pubSub }) => {
    const galleryID = uuidv4();
    const newGallery = new db.GalleryModel({
      teamID,
      galleryID,
      galleryTitle,
    });
    await newGallery.save();
    return newGallery;
  },

  createGantt: async (parent, { teamID, ganttTitle }, { db, pubSub }) => {
    const ganttID = uuidv4();
    const newGantt = new db.GanttModel({
      teamID,
      ganttID,
      ganttTitle,
    });
    await newGantt.save();
    return newGantt;
  },

  //---------- Team, Member, Manager ----------//

  createTeam: async (parent, args, { db, pubSub }) => {
    const { teamName, teamDescription, teamType, creatorID } = args;
    const TeamExists = await db.TeamModel.findOne({ teamName: teamName });
    const Creator = await db.UserModel.findOne({ userID: creatorID });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    }

    const timeNow = new Date();
    const teamMember = [Creator._id];
    const OBID = ObjectId();
    const team = await new db.TeamModel({
      _id: OBID,
      teamID: uuidv4(),
      teamName: teamName,
      teamDescription: teamDescription,
      teamType: teamType,
      teamCreateTime: timeNow,
      teamMember: teamMember,
      teamPost: [],
      teamGantt: [],
      teamContest: [],
      teamVote: [],
      teamEvent: [],
      teamManager: teamMember,
    }).save();
    const newAllTeams = await db.UserModel.findOneAndUpdate(
      { _id: Creator._id },
      { $push: { allTeams: team._id } }
    );

    const newManageTeams = await db.UserModel.findOneAndUpdate(
      { _id: Creator._id },
      { $push: { manageTeams: team._id } }
    );

    console.log("New Team Saved!");
    return team;
  },
  addMember: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const MemberExists = await Team.teamMember.includes(Member._id);
    if (MemberExists) {
      throw new Error("This member has existed!");
    }

    const MemberToTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $push: { teamMember: Member._id } }
    );
    const TeamToMember = await db.UserModel.findOneAndUpdate(
      { _id: Member._id },
      { $push: { allTeams: Team._id } }
    );
    console.log("Add Member Success!");
    return Member;
  },
  addManager: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const MemberExists = await Team.teamMember.includes(Member._id);
    if (!MemberExists) {
      throw new Error("This member doesn't exist!");
    }
    const ManagerExists = await Team.teamManager.includes(Member._id);
    if (ManagerExists) {
      throw new Error("This manager has existed!");
    }

    const MemberToTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $push: { teamManager: Member._id } }
    );
    const TeamToMember = await db.UserModel.findOneAndUpdate(
      { _id: Member._id },
      { $push: { manageTeams: Team._id } }
    );
    console.log("Add Manager Success!");
    return Member;
  },

  deleteMember: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const MemberToTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $pull: { teamMember: Member._id } }
    );
    const ManagerToTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $pull: { teamManager: Member._id } }
    );
    const TeamToMember = await db.UserModel.findOneAndUpdate(
      { _id: Member._id },
      { $pull: { allTeams: Team._id } }
    );
    const TeamToManager = await db.UserModel.findOneAndUpdate(
      { _id: Member._id },
      { $pull: { manageTeams: Team._id } }
    );
    console.log("Delete Member Success!");
    return Member;
  },
  deleteManager: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const ManagerToTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $pull: { teamManager: Member._id } }
    );
    const TeamToManager = await db.UserModel.findOneAndUpdate(
      { _id: Member._id },
      { $pull: { manageTeams: Team._id } }
    );
    console.log("Delete Manager Success!");
    return Member;
  },
  deleteTeam: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Deleter = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const ManagerExists = await Team.teamManager.includes(Deleter._id);
    if (!ManagerExists) {
      throw new Error("This member is not a manager!");
    }

    //Team.Post.map (post => console.log(memberID))
    //const deleteTeamPost = await db.PostModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamEvent = await db.EventModel.deleteMany({_id: { $in : parent.teamEvent }});
    //const deleteTeamEventReply = await db.EventReplyModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamVote = await db.VoteModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamVoteOption = await db.VoteOptionModel.deleteMany({_id: { $in : parent.teamMember }});
    const deleteOneTeam = await db.TeamModel.deleteOne({ _id: Team._id });

    console.log("Team Deleted!");
    return Team;
  }, // 未完成

  //---------- Team Post ----------//

  createPost: async (parent, args, { db, pubSub }) => {
    const { postTitle, postContent, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });

    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const post = await new db.PostModel({
      _id: OBID,
      postID: uuidv4(),
      postTitle: postTitle,
      postContent: postContent,
      postAuthor: Creator._id,
      postTime: timeNow,
    }).save();

    const newPost = await db.TeamModel.findOneAndUpdate(
      { teamID: teamID },
      { $push: { teamPost: post._id } }
    );
    console.log("New Post Saved!");
    return post;
  },

  updatePost: async (parent, args, { db, pubSub }) => {
    const { postTitle, postContent, postID } = args;
    const Post = await db.PostModel.findOne({ postID: postID });

    const postUpdate = await db.PostModel.findOneAndUpdate(
      { _id: Post._id },
      {
        $set: {
          postTitle: postTitle || Post.postTitle,
          postContent: postContent || Post.postContent,
        },
      }
    );
    console.log("Post Updated!");
    return postUpdate;
  },

  deletePost: async (parent, args, { db, pubSub }) => {
    const { postID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Post = await db.PostModel.findOne({ postID: postID });

    const PostTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      {
        $pull: {
          teamPost: Post._id,
        },
      }
    );
    const deletePost = await db.PostModel.deleteOne({ _id: Post._id });

    console.log("Post Deleted!");
    return PostTeam;
  },

  //---------- Team Event, Reply ----------//

  createTeamEvent: async (parent, args, { db, pubSub }) => {
    const {
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
      teamID,
      creatorID,
    } = args;

    const Creator = await db.UserModel.findOne({ userID: creatorID });

    if (!Creator) {
      throw new Error("Creator not found!");
    }
    const timeNow = await new Date();
    const eventID = uuidv4();
    const event = await new db.EventModel({
      type: "team",
      teamID: teamID,
      eventID: eventID,
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventLocation: eventLocation,
      eventCreator: creatorID,
      eventPostTime: timeNow,
      eventReply: [],
    }).save();

    console.log("New Team Event Saved!");
    return eventID;
  },

  deleteTeamEvent: async (parent, { eventID }, { db, pubSub }) => {
    const event = await db.EventModel.findOne({ eventID });

    if (!event) {
      throw new Error("Event not found!");
    }

    await db.EventModel.deleteOne({ eventID });

    return eventID;
  },

  replyTeamEvent: async (parent, args, { db, pubSub }) => {
    const { eventReplyOption, eventReplyContent, memberID, eventID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });

    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const eventReply = await new db.EventReplyModel({
      _id: OBID,
      eventReplyID: uuidv4(),
      eventReplyMemeber: Member._id,
      eventReplyOption: eventReplyOption,
      eventReplyContent: eventReplyContent || "",
      eventReplyTime: timeNow,
    }).save();

    const newEventReply = await db.EventModel.findOneAndUpdate(
      { eventID: eventID },
      { $push: { eventReply: eventReply._id } }
    );
    console.log("Event Reply Success!");
    return eventReply;
  },

  updateTeamEvent: async (parent, args, { db, pubSub }) => {
    const {
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
      eventID,
    } = args;
    const Event = await db.EventModel.findOne({ eventID: eventID });

    const eventUpdate = await db.EventModel.findOneAndUpdate(
      { _id: Event._id },
      {
        $set: {
          eventTitle: eventTitle || Event.eventTitle,
          eventDescription: eventDescription || Event.eventDescription,
          eventStart: eventStart || Event.eventStart,
          eventEnd: eventEnd || Event.eventEnd,
          eventLocation: eventLocation || Event.eventLocation,
        },
      }
    );
    console.log("Event Updated!");
    return eventUpdate;
  },
  updateEventReply: async (parent, args, { db, pubSub }) => {
    const { eventReplyOption, eventReplyContent, eventReplyID } = args;
    const EventReply = await db.EventReplyModel.findOne({
      eventReplyID: eventReplyID,
    });

    const eventReplyUpdate = await db.EventReplyModel.findOneAndUpdate(
      { _id: EventReply._id },
      {
        $set: {
          eventReplyOption: eventReplyOption || EventReply.eventReplyOption,
          eventReplyContent: eventReplyContent || EventReply.eventReplyContent,
        },
      }
    );
    console.log("Event Reply Updated!");
    return eventReplyUpdate;
  },

  deleteEventReply: async (parent, args, { db, pubSub }) => {
    const { eventReplyID, eventID } = args;
    const Event = await db.EventModel.findOne({ eventID: eventID });
    const EventReply = await db.EventReplyModel.findOne({
      eventReplyID: eventReplyID,
    });

    const ReplyEvent = await db.EventModel.findOneAndUpdate(
      { _id: Event._id },
      {
        $pull: {
          eventReply: EventReply._id,
        },
      }
    );
    const deleteEventReply = await db.EventReplyModel.deleteOne({
      _id: EventReply._id,
    });

    console.log("Event Reply Deleted!");
    return ReplyEvent;
  },
  deleteEvent: async (parent, args, { db, pubSub }) => {
    const { eventID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Event = await db.EventModel.findOne({ eventID: eventID });

    const EventTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      {
        $pull: {
          teamEvent: Event._id,
        },
      }
    );
    const deleteEventReply = await db.EventReplyModel.deleteMany({
      _id: { $in: Event.eventReply },
    });
    const deleteEvent = await db.EventModel.deleteOne({ _id: Event._id });

    console.log("Event Deleted!");
    return EventTeam;
  },

  //---------- Team Vote, Option ----------//

  createVote: async (parent, args, { db, pubSub }) => {
    const {
      voteTitle,
      voteDescription,
      voteEnd,
      voteLimit,
      teamID,
      creatorID,
    } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });

    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const vote = await new db.VoteModel({
      _id: OBID,
      voteID: uuidv4(),
      voteTitle: voteTitle,
      voteDescription: voteDescription,
      voteEnd: voteEnd,
      voteLimit: voteLimit,
      voteCreator: Creator._id,
      voteOption: [],
      voteCreateTime: timeNow,
    }).save();

    const newVote = await db.TeamModel.findOneAndUpdate(
      { teamID: teamID },
      { $push: { teamVote: vote._id } }
    );
    console.log("New Vote Saved!");
    return vote;
  },
  createVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionName, voteID } = args;

    const OBID = ObjectId();
    const voteOption = await new db.VoteOptionModel({
      _id: OBID,
      voteOptionID: uuidv4(),
      voteOptionName: voteOptionName,
      votedUser: [],
    }).save();

    const newVoteOption = await db.VoteModel.findOneAndUpdate(
      { voteID: voteID },
      { $push: { voteOption: voteOption._id } }
    );
    console.log("New VoteOption Saved!");
    return voteOption;
  },

  updateVote: async (parent, args, { db, pubSub }) => {
    const { voteTitle, voteDescription, voteEnd, voteLimit, voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });

    const voteUpdate = await db.VoteModel.findOneAndUpdate(
      { _id: Vote._id },
      {
        $set: {
          voteTitle: voteTitle || Vote.voteTitle,
          voteDescription: voteDescription || Vote.voteDescription,
          voteEnd: voteEnd || Vote.voteEnd,
          voteLimit: voteLimit || Vote.voteLimit,
        },
      }
    );
    console.log("Vote Updated!");
    return voteUpdate;
  },
  updateVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionName, voteOptionID } = args;
    const VoteOption = await db.VoteOptionModel.findOne({
      voteOptionID: voteOptionID,
    });

    const voteOptionUpdate = await db.VoteOptionModel.findOneAndUpdate(
      { _id: VoteOption._id },
      {
        $set: {
          voteOptionName: voteOptionName || VoteOption.voteOptionName,
        },
      }
    );
    console.log("Vote Option Updated!");
    return voteOptionUpdate;
  },

  replyVote: async (parent, args, { db, pubSub }) => {
    const { voteOptionID, voterID } = args;
    const Voter = await await db.UserModel.findOne({ userID: voterID });
    const VoteOption = await db.VoteOptionModel.findOne({
      voteOptionID: voteOptionID,
    });

    if (VoteOption.votedUser.includes(Voter._id)) {
      const replyOption = await db.VoteOptionModel.findOneAndUpdate(
        { _id: VoteOption._id },
        {
          $pull: {
            votedUser: Voter._id,
          },
        }
      );
      console.log("Vote Reply Success!");
      return replyOption;
    } else {
      const replyOption = await db.VoteOptionModel.findOneAndUpdate(
        { _id: VoteOption._id },
        {
          $push: {
            votedUser: Voter._id,
          },
        }
      );
      console.log("Vote Reply Success!");
      return replyOption;
    }
  },

  deleteVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionID, voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });
    const VoteOption = await db.VoteOptionModel.findOne({
      voteOptionID: voteOptionID,
    });

    const OptionVote = await db.VoteModel.findOneAndUpdate(
      { _id: Vote._id },
      {
        $pull: {
          voteOption: VoteOption._id,
        },
      }
    );
    const deleteVoteOption = await db.VoteOptionModel.deleteOne({
      _id: VoteOption._id,
    });

    console.log("Vote Option Deleted!");
    return OptionVote;
  },
  deleteVote: async (parent, args, { db, pubSub }) => {
    const { voteID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Vote = await db.VoteModel.findOne({ voteID: voteID });

    const VoteTeam = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      {
        $pull: {
          teamVote: Vote._id,
        },
      }
    );
    const deleteVoteOption = await db.VoteOptionModel.deleteMany({
      _id: { $in: Vote.voteOption },
    });
    const deleteVote = await db.VoteModel.deleteOne({ _id: Vote._id });

    console.log("Vote Deleted!");
    return VoteTeam;
  },

  //---------- Team Contest, Detail ----------//

  createContest: async (parent, args, { db, pubSub }) => {
    const {
      teamID,
      contestDate,
      contestIsWin,
      contestTitle,
      contestOpponent,
      contestMySet,
      contestOppoSet,
    } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    const OBID = ObjectId();
    const contest = await new db.ContestModel({
      _id: OBID,
      contestID: uuidv4(),
      contestTitle: contestTitle || "Unnamed",
      contestDate: contestDate,
      contestMyTeam: Team._id,
      contestOpponent: contestOpponent || "unknown",
      contestIsWin: contestIsWin,
      contestMySet: contestMySet || 0,
      contestOppoSet: contestOppoSet || 0,
      contestSetDetail: [],
    }).save();

    const newContest = await db.TeamModel.findOneAndUpdate(
      { _id: Team._id },
      { $push: { teamContest: contest._id } }
    );
    console.log("New Contest Saved!");
    return contest;
  },
  createSetDetail: async (parent, args, { db, pubSub }) => {
    const {
      contestID,
      setNumber,
      setScore,
      setMyPoint,
      setOppoPoint,
      setOppoErrServe,
      setOppoErrAttack,
      setOppoErrOther,
    } = args;
    const Contest = await db.ContestModel.findOne({ contestID: contestID });

    if (!setScore) {
      const setScore = [];
    }

    const OBID = ObjectId();
    const setDetail = await new db.SetDetailModel({
      _id: OBID,
      setID: uuidv4(),
      setNumber: setNumber || 1,
      setScore: setScore || [],
      setMyPoint: setMyPoint || setScore.filter((x) => x === "o").length,
      setOppoPoint: setOppoPoint || setScore.filter((x) => x === "x").length,
      setOppoErrServe: setOppoErrServe || 0,
      setOppoErrAttack: setOppoErrAttack || 0,
      setOppoErrOther: setOppoErrOther || 0,
      setPlayerDetail: [],
    }).save();

    const setToContest = await db.ContestModel.findOneAndUpdate(
      { _id: Contest._id },
      { $push: { contestSetDetail: setDetail._id } }
    );
    console.log("New Set Detail Saved!");
    return setDetail;
  },
  createDetailPlayer: async (parent, args, { db, pubSub }) => {
    const {
      setID,
      playerID,
      detailPointServe,
      detailPointAttack,
      detailPointTip,
      detailTimeAttack,
      detailTimePass,
      detailTimeNoPass,
      detailErrPassS,
      detailErrPassA,
      detailErrPass1,
      detailErrSet,
      detailErrOther,
      detailErrAttack,
      detailErrServe,
      detailComboServe,
    } = args;
    const Set = await db.SetDetailModel.findOne({ setID: setID });
    const Player = await db.UserModel.findOne({ userID: playerID });

    const OBID = ObjectId();
    const detailPlayer = await new db.DetailPlayerModel({
      _id: OBID,
      detailID: uuidv4(),
      detailPlayer: Player._id,
      detailPointServe: detailPointServe || 0,
      detailPointAttack: detailPointAttack || 0,
      detailPointTip: detailPointTip || 0,
      detailTimeAttack: detailTimeAttack || 0,
      detailTimePass: detailTimePass || 0,
      detailTimeNoPass: detailTimeNoPass || 0,
      detailErrPassS: detailErrPassS || 0,
      detailErrPassA: detailErrPassA || 0,
      detailErrPass1: detailErrPass1 || 0,
      detailErrSet: detailErrSet || 0,
      detailErrOther: detailErrOther || 0,
      detailErrAttack: detailErrAttack || 0,
      detailErrServe: detailErrServe || 0,
      detailComboServe: detailComboServe || [],
    }).save();

    const playerToSet = await db.SetDetailModel.findOneAndUpdate(
      { _id: Set._id },
      { $push: { setPlayerDetail: detailPlayer._id } }
    );
    console.log("New Set Player Saved!");
    return detailPlayer;
  },
};

export default Mutation;
