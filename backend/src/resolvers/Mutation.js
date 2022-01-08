import { v4 as uuidv4 } from "uuid";

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
    const newUser = new db.UserModel({
      userID,
      userAccount,
      userPassword,
      userEmail,
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
    const { eventTitle, eventDescription, eventStart, eventEnd, eventLocation, teamID, createrID } = args;
    const Creater = await db.UserModel.findOne({ createrID });
    const Team = await db.TeamModel.findOne({ teamID });
    const TeamID = Team.teamID;
    const eventPostTime = await new Date();
    const event = await new db.EventModel({
      eventID: uuidv4(),
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
      eventCreator: Creater,
      eventPostTime: eventPostTime,
    }).save();

    const newEvent = await db.TeamModel.findOneAndUpdate(
      {teamID: TeamID}, {$push: {"teamEvent": event} 
  })
    return event;
  },

  createTeamPost: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { postTitle, postContent, team, creater } = args;
    const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID;
    const postTime = await new Date();
    const newPost = {
      postID: uuidv4(),
      postTitle,
      postContent,
      postAuthor: Creater,
      postTime,
    };
    //await teamModel.findOneAndUpdate()
    return newPost;
  },

  createVote: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { voteTitle, voteDescription, voteEnd, voteLimit, team, creater } =
      args;
    const Creater = await userModel.findOne({ userAccount: creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID;
    const newVote = {
      voteID: uuidv4(),
      voteTitle,
      voteDescription,
      voteEnd,
      voteLimit,
      voteCreator: Creater,
      voteOption: [],
    };
    //await teamModel.findOneAndUpdate()
    return newVote;
  },

  createVoteOption: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { voteOptionName, team } = args;
    //const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const newVoteOption = {
      voteOptionID: uuidv4(),
      voteOptionName,
      votedUser: [],
    };
    //await teamModel.findOneAndUpdate()
    return newVoteOption;
  },

  createTeam: async (parent, args, { db, pubSub }) => {
    const { teamName, teamDescription, teamType, createrID } = args;
    const TeamExists = await db.TeamModel.findOne({ teamName: teamName });
    const Creater = await db.UserModel.findOne({ userID: createrID });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    }

    const teamMember = [Creater];
    const teamId = uuidv4();
    const team = await new db.TeamModel({
      "teamID": teamId,
      "teamName": teamName,
      "teamDescription": teamDescription,
      "teamType": teamType,
      "teamMember": teamMember,
    }).save();
    const newAllTeams = await db.UserModel.findOneAndUpdate(
      {userID: createrID}, {$push: {"allTeams": team}})
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
