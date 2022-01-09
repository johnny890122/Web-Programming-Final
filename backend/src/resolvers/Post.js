const Post = {
    postAuthor: async (parent, args, { db, pubSub }) => {
        //console.log(parent.postAuthor)
        return await db.UserModel.findById(parent.postAuthor)
    }
}
  
export default Post;