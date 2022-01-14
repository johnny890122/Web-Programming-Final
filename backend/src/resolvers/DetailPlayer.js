const DetailPlayer = {
    detailPlayer: async (parent, args, { db, pubSub }) => {
        //console.log(parent.detailPlayer)
        return await db.UserModel.findById(parent.detailPlayer)
    }
}
  
export default DetailPlayer;