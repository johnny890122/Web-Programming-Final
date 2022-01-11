import dotenv from "dotenv-defaults";
dotenv.config();

const UserInput = [
    {userAccount: "b06303096-2", userPassword: "123", userEmail: "b06303096-2@ntu.edu.tw"},
    {userAccount: "b06303096-3", userPassword: "123", userEmail: "b06303096-3@ntu.edu.tw"},
    {userAccount: "b06303096-4", userPassword: "123", userEmail: "b06303096-4@ntu.edu.tw"},
]

const TeamInput = [
    {teamName: "網服戰隊", teamDescription: "請支援hw", teamType: "期末分組", creatorID: process.env.User0},
    {teamName: "ECON女排", teamDescription: "博雅心灰意冷", teamType: "球隊", creatorID: process.env.User0}
]

const TeamEventInput = [
    {
        eventTitle: "TeamEvent1",
        eventDescription: "描述1",
        eventStart: "2022/01/16 00:00",
        eventEnd: "2022/01/16 23:59",
        eventLocation: "地點1",
        teamID: "",
        creatorID: process.env.User0,
    }
]

export { UserData, TeamData };