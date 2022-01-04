import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
// import Subscription from "./resolvers/Subscription.js";
// db

import UserModel from "./models/User";
import TodoModel from "./models/Todo";
import TeamModel from "./models/Team";
import EventModel from "./models/Event";
import GalleryModel from "./models/Gallery";
import DashboardNotificationModel from "./models/DashboardNotification"
import NotificationTaskModel from "./models/NotificationTask"

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
    dashboardNotificationModel: DashboardNotificationModel,
    notificationTaskModel: NotificationTaskModel,
    teamModel: TeamModel,
    eventModel: EventModel,
    galleryModel: GalleryModel,
    pubSub,
  },
});

export default server;
