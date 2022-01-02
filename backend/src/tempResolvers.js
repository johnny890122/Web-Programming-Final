var { UserData, TeamData } = require("./tempData");

const resolvers = {
    Query: {      

        // // users resolvers
        // users: () => {
        //     return UserData
        // },
        // user: (_, args) => { 
        //     const account = args.userAccount;
        //     return UserData.find(user => user.userAccount === account)
        // },

        // // team resolvers
        // teams: () => {
        //     return TeamData
        // },
        // team: (_, args) => {
        //     const name = args.teamName;
        //     return TeamData.find(team => team.teamName === name)
        // }
    },
    
//    User: {
//        xxx: () => {
//            return xxx
//        }
//    },

    Mutation: {
        // createUser: (_, args) => {
        //     const user = args.input;
        //     const lastId = UserData[UserData.length-1].id
        //     user.userID = lastId +1;
        //     UserData.push(user);
        //     return user;
        // }, 
        // UpdateUserPassword: (_, args) => {
        //     const {userAccount, newUserPassword} = args.input;
        //     let userUpdated;
        //     UserData.forEach(user => {
        //         if (user.userAccount === userAccount) {
        //             user.userPassword = newUserPassword;
        //             userUpdated = user;                
        //         }
        //     });
        //     return userUpdated;
        // },
        // deleteUser: (_, args) => {
        //     const userAccount = args.userAccount;
        //     const removeUser = UserData.find(user => user.userAccount === userAccount)
        //     UserData = UserData.filter(user => user.userAccount != userAccount);
        //     return removeUser
        // }
    }
}

module.exports = { resolvers };