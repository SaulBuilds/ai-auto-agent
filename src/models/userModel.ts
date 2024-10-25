// src/models/userModel.ts
import { PrismaClient } from '@prisma/client';
import { TwitterUserData } from '../types/api';

const prisma = new PrismaClient();

// src/models/userModel.ts
export const userModel = {
    async findUserById(id: string) {
      return await prisma.user.findUnique({
        where: { id },  // Prisma expects 'id' to be used for lookups here
        include: { tasks: true },
      });
    },
  
    async upsertTwitterUser(userData: TwitterUserData) {
      return await prisma.user.upsert({
        where: { twitterId: userData.twitterId },  // Now this should work as twitterId is unique
        update: {
          accessToken: userData.accessToken,  // Ensure these properties exist in the Prisma schema
          refreshToken: userData.refreshToken,
        },
        create: {
          twitterId: userData.twitterId,  // Ensure this matches the Prisma schema definition
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
        },
      });
    },
  };
  