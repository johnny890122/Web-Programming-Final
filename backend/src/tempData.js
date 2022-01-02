const UserData = [
    {
        userID: 1,
        userAccount: 'b06303096',
        userPassword: 'password',
        userEmail: 'b06303096@ntu.edu.tw',
        userName: 'Yoga',
        userBirthday: 19990423,
        userStatus: '遊手好閒',
        userProfile: '遊手好閒.jpg',
        allTeams: [
            {
                teamID: 1,
                teamName: "網服戰隊",
                teamDescription: "請支援hw",
                teamType: "期末分組"
            },
            {
                teamID: 2,
                teamName: "ECON女排",
                teamDescription: "博雅心灰意冷",
                teamType: "球隊"
            }
        ]
        //userTodo: [DashboardTodo!]!
        //userNotification: [DashboardNotification!]!
        //userEvent: [DashboardEvent!]!
        //userPlaySet: [UserPlaySet!]!
    },
    {
        userID: 2,
        userAccount: 'b06303096-2',
        userPassword: 'password-2',
        userEmail: 'b06303096@ntu.edu.tw-2',
        userName: 'Yoga-2',
        userBirthday: 19990423,
        userStatus: '遊手好閒-2',
        userProfile: '遊手好閒-2.jpg',
        allTeams: [
            {
                teamID: 1,
                teamName: "網服戰隊",
                teamDescription: "請支援hw",
                teamType: "期末分組"
            },
        ]
    },
    {
        userID: 3,
        userAccount: 'b06303096-3',
        userPassword: 'password-3',
        userEmail: 'b06303096@ntu.edu.tw-3',
        userName: 'Yoga-3',
        userBirthday: 19990423,
        userStatus: '遊手好閒-3',
        userProfile: '遊手好閒-3.jpg',
        allTeams: [
            {
                teamID: 2,
                teamName: "ECON女排",
                teamDescription: "博雅心灰意冷",
                teamType: "球隊"
            }
        ]
    }
]

const TeamData = [
    {
        teamID: 1,
        teamName: "網服戰隊",
        teamDescription: "請支援hw",
        teamType: "期末分組",
        teamCreateDate: 20211116,
        teamMember: [
            {
                userID: 1,
                userAccount: 'b06303096',
                userEmail: 'b06303096@ntu.edu.tw',
                userName: 'Yoga',
                userBirthday: 19990423,
            },
            {
                userID: 2,
                userAccount: 'b06303096-2',
                userEmail: 'b06303096@ntu.edu.tw-2',
                userName: 'Yoga-2',
                userBirthday: 19990423,
            }
        ]
    },
    {
        teamID: 2,
        teamName: "ECON女排",
        teamDescription: "博雅心灰意冷",
        teamType: "球隊",
        teamCreateDate: 20210901,
        teamMember: [
            {
                userID: 1,
                userAccount: 'b06303096',
                userEmail: 'b06303096@ntu.edu.tw',
                userName: 'Yoga',
                userBirthday: 19990423,
            },
            {
                userID: 3,
                userAccount: 'b06303096-3',
                userEmail: 'b06303096@ntu.edu.tw-3',
                userName: 'Yoga-3',
                userBirthday: 19990423,
            },
        ]
    }
]

module.exports = { UserData, TeamData };