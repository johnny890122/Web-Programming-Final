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

  updateUserAchievement: async (
    parent,
    { userID, title, content },
    { db, pubSub }
  ) => {
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }

    const itemId = uuidv4();
    const item = await new db.AchievementModel({
      userID: userID,
      userAchievementID: itemId,
      userAchievementTitle: title,
      userAchievementContent: content,
    }).save();

    const newNotification = await db.UserModel.findOneAndUpdate(
      { userID },
      { $push: { userAchievement: item } }
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

  createScore: async (
    parent,
    { contestDate, contestOpponent, contestIsWin },
    { db, pubSub }
  ) => {
    const contestID = uuidv4();
    const newScore = new db.ScoreModel({
      contestID,
      contestDate,
      contestOpponent,
      contestIsWin,
      contestTitle,
    });
    await newScore.save();
    return newScore;
  },

  createScoreDetail: (parent, args, { teamModel, pubSub }) => {
    const newScoreDetail = {
      contestScoreSetID: uuidv4(),
      ...args.data,
    };
    teamModel.teamScore.contestScoreSet.unshift(newScoreDetail);
    return teamModel.teamScore;
  },

  createGallery: async (parent, { galleryTitle }, { db, pubSub }) => {
    const galleryID = uuidv4();
    const newGallery = new db.GalleryModel({
      galleryID,
      galleryTitle,
    });
    await newGallery.save();
    return newGallery;
  },

  createGantt: async (parent, { ganttTitle }, { db, pubSub }) => {
    const ganttID = uuidv4();
    const newGantt = new db.GanttModel({
      ganttID,
      ganttTitle,
    });
    await newGantt.save();
    return newGantt;
  },

  createTeamEvent: async (parent, args, { teamModel, userModel, pubSub }) => {
    const {
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
      team,
      creater,
    } = args;
    const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID;
    const eventPosttime = await new Date();
    const newEvent = {
      eventID: uuidv4(),
      eventTitle,
      eventDescription,
      eventStart,
      eventEnd,
      eventLocation,
      eventCreator: Creater,
      eventPosttime,
    };
    //await teamModel.findOneAndUpdate({ teamID: TeamID },{ $push: { "teamEvent": newEvent }},{ new: true })
    return newEvent;
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

  createTeam: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { teamName, teamDescription, teamType, creater } = args;
    const TeamExists = await teamModel.findOne({ teamName });
    const Creater = await userModel.findOne({ userAccount: creater });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    }

    const teamMember = [Creater];
    console.log(teamMember);
    const newTeam = new teamModel({
      teamID: uuidv4(),
      teamName,
      teamDescription,
      teamType,
      teamMember: teamMember,
    });
    await newTeam.save();
    // user.allteams 更新
    console.log("New Team Saved!");

    return newTeam;
  },

  replyVote: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { voteOptionName, team, vote, voter } = args;
    const Voter = await userModel.findOne({ voter });
    const Team = await teamModel.findOne({ team });
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
