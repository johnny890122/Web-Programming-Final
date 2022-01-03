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

  createTeam: async (parent, args, { teamModel, userModel, pubSub }) => {
    const { teamName, teamDescription, teamType, teamCreater } = args;
    const TeamExists = await teamModel.findOne({ teamName });
    const creater = await userModel.findOne({ teamCreater });

    if (TeamExists) {
      throw new Error("This team name has existed!");
    } 

    console.log(creater)
    const teamMember = [creater]
    const newTeam = new teamModel({
      teamID: uuidv4(),
      teamName,
      teamDescription,
      teamType,
      teamMember
    });
    await newTeam.save();
    console.log("New Team Saved!");

    return newTeam;
  },
};

export default Mutation;
