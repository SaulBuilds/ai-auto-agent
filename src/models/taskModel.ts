// src/models/taskModel.ts
import { PrismaClient, Prisma } from '@prisma/client';

interface TwitterUserData {
    twitterId: string;
    username: string;
    accessToken: string;
    refreshToken?: string;
    email?: string; // Add email field to fix the error
  }

const prisma = new PrismaClient();

export type CreateTaskInput = {
  userId: string;
  type: string;
  content: string;
  status?: string;
};

export const taskModel = {
    async createTask(taskData: CreateTaskInput) {  // Use CreateTaskInput type
      return await prisma.task.create({
        data: {
          userId: taskData.userId,  // This should be of type 'string'
          type: taskData.type,
          content: taskData.content,
        },
      });
    },
  
    async getTasksByUserId(userId: string) {
      return await prisma.task.findMany({
        where: { userId },  // This should expect a string now
      });
    },
  };