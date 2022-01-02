const Query = {
  userLogin: async(parent, {userAccount, userPassword}, {userModel, pubSub}) =>{

    const user = await userModel.findOne( {userAccount} );

    if (!user) {
      throw new Error("Account not existed!")
    }

    else if (user.userPassword != userPassword){
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
