// src/graphql/typeDefs.ts
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    twitterId: String!
    accessToken: String!
    refreshToken: String
    tasks: [Task!]
  }

  type Task {
    id: ID!
    userId: String!
    type: String!
    content: String!
    status: String!
    createdAt: String!
  }

  type Query {
    getUser(id: ID!): User
    getTasksByUserId(userId: String!): [Task!]
  }

  type Mutation {
    createTask(userId: String!, type: String!, content: String!): Task!
  }
`;
