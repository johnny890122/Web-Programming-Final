const VoteOption = {
  votedUser: async (parent, args, { db, pubSub }) => {
    return await db.UserModel.find({ _id: { $in: parent.votedUser } });
  },
};

export default VoteOption;
