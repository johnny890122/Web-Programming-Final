const UserList = [
    {
        id: 1, 
        name: 'Yoga', 
        username: 'yoga', 
        age: 22, 
        nationality: "TC",
        friends: [
            {
                id: 2, 
                name: 'M', 
                username: 'm', 
                age: 20, 
                nationality: "NTP"
            },
            {
                id: 2, 
                name: 'J', 
                username: 'j', 
                age: 21, 
                nationality: "TW"
            }
        ]
    },
    {
        id: 2, 
        name: 'M', 
        username: 'm', 
        age: 20, 
        nationality: "NTP",
        friends: [
            {
                id: 2, 
                name: 'J', 
                username: 'j', 
                age: 21, 
                nationality: "TW"
            }
        ]
    },
    {
        id: 3, 
        name: 'J', 
        username: 'j', 
        age: 21, 
        nationality: "TW"
    }  
]

const MovieList = [
    {
        id: 1,
        name: "M1",
        year: 2001,
        inTheaters: true,
    },
    {
        id: 2,
        name: "M2",
        year: 2002,
        inTheaters: false,
    },
    {
        id: 3,
        name: "M3",
        year: 2003,
        inTheaters: true,
    },
]

module.exports = { UserList, MovieList };