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
        userAccount
      }
    }
`;

// // TODO 4.1 Create Task Mutation.
// // Uncomment the following lines and fill the gql part
// export const CREATE_TASK_MUTATION = gql`
//   mutation createTask(
//       $id: ID!
//       $title: String!
//       $content: String!
//       $dueDate: Date!
//       $status: Status!
//     ) {
//     createTask( 
//       input: {
//         id: $id
//         status: $status 
//         title: $title 
//         content: $content
//         dueDate: $dueDate
//     }) {
//       id
//       title
//       content
//       dueDate
//       status
//     }
//   }
// `;

// export const DELETE_TASK_MUTATION = gql`
//   mutation DeleteTask($id: ID!) {
//     deleteTask(id: $id)
//   }
// `;
