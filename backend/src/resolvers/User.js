const User = {

  allTeams: async (parent, args, { db, pubSub }) => {
    //console.log(parent.allTeams)
    return await db.TeamModel.find({_id: { $in : parent.allTeams }})
  },

  manageTeams: async (parent, args, { db, pubSub }) => {
    //console.log(parent.manageTeams)
    return await db.TeamModel.find({_id: { $in : parent.manageTeams }})
  }
}

export default User;