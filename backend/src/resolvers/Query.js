import { UserModel } from "../db";

const Query = {
  myUserAccount: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });

    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  },

  userLogin: async (parent, { userAccount, userPassword }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userAccount });

    if (!user) {
      throw new Error("Account not existed!");
    } else if (user.userPassword != userPassword) {
      throw new Error("Password not correct!");
    }

    return user;
  },

  initUserNotification: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });

    if (!user) {
      throw new Error("User not found!");
    }
    const notification = await db.NotificationTaskModel.find({ userID });

    if (!notification) {
      return [];
    }

    return notification;
  },

  initUserAchievement: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
    const achievement = await db.AchievementModel.find({ userID });
    if (!user) {
      throw new Error("User not found!");
    }

    if (!achievement) {
      return [];
    }

    return achievement;
  },

  initUserEvent: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }

    const event = await db.DashboardEventModel.find({ userID });
    if (!event) {
      return [];
    }

    return event;
  },

  initUserTodo: async (parent, { userID }, { db, pubSub }) => {
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
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const score = await db.ScoreModel.find({ teamID });
    if (!score) {
      return [];
    }
    return score;
  },

  initGallery: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const gantt = await db.GanttModel.find({ teamID });
    if (!gantt) {
      return [];
    }
    return gantt;
  },

  initGantt: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const gallery = await db.GalleryModel.find({ teamID });
    if (!gallery) {
      return [];
    }
    return gallery;
  },
  /* --------------------------------------- */
  users: async (parent, args, { db, pubSub }) => {
    return db.UserModel.find();
  },

  teams: async (parent, args, { db, pubSub }) => {
    return db.TeamModel.find({}, {}, { lean: true });
  },

  initTeam: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
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
