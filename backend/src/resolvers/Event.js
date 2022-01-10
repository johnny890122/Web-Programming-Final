const Event = {
    eventCreator: async (parent, args, { db, pubSub }) => {
        //console.log(parent.eventCreator)
        return await db.UserModel.findById(parent.eventCreator)
    },
    eventReply: async (parent, args, { db, pubSub }) => {
        //console.log(parent.eventCreator)
        return await db.EventReplyModel.find({_id: { $in : parent.eventReply }})
    }
}
  
export default Event;