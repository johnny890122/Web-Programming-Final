import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
//import Query from "./resolvers/Query.js";
//import Mutation from "./resolvers/Mutation.js";
//import Subscription from "./resolvers/Subscription.js";

const { typeDefs } = require('./src/tempTypeDefs') // 改掉
const { resolvers } = require("./src/tempResolvers"); // 改掉
// db
// import taskModel from "./models/task.js";

const port = process.env.PORT || 5000;
const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    // taskModel,
    pubSub,
  },
});

export default server;
