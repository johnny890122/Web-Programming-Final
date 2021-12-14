const EventData = [
    {id: "4",
     title: "練球",
     description: "好想回家嗚嗚嗚", 
     start: "2021-12-15 18:00",
     end: null,
     type: "team",
     location: "台大",
     posttime: "2021-12-15 03:00",
     author: {id: "0",
              name: "Yoga"},
     reply: [{id: "0",
              name: "Yoga",
              attend: true,
              content: null},
              {id: "0",
              name: "Yoga2",
              attend: null,
              content: null},
              {id: "0",
              name: "Yoga3",
              attend: false,
              content: "很累"},]
    },
    {id: "3",
     title: "投票",
     description: "", 
     start: "2021-12-18",
     end: null,
     type: "user",
     location: "梧棲",
     posttime: "2021-12-15 01:00",
     author: {id: "0",
              name: "Yoga"}
    },
    {id: "2",
     title: "打疫苗",
     description: "", 
     start: "2021-11-29 17:00",
     end: null,
     type: "user",
     location: "診所",
     posttime: "2021-11-15 01:00",
     author: {id: "0",
              name: "Yoga"}
    },    
    {id: "1",
     title: "壽喜燒",
     description: "", 
     start: "2021-11-28 18:30",
     end: null,
     type: "team",
     location: "一番地",
     posttime: "2021-11-10 01:00",
     author: {id: "0",
              name: "Yoga"}
    }
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
    {id: "3", 
     team: "ECON",
     date: "2021-12-09",
     opponent: "土木",
     teamSet: 0,
     oppoSet: 2,     
     win: "lose",
     points: [{set: 1,
               teamPoint: 15,
               oppoPoint: 25}, 
              {set: 2,
               teamPoint: 17,
               oppoPoint: 25}]
    },
    {id: "2", 
     team: "ECON",
     date: "2021-11-18",
     opponent: "外文",
     teamSet: 0,
     oppoSet: 2,     
     win: "lose",
     points: [{set: 1,
               teamPoint: 13,
               oppoPoint: 25}, 
              {set: 2,
               teamPoint: 9,
               oppoPoint: 25}]
    },
    {id: "1", 
     team: "ECON",
     date: "2021-11-18",
     opponent: "地地",
     teamSet: 2,
     oppoSet: 0,     
     win: "win",
     points: [{set: 1,
               teamPoint: 25,
               oppoPoint: 22}, 
              {set: 2,
               teamPoint: 25,
               oppoPoint: 14}]
    },
]

var VoteData = [
    {id: "2", 
     title: "隊聚時間",
     description: "快點決定!",
     end: "2021-12-1 00:00",
     act: true,
     limit: false,
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
     description: "都不行...",
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
     title: "[閒聊] 出事了阿北",
     author: "Yoga", 
     time: "2021-11-27 19:32:00",
     content: "沒有錢交隊費..."
    },
]

export { EventData, TeamData , ScoreData , VoteData, BirthData, PostData};