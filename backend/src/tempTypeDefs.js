const { gql }  = require("apollo-server");

const typeDefs = gql`

    ## Data
    type User {
        userID: ID!
        userAccount: String!
        userPassword: String!
        userEmail: String!
        userName: String!
        userBirthday: Int!
        userStatus: String
        userProfile: String
        allTeams: [Team!]!
        #userTodo: [DashboardTodo!]!
        #userNotification: [DashboardNotification!]!
        #userEvent: [DashboardEvent!]!
        #userPlaySet: [UserPlaySet!]!
    }
    type Team {
        teamID: ID!
        teamName: String!
        teamDescription: String
        teamType: String!
        teamCreateDate: Int!
        teamMember: [User!]!
        #teamGallery: [Gallery!]!
        #teamPost: [Post!]!
        #teamGantt: [Gantt!]!
        #teamScore: [Score!]!
        #teamVote: [Vote!]!
        #teamEvent: [Event]!
    }

    ## Query
    type Query {
        users: [User!]!
        user(userAccount: String!): User!
        teams: [Team!]!
        team(teamName: String!): Team!
    }

    ## Input & Mutation
    input CreateUserInput {
        userAccount: String!
        userPassword: String!
        userEmail: String!
        userName: String!
        userBirthday: Int!
    }
    input UpdateUserPasswordInput {
        userAccount: String!
        userPassword: String!
    }
    type Mutation {
        createUser(input: CreateUserInput!): User
        UpdateUserPassword(input: UpdateUserPasswordInput!): User
        deleteUser(userAccount: String!): User
    }

    # enum {} 
`;

module.exports = { typeDefs };
