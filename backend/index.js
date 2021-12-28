const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./src/testTypeDef')
const { resolvers } = require("./src/testResolvers");
const mongoose = require('mongoose');
require("dotenv-defaults/config.js");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGO_URL,
     { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

