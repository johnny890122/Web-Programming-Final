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

export const EVENT_DETAIL = gql`
  query eventDetail($eventID: String) {
    eventDetail(eventID: $eventID) {
      eventTitle
      eventStart
      eventEnd
      eventDescription
      eventLocation
      eventPostTime
    }
  }
`;

export const TEAM_THIS_INIT = gql`
  query team($teamID: String) {
    team(teamID: $teamID) {
      teamID
      teamName
      teamDescription
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

export const TEAM_SCORE_INIT = gql`
  query initScore($teamID: String) {
    initScore(teamID: $teamID) {
      teamID
      contestID
      contestTitle
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
