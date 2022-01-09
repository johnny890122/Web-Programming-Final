const Event = {
    eventCreator: async (parent, args, { db, pubSub }) => {
        //console.log(parent.eventCreator)
        return await db.UserModel.findById(parent.eventCreator)
    }
}
  
export default Event;