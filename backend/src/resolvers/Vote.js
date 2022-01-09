const Vote = {
    voteCreator: async (parent, args, { db, pubSub }) => {
        //console.log(parent.voteCreator)
        return await db.UserModel.findById(parent.voteCreator)
    },

    voteOption: async (parent, args, { db, pubSub }) => {
        //console.log(parent.voteOption)
        return await db.VoteOptionModel.find({_id: { $in : parent.voteOption }})
    },
}
  
export default Vote;