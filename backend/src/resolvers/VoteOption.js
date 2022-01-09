const VoteOption = {
    votedUser: async (parent, args, { db, pubSub }) => {
        //console.log(parent.votedUser)
        return await db.UserModel.find({_id: { $in : parent.votedUser }})
    },
}
  
export default VoteOption;