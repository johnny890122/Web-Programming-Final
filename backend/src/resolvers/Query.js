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

  initUserNotification: async (
    parent,
    { userID },
    { userModel, dashboardNotificationModel, pubSub }
  ) => {
    const user = await userModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    } else if (user.userNotification.length === 0) {
      throw new Error("Notification is empty!");
    }

    return user.userNotification;
  },

  initUserTodo: async (
    parent,
    { userID },
    { userModel, todoModel, pubSub }
  ) => {
    const user = await userModel.findOne({ userID: userID });

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.userTodo.length === 0) {
      console.log("Todo is empty");
    } else {
      console.log("todo not empty");
    }
  },

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
  users: async (parent, args, { userModel, pubSub }) => {
    return userModel.find();
  },

  teams: async (parent, args, { teamModel, pubSub }) => {
    return teamModel.find();
  },

  initTeam: async (parent, { userID }, { userModel, pubSub }) => {
    const user = await userModel.findOne({ _id: userID });
    if (!user) throw new Error("User not found!");
    if (user.allTeams.length !== 0) return user.allTeams;
    else return [];
  },

  initTeamEvent: async (parent, args, { teamModel, pubSub }) => {
    const { _id } = args;
    const Team = await teamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamEvent.length !== 0) return Team.teamEvent;
    else return [];
  },

  initTeamPost: async (parent, args, { teamModel, pubSub }) => {
    const { _id } = args;
    const Team = await teamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamPost.length !== 0) return Team.teamPost;
    else return [];
  },

  initVote: async (parent, args, { teamModel, pubSub }) => {
    const { _id } = args;
    const Team = await teamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamVote.length !== 0) return Team.teamVote;
    else return [];
  },
};

export default Query;
