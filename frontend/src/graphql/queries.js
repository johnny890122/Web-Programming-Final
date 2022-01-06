import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  query userLogin (
    $userAccount: String, 
    $userPassword: String,
  ) {
    userLogin(
      userAccount: $userAccount, 
      userPassword: $userPassword
    ) 
    {
      userID
      userAccount
      userPassword
    }
  }
`;

export const USER_TODO_INIT = gql`
  query initUserTodo (
    $userID: String,
  ) {
    initUserTodo(
      userID: $userID
    ){
      userID
      userTodo
    }
  }
`

export const USER_NOTIFICATION_INIT = gql`
  query initUserNotification (
    $userID: String,
  ) {
    initUserNotification(
      userID: $userID
    ){
      taskTime
      taskType
      taskContent
    }
  }
`

export const USER_ACHEIEVEMENT_INIT = gql`
  query initUserAchievement (
    $userID: String,
  ) {
  initUserAchievement(
    userID: $userID
  ){
    userAchievementTitle
    userAchievementContent
  }
}
`
