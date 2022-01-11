const Team = {
    teamMember: async (parent, args, { db, pubSub }) => {
        //console.log(parent.teamMember)
        return await db.UserModel.find({_id: { $in : parent.teamMember }})
    },
    teamPost: async (parent, args, { db, pubSub }) => {
        //console.log(parent.teamPost)
        return await db.PostModel.find({_id: { $in : parent.teamPost }})
    },
    teamEvent: async (parent, args, { db, pubSub }) => {
        //console.log(parent.teamEvent)
        return await db.EventModel.find({_id: { $in : parent.teamEvent }})
    },
    teamVote: async (parent, args, { db, pubSub }) => {
        return await db.VoteModel.find({_id: { $in : parent.teamVote }})
    },
    teamManager: async (parent, args, { db, pubSub }) => {
        //console.log(parent.teamManager)
        return await db.UserModel.find({_id: { $in : parent.teamManager }})
    },
    teamContest: async (parent, args, { db, pubSub }) => {
        //console.log(parent.teamContest)
        return await db.ContestModel.find({_id: { $in : parent.teamContest }})
    },

    //teamGallery: async (parent, args, { db, pubSub }) => {},
    //teamGantt: async (parent, args, { db, pubSub }) => {},
    
}
  
export default Team;