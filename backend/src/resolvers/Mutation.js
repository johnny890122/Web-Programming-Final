import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser: async (parent, args, { userModel, pubSub }) => {
    const { userAccount, userPassword, userEmail } = args;
    const accountExists = await userModel.findOne({ userAccount });
    const emailExists = await userModel.findOne({ userEmail });

    if (accountExists) {
      throw new Error("This account has existed!");
    } else if (emailExists) {
      throw new Error("This email has been used!");
    }
    const userID = uuidv4();
    const newUser = new userModel({
      userID,
      userAccount,
      userPassword,
      userEmail,
    });
    await newUser.save();
    console.log("New User Saved!");

    return newUser;
  },

  createUserTodo: async (
    parent,
    { _id, todoContent },
    { todoModel, pubSub }
  ) => {},

  createScore: (parent, args, { teamModel, pubSub }) => {
    const newScore = {
      contestID: uuidv4(),
      ...args.data,
    };
    teamModel.teamScore.unshift(newScore);
    return teamModel.teamScore;
  },

  createScoreDetail: (parent, args, { teamModel, pubSub }) => {
    const newScoreDetail = {
      contestScoreSetID: uuidv4(),
      ...args.data,
    };
    teamModel.teamScore.contestScoreSet.unshift(newScoreDetail);
    return teamModel.teamScore;
  },

  createGallery: (parent, args, { teamModel, pubSub }) => {
    const newGallery = {
      galleryID: uuidv4(),
      ...args.data,
    };
    teamModel.teamGallery.unshift(newGallery);
    return teamModel.teamGallery;
  },

  createGantt: (parent, args, { teamModel, pubSub }) => {
    const newGantt = {
      ganttID: uuidv4(),
      ...args.data,
    };
    teamModel.teamGantt.unshift(newGantt);
    return teamModel.teamGantt;
  },

  createGantt: (parent, args, { teamModel, pubSub }) => {
    const newGantt = {
      ganttID: uuidv4(),
      ...args.data,
    };
    teamModel.teamGantt.unshift(newGantt);
    return teamModel.teamGantt;
  },

  createTeamEvent: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { eventTitle, eventDescription, eventStart, eventEnd, eventLocation, team, creater } = args;
    const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID
    const eventPosttime = await new Date();
    const newEvent = {
      eventID: uuidv4(),
      eventTitle, 
      eventDescription, 
      eventStart, 
      eventEnd, 
      eventLocation,
      eventCreator: Creater,
      eventPosttime
    };
    //await teamModel.findOneAndUpdate({ teamID: TeamID },{ $push: { "teamEvent": newEvent }},{ new: true })
    return newEvent;
  },

  createTeamPost: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { postTitle, postContent, team, creater } = args;
    const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID
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
    const { voteTitle, voteDescription, voteEnd, voteLimit, team, creater } = args;
    const Creater = await userModel.findOne({ creater });
    const Team = await teamModel.findOne({ team });
    const TeamID = Team.teamID
    const newVote = {
      voteID: uuidv4(),
      voteTitle, 
      voteDescription, 
      voteEnd, 
      voteLimit,
      voteCreator: Creater,
      voteOption: []
    };
    //await teamModel.findOneAndUpdate()
    return newVote;
  },

  createTeam: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { teamName, teamDescription, teamType, creater } = args;
    const TeamExists = await teamModel.findOne({ teamName });
    const Creater = await userModel.findOne({ creater });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    } 

    const teamMember = [Creater]
    const newTeam = new teamModel({
      teamID: uuidv4(),
      teamName,
      teamDescription,
      teamType,
      teamMember
    });
    await newTeam.save();
    // user.allteams 更新
    console.log("New Team Saved!");

    return newTeam;
  },
};

export default Mutation;
