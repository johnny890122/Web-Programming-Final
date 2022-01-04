import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
// import Subscription from "./resolvers/Subscription.js";
// db

import UserModel from "./models/User"
import TodoModel from "./models/Todo"
import TeamModel from "./models/Team"
import EventModel from "./models/Event";

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    // Subscription,
  },
  context: {
    userModel: UserModel,
    todoModel: TodoModel,
    teamModel: TeamModel,
    eventModel: EventModel,
    pubSub,
  },
});

export default server;