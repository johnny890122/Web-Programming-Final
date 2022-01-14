const Contest = {
    contestMyTeam: async (parent, args, { db, pubSub }) => {
        //console.log(parent.contestMyTeam)
        return await db.TeamModel.findById(parent.contestMyTeam)
    },
    contestSetDetail: async (parent, args, { db, pubSub }) => {
        //console.log(parent.contestSetDetail)
        return await db.SetDetailModel.find({_id: { $in : parent.contestSetDetail }})
    }
}
  
export default Contest;