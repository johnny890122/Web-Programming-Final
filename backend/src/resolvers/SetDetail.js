const SetDetail = {
    setPlayerDetail: async (parent, args, { db, pubSub }) => {
        //console.log(parent.setPlayerDetail)
        return await db.DetailPlayerModel.find({_id: { $in : parent.setPlayerDetail }})
    }
}
  
export default SetDetail;