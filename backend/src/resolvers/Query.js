import { UserModel } from "../db";
import bcryptjs from "bcryptjs";

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
    const bcrypt = require("bcryptjs");

    if (!user) {
      throw new Error("Account not existed!");
    } else if (!bcrypt.compareSync(userPassword, user.userPassword)) {
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
    const Team = await db.TeamModel.findOne({ teamID: teamID });

    if (!Team) {
      throw new Error("This team doesn't exist!");
    }

    let allVotes = [];
    if (Team.teamVote.length !== 0) {
      for (let i = 0; i < Team.teamVote.length; i++) {
        let Vote = await db.VoteModel.findOne({ _id: Team.teamVote[i] });
        let allVoteOptions = [];
        if (Vote.voteOption.length !== 0) {
          for (let j = 0; j < Vote.voteOption.length; j++) {
            let Option = await db.VoteOptionModel.findOne({
              _id: Vote.voteOption[j],
            });
            allVoteOptions.push(Option);
          }
        }
        Vote.voteOption.voteOptionID = allVoteOptions.voteOptionID;
        Vote.voteOption.voteOptionName = allVoteOptions.voteOptionName;
        Vote.voteOption.votedUser = allVoteOptions.votedUser;
        allVotes.push(Vote);
      }
    }
    return allVotes;
  },

  initVoteOption: async (parent, args, { db, pubSub }) => {
    const { voteID } = args;
    const Vote = await db.VoteModel.findOne({ voteID: voteID });

    if (!Vote) {
      throw new Error("Vote not found!");
    }
    let allVoteOptions = [];
    if (Vote.voteOption.length !== 0) {
      for (let i = 0; i < Vote.voteOption.length; i++) {
        let Option = await db.VoteOptionModel.findOne({
          _id: Vote.voteOption[i],
        });
        allVoteOptions.push(Option);
      }
    }
    return allVoteOptions;
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

  /* ------------- Contest ------------- */

  initContest: async (parent, args, { db, pubSub }) => {
    const { teamID } = args;
    const team = await db.TeamModel.findOne({ teamID: teamID });
    if (!team) {
      throw new Error("Team not found!");
    }
    const contest = await db.ContestModel.find({
      _id: { $in: team.teamContest },
    });
    return contest || [];
  },

  teamContestDetail: async (parent, args, { db, pubSub }) => {
    const { contestID } = args;
    const contest = await db.ContestModel.findOne({ contestID: contestID });
    if (!contest) {
      throw new Error("Contest not found!");
    }
    return contest;
  },

  initSetDetail: async (parent, args, { db, pubSub }) => {
    const { contestID } = args;
    const contest = await db.ContestModel.findOne({ contestID: contestID });
    if (!contest) {
      throw new Error("Contest not found!");
    }
    const setDetail = await db.SetDetailModel.find({
      _id: { $in: contest.contestSetDetail },
    });
    if (!setDetail) {
      return [];
    }
    return setDetail;
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
