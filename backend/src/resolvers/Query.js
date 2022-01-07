const Query = {
  userLogin: async ( parent, { userAccount, userPassword }, { db, pubSub } ) => {
    const user = await db.UserModel.findOne({ userAccount });

    if (!user) {
      throw new Error("Account not existed!");
    } 
    else if (user.userPassword != userPassword) {
      throw new Error("Password not correct!");
    }

    return user;
  },

  initUserNotification: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
    
    if (!user) {
      throw new Error("User not found!");
    } 
    else if (user.userNotification.length === 0) {
      throw new Error("Notification is empty!");
    }

    return await db.NotificationTaskModel.find( { userID } );
  },

  initUserAchievement: async (parent, {userID}, {db, pubSub}) => {
    const user = await db.UserModel.findOne({ userID: userID });
    
    if (!user) {
      throw new Error("User not found!");
    }
    else if (user.userAchievement.length === 0) {
      throw new Error("Achievement is empty!");
    }

    return await db.AchievementModel.find( { userID } );
  },

  initUserEvent: async (parent, {userID}, {db, pubSub}) => {
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }
    else if (user.userAchievement.length === 0) {
      throw new Error("User event is empty!");
    }
    
    return await db.DashboardEventModel.find( { userID } );
  },

  initUserTodo: async (
    parent,
    { userID },
    { db, pubSub }
  ) => {
    const user = await db.UserModel.findOne({ userID: userID });

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.userTodo.length === 0) {
      console.log("Todo is empty");
    } else {
      console.log("todo not empty");
    }
  },

  initMember: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamMember.length !== 0) return team.teamMember;
    else return [];
  },

  initScore: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamScore.length !== 0) return team.teamScore;
    else return [];
  },

  initGallery: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamGallery.length !== 0) return team.teamGallery;
    else return [];
  },

  initGantt: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ _id: teamID });
    if (!team) throw new Error("Team not found!");
    if (team.teamGantt.length !== 0) return team.teamGantt;
    else return [];
  },
  /* --------------------------------------- */
  users: async (parent, args, { db, pubSub }) => {
    return db.UserModel.find();
  },

  teams: async (parent, args, { db, pubSub }) => {
    return db.TeamModel.find();
  },

  initTeam: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ _id: userID });
    if (!user) throw new Error("User not found!");
    if (user.allTeams.length !== 0) return user.allTeams;
    else return [];
  },

  initTeamEvent: async (parent, args, { db, pubSub }) => {
    const { _id } = args;
    const Team = await db.TeamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamEvent.length !== 0) return Team.teamEvent;
    else return [];
  },

  initTeamPost: async (parent, args, { db, pubSub }) => {
    const { _id } = args;
    const Team = await db.TeamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamPost.length !== 0) return Team.teamPost;
    else return [];
  },

  initVote: async (parent, args, { db, pubSub }) => {
    const { _id } = args;
    const Team = await db.TeamModel.findOne({ _id: _id });
    if (!Team) throw new Error("Team not found!");
    if (Team.teamVote.length !== 0) return Team.teamVote;
    else return [];
  },
};

export default Query;
