const User = {
  allTeams: async (parent, args, { db, pubSub }) => {
    //console.log(parent.allTeams)
    return await db.TeamModel.find({_id: { $in : parent.allTeams }})
  }
}

export default User;