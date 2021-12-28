var { UserList, MovieList } = require("./testData");
//const _ = require('lodash');

const resolvers = {
    Query: {      

        // users resolvers
        users: () => {
            return UserList
        },
        user: (_, args) => { 
            const id = args.id;
            return UserList.find(user => user.id === Number(id))
        },

        // movie resolvers
        movies: () => {
            return MovieList
        },
        movie: (_, args) => {
            const name = args.name;
            return MovieList.find(movie => movie.name === name)
        }
    },
    
    User: {
        favoriteMovies: () => {
            return MovieList.filter(movie => movie.year >= 2002)
        }
    },

    Mutation: {
        createUser: (_, args) => {
            const user = args.input;
            const lastId = UserList [UserList.length-1].id
            user.id = lastId +1;
            UserList.push(user);
            return user;
        }, 
        updateUserName: (_, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach(user => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    userUpdated = user;                
                }
            });
            return userUpdated;
        },
        deleteUser: (_, args) => {
            const id = args.id;
            const removeUser = UserList.find(user => user.id === Number(id))
            UserList = UserList.filter(user => user.id != Number(id));
            return removeUser
        }
    }

}
module.exports = { resolvers };