// src/types/api.ts
import { Prisma, User, Task } from '@prisma/client';


export interface TwitterUserData {
    twitterId: string;
    username: string;
    accessToken: string;
    refreshToken?: string;
    email?: string; // Add email field to fix the error
  }

export type UserWithTasks = User & {
  tasks: Task[];
};

export type TaskWithUser = Task & {
  user: User;
};