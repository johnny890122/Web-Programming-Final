const EventData = [
    {id: "5",
     title: "打疫苗",
     start: "2021-11-29 17:00",
     type: "user",
     location: "診所"
    },    
    {id: "4",
     title: "壽喜燒",
     start: "2021-11-28 18:30",
     type: "team",
     location: "一番地"
    },
    {id: "3",
     title: "系級杯",
     start: "2021-11-28 08:30",
     type: "team",
     location: "台大"
    },// ISO 8601の形式で。
    {id: "2",
     title: "練球", 
     start: "2021-11-24", 
     end: "2021-11-25", 
     type: "team"
    },
    {id: "1", 
     title: "vs 外文", 
     start: "2021-11-18",
     type: "team",
     location: "台大"
    },
]

const TeamData = [
    {id: "2", 
     teamname: "網服本部", 
     status: "Member",
     description: "哭"
    },
    {id: "1", 
     teamname: "ECON女排", 
     status: "Manager",
     description: "雖毛大集合"
    },
]

const ScoreData = [
    {id: "2", 
     team: "ECON",
     date: "2021-11-18",
     opponent: "外文",
     teamSet: 0,
     opponentSet: 2,     
     win: "lose"
    },
    {id: "1", 
     team: "ECON",
     date: "2021-11-18",
     opponent: "地地",
     teamSet: 2,
     opponentSet: 0,     
     win: "win"
    },
]

const VoteData = [
    {id: "2", 
     title: "隊聚時間",
     end: "2021-12-1 00:00",
     act: true,
     limit: null,
     options: [
            {id: "3",
             name: "12/8(三)",
             select: false,
             count: 7},
            {id: "2",
             name: "12/11(六)",
             select: true,
              count: 5},
            {id: "1",
             name: "12/15(三)",
             select: false,
             count: 9}
            ],
     result: null
    },
    {id: "1", 
     title: "校長盃不行時間",
     end: "2021-12-1 00:00",
     act: false,
     limit: 1,
     options: [{id: "2",
               name: "12/11(六)",
               select: false,
               count: 5},
              {id: "1",
               name: "11/23(三)",
               select: true,
               count: 10}],
     result: {id: "1",
               name: "11/23(三)",
               count: 10}
    },
]

const BirthData = [
    {id: "1", 
     name: "波波弟",
     date: "2021-11-15",
    },
]

const PostData = [
    {id: "1", 
     title: "Yoga",
     time: "2021-11-27 19:32:00",
     content: "沒錢交隊費..."
    },
]

export { EventData, TeamData , ScoreData , VoteData, BirthData, PostData};