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


