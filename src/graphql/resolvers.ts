// src/graphql/resolvers.ts
import { userModel } from '../models/userModel';
import { taskModel } from '../models/taskModel';

export const resolvers = {
  Query: {
    getUser: async (_: unknown, { id }: { id: string }) => {
      return await userModel.findUserById(id);
    },
    getTasksByUserId: async (_: unknown, { userId }: { userId: string }) => {
      return await taskModel.getTasksByUserId(userId);
    },
  },
  Mutation: {
    createTask: async (_: unknown, { userId, type, content }: { userId: string, type: string, content: string }) => {
      return await taskModel.createTask({ userId, type, content });
    },
  },
};
