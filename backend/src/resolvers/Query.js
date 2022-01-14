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

  userEventDetail: async (parent, { eventID }, { db, pubSub }) => {
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

  initUserTeamEvent: async (parent, { userID }, { db, pubSub }) => {
    const user = await db.UserModel.findOne({ userID: userID });
    if (!user) {
      throw new Error("User not found!");
    }

    const userTeamEvent = [];

    for (var i of user.allTeams) {
      let team = await db.TeamModel.findOne({ _id: i });
      let events = await db.EventModel.find({ teamID: team.teamID });

      events.map((j) => userTeamEvent.push(j));
    }

    return userTeamEvent;
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

  findTeamName: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    if (!Team) {
      throw new Error("Team not found!");
    }
    return Team.teamName;
  },

  initTeam: async (parent, args, { db, pubSub }) => {
    const { userID } = args;
    const User = await db.UserModel.findOne({ userID: userID });

    if (!User) {
      throw new Error("This user doesn't exist!");
    }
    let allTeams = [];
    if (User.allTeams.length !== 0) {
      for (let i = 0; i < User.allTeams.length; i++) {
        let Team = await db.TeamModel.findOne({ _id: User.allTeams[i] });
        allTeams.push(Team);
      }
    }
    return allTeams;
  },

  //---------- Team ----------//

  initMember: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const Team = await db.TeamModel.findOne({ teamID: teamID });
    if (!Team) {
      throw new Error("Team not found!");
    }
    let allMembers = [];
    if (Team.teamMember.length !== 0) {
      for (let i = 0; i < Team.teamMember.length; i++) {
        let User = await db.UserModel.findOne({ _id: Team.teamMember[i] });
        allMembers.push(User);
      }
    }
    return allMembers;
  },

  isManaging: async (parent, args, { db, pubSub }) => {
    const { userID, teamID } = args;
    const User = await db.UserModel.findOne({ userID: userID });
    if (!User) {
      throw new Error("User not found!");
    }
    let allManagingTeamID = [];
    if (User.manageTeams.length !== 0) {
      for (let i = 0; i < User.manageTeams.length; i++) {
        let Team = await db.TeamModel.findOne({ _id: User.manageTeams[i] });
        allManagingTeamID.push(Team.teamID);
      }
    }
    if (allManagingTeamID.includes(teamID)) {
      return true;
    }
    return false;
  },

  initContest: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const contest = await team.teamContest;
    if (!contest) {
      return [];
    }
    return contest;
  },

  initTeamEvent: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });

    if (!team) {
      throw new Error("This team doesn't exist!");
    }

    const teamEvent = await db.EventModel.find({ teamID: teamID });
    return teamEvent;
  },

  initTeamPost: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });

    if (!team) {
      throw new Error("This team doesn't exist!");
    }

    const posts = await db.PostModel.find({ teamID });
    if (!posts) return [];
    return posts;
  },

  initVote: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });

    if (!team) {
      throw new Error("This team doesn't exist!");
    }

    const teamVote = await team.teamVote;
    if (!teamVote) {
      return [];
    }
    return teamVote;
  },

  teamEventDetail: async (parent, args, { db, pubSub }) => {
    const { eventID } = args;
    const event = await db.EventModel.findOne({ eventID: eventID });

    if (!event) {
      throw new Error("Event not found!");
    }
    return event;
  },

  teamPostDetail: async (parent, args, { db, pubSub }) => {
    const { postID } = args;
    const Post = await db.PostModel.findOne({ postID: postID });

    if (!Post) {
      throw new Error("This post doesn't exist!");
    }
    return Post;
  },

  teamVoteDetail: async (parent, args, { db, pubSub }) => {
    const { voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });

    if (!Vote) {
      throw new Error("This vote doesn't exist!");
    }
    return Vote;
  },

  /* ------------- Query one, all------------- */

  users: async (parent, args, { db, pubSub }) => {
    return db.UserModel.find();
  },
  teams: async (parent, args, { db, pubSub }) => {
    return db.TeamModel.find();
  },

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
};

export default Query;

/*
initGallery: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const gallery = team.teamGallery;
    if (!gallery) {return []}
    return gallery;
  },

  initGantt: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const gantt = await team.teamGantt;
    if (!gantt) {return []}
    return gantt;
  },
   */
