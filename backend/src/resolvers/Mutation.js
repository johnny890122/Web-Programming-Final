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

  createTeamEvent: async (parent, args, { db, pubSub }) => {
    const { eventTitle, eventDescription, eventStart, eventEnd, eventLocation, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const eventPostTime = await new Date();
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
      "eventPostTime": eventPostTime,
    }).save();

    const newEvent = await db.TeamModel.findOneAndUpdate(
      {teamID: teamID}, {$push: {"teamEvent": event.id} 
    })
    console.log("New Team Event Saved!");  
    return event;
  },

  createTeamPost: async (parent, args, { db, pubSub }) => {
    const { postTitle, postContent, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const postTime = await new Date();
    const OBID = ObjectId();
    const post = await new db.PostModel({
      "_id": OBID,
      "postID": uuidv4(),
      "postTitle": postTitle,
      "postContent": postContent,
      "postAuthor": Creator._id,
      "postTime": postTime,
    }).save();

    const newPost = await db.TeamModel.findOneAndUpdate(
      {teamID: teamID}, {$push: {"teamPost": post._id} 
    })
    console.log("New Post Saved!");
    return post;
  },

  createVote: async (parent, args, { db, pubSub }) => {
    const { voteTitle, voteDescription, voteEnd, voteLimit, teamID, creatorID } = args;
    const Creator = await db.UserModel.findOne({ userID: creatorID });
    
    const postTime = await new Date();
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

  createTeam: async (parent, args, { db, pubSub }) => {
    const { teamName, teamDescription, teamType, creatorID } = args;
    const TeamExists = await db.TeamModel.findOne({ teamName: teamName });
    const Creator = await db.UserModel.findOne({ userID: creatorID });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    }

    const teamMember = [Creator._id];
    const teamId = uuidv4();
    const OBID = ObjectId();
    const team = await new db.TeamModel({
      "_id": OBID,
      "teamID": teamId,
      "teamName": teamName,
      "teamDescription": teamDescription,
      "teamType": teamType,
      "teamMember": teamMember,
    }).save();
    const newAllTeams = await db.UserModel.findOneAndUpdate(
      {_id: Creator._id}, {$push: {"allTeams": team._id}})
    // user.allteams 更新
    console.log("New Team Saved!");
    return team;
  },  

  replyVote: async (parent, args, { db, pubSub }) => {
    const { voteOptionName, teamID, vote, voterID } = args;
    const Voter = await db.UserModel.findOne({ voterID });
    const Team = await db.TeamModel.findOne({ teamID });
    const Vote = await Team.TeamVote.findOne({ vote });
    const VoteOption = await Vote.voteOption.findOne({ voteOptionName });

    const newVoteOption = {
      voteOptionID: VoteOption.voteOptionID,
      voteOptionName,
      votedUser: VoteOption.votedUser.push(Voter),
    };
    //await teamModel.findOneAndUpdate()
    return newVoteOption;
  },
};

export default Mutation;
