const Query = {
  userLogin: async(parent, {account, password}, {userModel, pubSub}) =>{
    const user = await userModel.findOne( {userAccount: account} );

    if (!user) {
      throw new Error("User not found!")
    }

    else if (user.userPassword != password){
      throw new Error("Password not correct!")
    }
    else{
      return user;
    }
  },

  initUserTodo: async(parent, {userID}, {userModel, todoModel, pubSub}) => {
    const user = await userModel.findOne( {_id : userID} );

    if (!user) {
      throw new Error("User not found!")
    }

    if (user.userTodo.length === 0) {
        return [];
    }
    else {
        console.log("todo not empty")
    }
  },

  /**
   * Get all tasks
   */
  // tasks: async (parent, args, { taskModel }) => {
  //   const tasks = await taskModel.find().sort({ dueDate: -1 });
  //   return tasks;
  // },
};

export default Query;
