import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  query userLogin($userAccount: String, $userPassword: String) {
    userLogin(userAccount: $userAccount, userPassword: $userPassword) {
      userID
      userAccount
      userPassword
    }
  }
`;

export const USER_ACCOUNT = gql`
  query myUserAccount($userID: String) {
    myUserAccount(userID: $userID) {
      userID
      userAccount
      userPassword
      userName
      userProfile
      userBirthday
      userEmail
    }
  }
`;

export const USER_TODO_INIT = gql`
  query initUserTodo($userID: String) {
    initUserTodo(userID: $userID) {
      userID
      userTodo
    }
  }
`;

export const USER_NOTIFICATION_INIT = gql`
  query initUserNotification($userID: String) {
    initUserNotification(userID: $userID) {
      taskTime
      taskTitle
      taskType
      taskContent
    }
  }
`;

export const USER_ACHEIEVEMENT_INIT = gql`
  query initUserAchievement($userID: String) {
    initUserAchievement(userID: $userID) {
      userAchievementTitle
      userAchievementContent
    }
  }
`;

export const USER_EVENT_INIT = gql`
  query initUserEvent($userID: String) {
    initUserEvent(userID: $userID) {
      type
      eventID
      eventTitle
      eventDescription
      eventStart
      eventEnd
      eventLocation
      eventPostTime
    }
  }
`;

export const USER_TEAM_EVENT_INIT = gql`
  query initUserTeamEvent($userID: String) {
    initUserTeamEvent(userID: $userID) {
      type
      teamID
      eventTitle
      eventID
      eventTitle
      eventDescription
      eventStart
      eventEnd
      eventLocation
      eventPostTime
      eventReply {
        eventReplyID
      }
    }
  }
`;

export const TEAM_EVENT_INIT = gql`
  query initTeamEvent($teamID: String) {
    initTeamEvent(teamID: $teamID) {
      eventID
      eventTitle
      eventDescription
      eventStart
      eventEnd
      eventLocation
      eventPostTime
      eventCreator {
        userID
        userAccount
      }
    }
  }
`;

export const TEAM_POST_INIT = gql`
  query initTeamPost($teamID: String) {
    initTeamPost(teamID: $teamID) {
      postID
      postTime
      postTitle
      postAuthor {
        userID
        userAccount
      }
      postContent
    }
  }
`;

export const USER_EVENT_DETAIL = gql`
  query userEventDetail($eventID: String) {
    userEventDetail(eventID: $eventID) {
      eventTitle
      eventStart
      eventEnd
      eventDescription
      eventLocation
      eventPostTime
    }
  }
`;

export const TEAM_EVENT_DETAIL = gql`
  query teamEventDetail($eventID: String) {
    teamEventDetail(eventID: $eventID) {
      eventTitle
      eventStart
      eventEnd
      eventDescription
      eventLocation
      eventPostTime
      eventCreator {
        userID
        userAccount
      }
    }
  }
`;

export const TEAM_THIS_INIT = gql`
  query team($teamID: String) {
    team(teamID: $teamID) {
      teamID
      teamName
      teamDescription
      teamManager {
        userID
      }
    }
  }
`;

export const TEAM_INIT = gql`
  query initTeam($userID: String) {
    initTeam(userID: $userID) {
      teamID
      teamName
      teamDescription
      teamType
    }
  }
`;

export const FIND_TEAM_NAME = gql`
  query findTeamName($teamID: String) {
    findTeamName(teamID: $teamID)
  }
`;

export const TEAM_SCORE_INIT = gql`
  query initContest($teamID: String) {
    initContest(teamID: $teamID) {
      contestID
      contestTitle
      contestOpponent
      contestDate
      contestMySet
      contestOppoSet
      contestIsWin
    }
  }
`;

export const TEAM_CONTEST_DETAIL = gql`
  query teamContestDetail($contestID: String) {
    teamContestDetail(contestID: $contestID) {
      contestID
      contestTitle
      contestTitle
      contestIsWin
      contestMyTeam {
        teamID
        teamName
      }
      contestMySet
      contestOppoSet
      contestOpponent
      contestSetDetail {
        setID
        setNumber
        setScore
        setMyPoint
        setOppoPoint
        setOppoErrServe
        setOppoErrAttack
        setOppoErrOther
        setNote
        setPlayerDetail {
          detailID
          detailPlayer {
            userID
            userName
          }
          detailPointServe
          detailPointAttack
          detailPointTip
          detailTimeAttack
          detailTimePass
          detailTimeNoPass
          detailErrPassS
          detailErrPassA
          detailErrPass1
          detailErrSet
          detailErrOther
          detailErrAttack
          detailErrServe
          detailComboServe
        }
      }
    }
  }
`;

export const TEAM_MEMBER_INIT = gql`
  query initMember($teamID: String) {
    initMember(teamID: $teamID) {
      userID
      userAccount
      userName
      userEmail
    }
  }
`;

export const TEAM_PLAYERNAME_INIT = gql`
  query initMember($teamID: String) {
    initMember(teamID: $teamID) {
      userID
      userName
    }
  }
`;

export const TEAM_VOTE_INIT = gql`
  query initVote($teamID: String) {
    initVote(teamID: $teamID) {
      voteID
      voteTitle
      voteDescription
      voteEnd
      voteLimit
      voteOption {
        voteOptionID
        voteOptionName
        votedUser {
          userID
          userAccount
        }
      }
    }
  }
`;

export const TEAM_GALLERY_INIT = gql`
  query initGallery($teamID: String) {
    initGallery(teamID: $teamID) {
      galleryID
    }
  }
`;

export const TEAM_GANTT_INIT = gql`
  query initGantt($teamID: String) {
    initGantt(teamID: $teamID) {
      ganttID
      ganttTitle
    }
  }
`;

// eventCreator: String, eventID: String, eventTitle:String, eventDescription: String,
// eventStart: Int, eventEnd: Int, eventLocation: String, eventPostTime: Int
