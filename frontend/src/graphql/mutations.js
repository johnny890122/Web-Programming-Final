import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $userAccount: String!, 
    $userPassword: String!,
    $userEmail: String!,
  ) {
    createUser(
      userAccount: $userAccount, 
      userPassword: $userPassword
      userEmail: $userEmail
    ) {
        userID
      }
    }
`;


export const CREATE_USER_EVENT = gql`
mutation createUserEvent(
  $eventCreator: String,
  $eventTitle: String,
  $eventDescription: String,
  $eventStart: Float,
  $eventEnd: Float,
  $eventLocation: String
){
  createUserEvent(
    eventCreator: $eventCreator,
    eventTitle: $eventTitle,
    eventDescription: $eventDescription
    eventStart: $eventStart,
    eventEnd: $eventEnd,
    eventLocation: $eventLocation
  )
}
`