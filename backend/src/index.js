import mongo from "./mongo";
import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Team from "./resolvers/Team";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Event from "./resolvers/Event";
import Vote from "./resolvers/Vote";
import VoteOption from "./resolvers/VoteOption";
// import Subscription from "./resolvers/Subscription";
// db
import * as db from "./db";

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Team,
    Post,
    Event,
    Vote,
    VoteOption
    // Subscription,
  },
  context: {
    db,
    pubSub,
  },
});

mongo();

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`);
});
