import User from "../models/User";

const Query = {
  userLogin: async (
    parent,
    { userAccount, userPassword },
    { userModel, pubSub }
  ) => {
    const user = await userModel.findOne({ userAccount });

    if (!user) {
      throw new Error("Account not existed!");
    } else if (user.userPassword != userPassword) {
      throw new Error("Password not correct!");
    } else {
      return user;
    }
  },

  initUserTodo: async (
    parent,
    { userID },
    { userModel, todoModel, pubSub }
  ) => {
    const user = await userModel.findOne({ _id: userID });

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.userTodo.length === 0) {
      return [];
    } else {
      console.log("todo not empty");
    }
  },

  /**
   * Get all tasks
   */
  // tasks: async (parent, args, { taskModel }) => {
  //   const tasks = await taskModel.find().sort({ dueDate: -1 });
  //   return tasks;
  // },

  initMember: async (parent, { teamID }, { teamModel, pubSub }) => {
    const team = await teamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamMember.length !== 0) return team.teamMember;
    else return [];
  },

  initScore: async (parent, { teamID }, { teamModel, pubSub }) => {
    const team = await teamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamScore.length !== 0) return team.teamScore;
    else return [];
  },

  initGallery: async (parent, { teamID }, { teamModel, pubSub }) => {
    const team = await teamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamGallery.length !== 0) return team.teamGallery;
    else return [];
  },

  initGantt: async (parent, { teamID }, { teamModel, pubSub }) => {
    const team = await teamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamGantt.length !== 0) return team.teamGantt;
    else return [];
  },
/* --------------------------------------- */
  initTeam: async (parent, { userID }, { userModel, pubSub }) => {
    const user = await userModel.findOne({ _id: userID });
    if (!user) throw new Error("User not found!");
    if (user.allTeams.length !== 0) return user.allTeams;
    else return [];
  },
  users: () => {
    return UserModel.find()
  },

  
};

export default Query;
