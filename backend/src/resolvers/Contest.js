const Contest = {
    contestMyTeam: async (parent, args, { db, pubSub }) => {
        //console.log(parent.contestMyTeam)
        return await db.TeamModel.findById(parent.contestMyTeam)
    }
}
  
export default Contest;