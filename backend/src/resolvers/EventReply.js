const EventReply = {
    eventReplyMemeber: async (parent, args, { db, pubSub }) => {
        //console.log(parent.eventReplyMemeber)
        return await db.UserModel.findById(parent.eventReplyMemeber)
    }
}
  
export default EventReply;