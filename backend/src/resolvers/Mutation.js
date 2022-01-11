import { v4 as uuidv4 } from "uuid";
const ObjectId = require('mongodb').ObjectID;;

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
        "_id": OBID,
        "userID": userID,
        "userAccount": userAccount,
        "userPassword": userPassword,
        "userEmail": userEmail,
      });
    await newUser.save();
    console.log("New User Saved!");

    return newUser;
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
    const eventPostTime = await new Date();

    const event = await new db.DashboardEventModel({
      userID: eventCreator,
      eventID: eventID,
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventLocation: eventLocation,
      eventPostTime: eventPostTime,
    }).save();

    const newEvent = await db.UserModel.findOneAndUpdate(
      { userID: eventCreator },
      { $push: { userEvent: event } }
    );

    return eventID;
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
    const eventPostTime = await new Date();

    const event = await new db.DashboardEventModel({
      userID: eventCreator,
      eventID: eventID,
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventLocation: eventLocation,
      eventPostTime: eventPostTime,
    }).save();

    const newEvent = await db.UserModel.findOneAndUpdate(
      { userID: eventCreator },
      { $push: { userEvent: event } }
    );

    return eventID;
  }, 

  createScore: async (
    parent,
    { teamID, contestDate, contestOpponent, contestIsWin, contestTitle },
    { db, pubSub }
  ) => {
    const contestID = uuidv4();
    const newScore = new db.ScoreModel({
      teamID,
      contestID,
      contestDate,
      contestOpponent,
      contestIsWin,
      contestTitle,
    });
    await newScore.save();
    return newScore;
  },

  // createScoreDetail: async (
  //   parent,
  //   { contestScoreSet, contestScoreSetItem },
  //   { db, pubSub }
  // ) => {
  //   const contestScoreSetID = uuidv4();
  //   const newScoreDetail = new db.ScoreDetailModel({
  //     contestScoreSetID,
  //     contestScoreSet,
  //     contestScoreSetItem,
  //   });
  //   await newScoreDetail.save();
  //   return newScoreDetail;
  // },

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


   //---------- Team ----------//

  createTeam: async (parent, args, { db, pubSub }) => {
    const { teamName, teamDescription, teamType, creatorID } = args;
    const TeamExists = await db.TeamModel.findOne({ teamName: teamName });
    const Creator = await db.UserModel.findOne({ userID: creatorID });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    }

    const timeNow = await new Date();
    const teamMember = [Creator._id];
    const OBID = ObjectId();
    const team = await new db.TeamModel({
      "_id": OBID,
      "teamID": uuidv4(),
      "teamName": teamName,
      "teamDescription": teamDescription,
      "teamType": teamType,
      "teamCreateTime": timeNow, 
      "teamMember": teamMember,
      "teamPost": [],
      "teamGantt": [],
      "teamScore": [],
      "teamVote": [],
      "teamEvent": []
    }).save();
    const newAllTeams = await db.UserModel.findOneAndUpdate(
      {_id: Creator._id}, {$push: {"allTeams": team._id}})
    // user.allteams 更新
    console.log("New Team Saved!");
    return team;
  }, 

  deleteTeam: async (parent, args, { db, pubSub }) => {
    const { teamID, memberID } = args;
    const Deleter = await db.UserModel.findOne({ userID: memberID });
    const Team = await db.UserModel.findOne({ teamID: teamID });
    
    //const deleteTeamPost = await db.PostModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamEvent = await db.EventModel.deleteMany({_id: { $in : parent.teamEvent }});
    //const deleteTeamEventReply = await db.EventReplyModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamVote = await db.VoteModel.deleteMany({_id: { $in : parent.teamMember }});
    //const deleteTeamVoteOption = await db.VoteOptionModel.deleteMany({_id: { $in : parent.teamMember }});
    const deleteOneTeam = await db.TeamModel.deleteOne({ _id: Team._id });
    
    console.log("Team Deleted!");
    return Team;
  },

  //---------- Team Post ----------//

  createPost: async (parent, args, { db, pubSub }) => {
    const { postTitle, postContent, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const post = await new db.PostModel({
      "_id": OBID,
      "postID": uuidv4(),
      "postTitle": postTitle,
      "postContent": postContent,
      "postAuthor": Creator._id,
      "postTime": timeNow,
    }).save();

    const newPost = await db.TeamModel.findOneAndUpdate(
      {teamID: teamID}, {$push: {"teamPost": post._id} 
    })
    console.log("New Post Saved!");
    return post;
  },

  updatePost: async (parent, args, { db, pubSub }) => {
    const { postTitle, postContent, postID } = args;
    const Post = await db.PostModel.findOne({ postID: postID });
    
    const postUpdate = await db.PostModel.findOneAndUpdate(
      { _id: Post._id }, 
      { $set: {
        "postTitle": postTitle || Post.postTitle,
        "postContent": postContent || Post.postContent
      }}
    )
    console.log("Post Updated!");
    return postUpdate;
  },

  deletePost: async (parent, args, { db, pubSub }) => {
    const { postID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Post = await db.PostModel.findOne({ postID: postID });

    const PostTeam = await db.TeamModel.findOneAndUpdate(
      {_id: Team._id}, 
      {$pull: {
        "teamPost": Post._id}})
    const deletePost = await db.PostModel.deleteOne({ _id: Post._id });

    console.log("Post Deleted!");
    return PostTeam;
  },

  //---------- Team Event, Reply ----------//

  createTeamEvent: async (parent, args, { db, pubSub }) => {
    const { eventTitle, eventDescription, eventStart, eventEnd, eventLocation, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const timeNow = await new Date();
    const OBID = ObjectId();
    const event = await new db.EventModel({
      "_id": OBID,
      "eventID": uuidv4(),
      "eventTitle": eventTitle,
      "eventDescription": eventDescription,
      "eventStart": eventStart,
      "eventEnd": eventEnd,
      "eventLocation": eventLocation,
      "eventCreator": Creator._id,
      "eventPostTime": timeNow,
      "eventReply": [] 
    }).save();

    const newEvent = await db.TeamModel.findOneAndUpdate(
      {teamID: teamID}, {$push: {"teamEvent": event.id} 
    })
    console.log("New Team Event Saved!");  
    return event;
  },
  replyTeamEvent: async (parent, args, { db, pubSub }) => {
    const { eventReplyOption, eventReplyContent, memberID, eventID } = args;
    const Member = await db.UserModel.findOne({ userID: memberID });

    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const eventReply = await new db.EventReplyModel({
      "_id": OBID,
      "eventReplyID": uuidv4(),
      "eventReplyMemeber": Member._id,
      "eventReplyOption": eventReplyOption,
      "eventReplyContent": eventReplyContent || "",
      "eventReplyTime": timeNow,
    }).save();

    const newEventReply = await db.EventModel.findOneAndUpdate(
      {eventID: eventID}, {$push: {"eventReply": eventReply._id} 
    })
    console.log("Event Reply Success!");
    return eventReply;
  },

  updateTeamEvent: async (parent, args, { db, pubSub }) => {
    const { eventTitle, eventDescription, eventStart, eventEnd, eventLocation, eventID } = args;
    const Event = await db.EventModel.findOne({ eventID: eventID });
    
    const eventUpdate = await db.EventModel.findOneAndUpdate(
      { _id: Event._id }, 
      { $set: {
        "eventTitle": eventTitle || Event.eventTitle,
        "eventDescription": eventDescription || Event.eventDescription,
        "eventStart": eventStart || Event.eventStart,
        "eventEnd": eventEnd || Event.eventEnd,
        "eventLocation": eventLocation || Event.eventLocation
      }}
    )
    console.log("Event Updated!");
    return eventUpdate;
  },
  updateEventReply: async (parent, args, { db, pubSub }) => {
    const { eventReplyOption, eventReplyContent, eventReplyID } = args;
    const EventReply = await db.EventReplyModel.findOne({ eventReplyID: eventReplyID });
    
    const eventReplyUpdate = await db.EventReplyModel.findOneAndUpdate(
      { _id: EventReply._id }, 
      { $set: {
        "eventReplyOption": eventReplyOption || EventReply.eventReplyOption,
        "eventReplyContent": eventReplyContent || EventReply.eventReplyContent
      }}
    )
    console.log("Event Reply Updated!");
    return eventReplyUpdate;
  },

  deleteEventReply: async (parent, args, { db, pubSub }) => {
    const { eventReplyID, eventID } = args;
    const Event = await db.EventModel.findOne({ eventID: eventID });
    const EventReply = await db.EventReplyModel.findOne({ eventReplyID: eventReplyID });
    
    const ReplyEvent = await db.EventModel.findOneAndUpdate(
      {_id: Event._id}, 
      {$pull: {
        "eventReply": EventReply._id}})
    const deleteEventReply = await db.EventReplyModel.deleteOne({ _id: EventReply._id });

    console.log("Event Reply Deleted!");
    return ReplyEvent;
  },

  deleteEvent: async (parent, args, { db, pubSub }) => {
    const { eventID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Event = await db.EventModel.findOne({ eventID: eventID });
    
    const EventTeam = await db.TeamModel.findOneAndUpdate(
      {_id: Team._id}, 
      {$pull: {
        "teamEvent": Event._id}})
    const deleteEventReply = await db.EventReplyModel.deleteMany({ _id: {'$in': Event.eventReply }});
    const deleteEvent = await db.EventModel.deleteOne({ _id: Event._id });

    console.log("Event Deleted!");
    return EventTeam;
  },
  //deleteEvent(): Team

  //---------- Team Vote, Option ----------//

  createVote: async (parent, args, { db, pubSub }) => {
    const { voteTitle, voteDescription, voteEnd, voteLimit, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const timeNow = await new Date(); //
    const OBID = ObjectId();
    const vote = await new db.VoteModel({
      "_id": OBID,
      "voteID": uuidv4(),
      "voteTitle": voteTitle,
      "voteDescription": voteDescription,
      "voteEnd": voteEnd,
      "voteLimit": voteLimit,
      "voteCreator": Creator._id,
      "voteOption": [],
      "voteCreateTime": timeNow,
    }).save();
    
    const newVote = await db.TeamModel.findOneAndUpdate(
      {teamID: teamID}, {$push: {"teamVote": vote._id} 
    })
    console.log("New Vote Saved!");
    return vote;
  },
  createVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionName, voteID } = args;

    const OBID = ObjectId();
    const voteOption = await new db.VoteOptionModel({
      "_id": OBID,
      "voteOptionID": uuidv4(),
      "voteOptionName": voteOptionName,
      "votedUser": [],
    }).save();

    const newVoteOption = await db.VoteModel.findOneAndUpdate(
      {voteID: voteID}, {$push: {"voteOption": voteOption._id} 
    })
    console.log("New VoteOption Saved!");
    return voteOption;
  },

  updateVote: async (parent, args, { db, pubSub }) => {
    const { voteTitle, voteDescription, voteEnd, voteLimit, voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });
    
    const voteUpdate = await db.VoteModel.findOneAndUpdate(
      { _id: Vote._id }, 
      { $set: {
        "voteTitle": voteTitle || Vote.voteTitle,
        "voteDescription": voteDescription || Vote.voteDescription,
        "voteEnd": voteEnd || Vote.voteEnd,
        "voteLimit": voteLimit || Vote.voteLimit
      }}
    )
    console.log("Vote Updated!");
    return voteUpdate;
  },
  updateVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionName, voteOptionID } = args;
    const VoteOption = await db.VoteOptionModel.findOne({ voteOptionID: voteOptionID });
    
    const voteOptionUpdate = await db.VoteOptionModel.findOneAndUpdate(
      { _id: VoteOption._id }, 
      { $set: {
        "voteOptionName": voteOptionName || VoteOption.voteOptionName,
      }}
    )
    console.log("Vote Option Updated!");
    return voteOptionUpdate;
  },

  replyVote: async (parent, args, { db, pubSub }) => {
    const { voteOptionID, voterID } = args;
    const Voter = await await db.UserModel.findOne({ userID: voterID });
    const VoteOption = await db.VoteOptionModel.findOne({ voteOptionID: voteOptionID });

    if (VoteOption.votedUser.includes(Voter._id)) {
      const replyOption = await db.VoteOptionModel.findOneAndUpdate(
        {_id: VoteOption._id}, 
        {$pull: {
          "votedUser": Voter._id}})
      console.log("Vote Reply Success!");
      return replyOption;
    } else {
      const replyOption = await db.VoteOptionModel.findOneAndUpdate(
        {_id: VoteOption._id}, 
        {$push: {
          "votedUser": Voter._id}})
      console.log("Vote Reply Success!");
      return replyOption;
    }
  },

  deleteVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteOptionID, voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });
    const VoteOption = await db.VoteOptionModel.findOne({ voteOptionID: voteOptionID });
    
    const OptionVote = await db.VoteModel.findOneAndUpdate(
      {_id: Vote._id}, 
      {$pull: {
        "voteOption": VoteOption._id}})
    const deleteVoteOption = await db.VoteOptionModel.deleteOne({ _id: VoteOption._id });

    console.log("Vote Option Deleted!");
    return OptionVote;
  },
  deleteVote: async (parent, args, { db, pubSub }) => {
    const { voteID, teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    const Vote = await db.VoteModel.findOne({ voteID: voteID });
    
    const VoteTeam = await db.TeamModel.findOneAndUpdate(
      {_id: Team._id}, 
      {$pull: {
        "teamVote": Vote._id}})
    const deleteVoteOption = await db.VoteOptionModel.deleteMany({ _id: {'$in': Vote.voteOption }});
    const deleteVote = await db.VoteModel.deleteOne({ _id: Vote._id });

    console.log("Vote Deleted!");
    return VoteTeam;
  },

};

export default Mutation;
