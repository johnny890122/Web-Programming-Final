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
}
  
export default Team;