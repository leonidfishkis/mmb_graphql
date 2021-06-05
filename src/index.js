// read env file with secure information
const dotenv = require("dotenv");
dotenv.config();

const { ApolloServer } = require('apollo-server');
const { PrismaClient, Prisma } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./model/queries')
const Mutation = require('./model/mutations')
const User = require('./model/user/')
const Raid = require('./model/raid/')


const resolvers = {
  Query,
  Mutation,
  User,
  Raid,
}

const data = new PrismaClient()
//console.log(data)
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      data,
      Prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  },
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );