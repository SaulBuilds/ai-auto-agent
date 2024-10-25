// src/jobs/taskQueue.ts
import { Queue } from 'bullmq';
import Redis from 'ioredis';

const redis = new Redis();
export const taskQueue = new Queue('tasks', { connection: redis });

export const enqueueTask = async (task: any) => {
  await taskQueue.add('processTask', task);
};