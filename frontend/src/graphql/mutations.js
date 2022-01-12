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

export const DELETE_USER_EVENT = gql`
  mutation deleteUserEvent($eventID: String) {
    deleteUserEvent(eventID: $eventID)
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam(
    $teamName: String!
    $teamDescription: String!
    $teamType: String!
    $creatorID: String!
  ) {
    createTeam(
      teamName: $teamName
      teamDescription: $teamDescription
      teamType: $teamType
      creatorID: $creatorID
    ) {
      teamID
    }
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
