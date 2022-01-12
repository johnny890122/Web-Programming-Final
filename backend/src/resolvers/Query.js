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

  eventDetail: async (parent, { eventID }, { db, pubSub }) => {
    const event = await db.DashboardEventModel.findOne({ eventID });

    if (!event) {
      throw new Error("Event not found!");
    }
    return event;
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
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const members = await db.MemberModel.findOne({ teamID: teamID });
    if (members.length !== 0) return members;
    else return [];
  },

  initContest: async (parent, { teamID }, { db, pubSub }) => {
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const contest = await db.ContestModel.find({ teamID });
    if (!contest) {
      return [];
    }
    return contest;
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

  initTeam: async (parent, args, { db, pubSub }) => {    
    const { userID } = args;
    const User = await db.UserModel.findOne({ userID: userID });

    if (!User) {
      throw new Error("This user doesn't exist!");
    }

    return User.allTeams;
  },
  initTeamEvent: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    if (!Team) {
      throw new Error("This team doesn't exist!");
    }
    
    return Team.teamEvent;
  },
  initTeamPost: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    if (!Team) {
      throw new Error("This team doesn't exist!");
    }
    
    return Team.teamPost;
  },
  initVote: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    if (!Team) {
      throw new Error("This team doesn't exist!");
    }
    
    return Team.teamVote;
  },

  /* ------------- Query one, all------------- */

  users: async (parent, args, { db, pubSub }) => {return db.UserModel.find();},
  teams: async (parent, args, { db, pubSub }) => {return db.TeamModel.find();},
  
  user: async (parent, args, { db, pubSub }) => {
    const { userID } = args;
    const User = await db.UserModel.findOne({ userID: userID });

    if (!User) {
      throw new Error("This user doesn't exist!");
    }
    return User;
  },
  team: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    if (!Team) {
      throw new Error("This team doesn't exist!");
    }
    return Team;
  },
  post: async (parent, args, { db, pubSub }) => {
    const { postID } = args;
    const Post = await db.PostModel.findOne({ postID: postID });

    if (!Post) {
      throw new Error("This post doesn't exist!");
    }
    return Post;
  },
  teamEvent: async (parent, args, { db, pubSub }) => {
    const { eventID } = args;
    const Event = await db.EventModel.findOne({ eventID: eventID });

    if (!Event) {
      throw new Error("This event doesn't exist!");
    }
    return Event;
  },
  vote: async (parent, args, { db, pubSub }) => {
    const { voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });

    if (!Vote) {
      throw new Error("This vote doesn't exist!");
    }
    return Vote;
  },
};

export default Query;
