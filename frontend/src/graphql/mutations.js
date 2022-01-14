import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $userAccount: String!
    $userPassword: String!
    $userEmail: String!
  ) {
    createUser(
      userAccount: $userAccount
      userPassword: $userPassword
      userEmail: $userEmail
    ) {
      userID
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $userID: String
    $userName: String
    $userBirthday: Float
  ) {
    updateUser(
      userID: $userID
      userName: $userName
      userBirthday: $userBirthday
    ) {
      userID
    }
  }
`;

export const CREATE_USER_EVENT = gql`
  mutation createUserEvent(
    $eventCreator: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
  ) {
    createUserEvent(
      eventCreator: $eventCreator
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
    )
  }
`;

export const UPDATE_USER_EVENT = gql`
  mutation updateUserEvent(
    $eventID: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
  ) {
    updateUserEvent(
      eventID: $eventID
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
    )
  }
`;

export const UPDATE_TEAM_EVENT = gql`
  mutation updateTeamEvent(
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
    $eventID: String
  ) {
    updateTeamEvent(
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
      eventID: $eventID
    )
  }
`;

export const DELETE_USER_EVENT = gql`
  mutation deleteUserEvent($eventID: String) {
    deleteUserEvent(eventID: $eventID)
  }
`;

export const CREATE_TEAM_EVENT = gql`
  mutation createTeamEvent(
    $teamID: String
    $eventTitle: String
    $eventDescription: String
    $eventStart: Float
    $eventEnd: Float
    $eventLocation: String
    $creatorID: String
  ) {
    createTeamEvent(
      teamID: $teamID
      eventTitle: $eventTitle
      eventDescription: $eventDescription
      eventStart: $eventStart
      eventEnd: $eventEnd
      eventLocation: $eventLocation
      creatorID: $creatorID
    )
  }
`;

export const DELETE_TEAM_EVENT = gql`
  mutation deleteTeamEvent($eventID: String) {
    deleteTeamEvent(eventID: $eventID)
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam(
    $teamName: String!
    $teamDescription: String!
    $teamType: String!
    $creatorID: String!
    $memberAccount: [String]
  ) {
    createTeam(
      teamName: $teamName
      teamDescription: $teamDescription
      teamType: $teamType
      creatorID: $creatorID
      memberAccount: $memberAccount
    ) {
      teamID
    }
  }
`;

export const CREATE_TEAM_POST = gql`
  mutation createPost(
    $teamID: String
    $postTitle: String
    $postContent: String
    $creatorID: String
  ) {
    postID
  }
`;

export const CREATE_TEAM_SCORE = gql`
  mutation createScore(
    $teamID: String
    $contestData: Int
    $contestIsWin: Boolean
    $contestTitle: String
    $contestOpponent: String
  ) {
    createScore(
      teamID: $teamID
      contestDate: $contestDate
      contestIsWin: $contestIsWin
      contestTitle: $contestTitle
      contestOpponent: $contestOpponent
    ) {
      contestID
    }
  }
`;

export const DELETE_TEAM_MEMBER = gql`
  mutation deleteMember($teamID: String, $memberID: String) {
    deleteMember(teamID: $teamID, memberID: $memberID) {
      userID
    }
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation addMember($teamID: String, $memberAccount: String) {
    addMember(teamID: $teamID, memberAccount: $memberAccount) {
      userID
    }
  }
`;

export const CREATE_GALLERY = gql`
  mutation createGallery($teamID: String, $galleryTitle: String) {
    createGallery(teamID: $teamID, galleryTitle: $galleryTitle) {
      teamID
      galleryID
      galleryTitle
    }
  }
`;

export const CREATE_GANTT = gql`
  mutation createGantt($teamID: String, $ganttTitle: String) {
    createGantt(teamID: $teamID, ganttTitle: $ganttTitle) {
      teamID
      ganttID
      ganttTitle
    }
  }
`;
