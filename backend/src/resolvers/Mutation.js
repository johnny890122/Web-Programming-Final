import UserModel from "../models/User"
import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser: async (parent, args, { userModel, pubSub }) => {
    const { userAccount, userPassword, userEmail } = args;

    const accountExists = await UserModel.findOne({userAccount});

    const emailExists = await UserModel.findOne({userEmail});

    if (accountExists) {
      throw new Error("This account has existed!")
    }
    else if (emailExists) {
      throw new Error("This email has been used!")
    }
    else {
      const newUser = new UserModel(
        {userAccount, userPassword, userEmail}
      );
      await newUser.save();
      console.log("New User Saved!")

      return newUser;
    }
  },

  createUserTodo: async (parent, {_id, todoContent}, {todoModel, pubSub}) => {

  }
  
};

export default Mutation;
