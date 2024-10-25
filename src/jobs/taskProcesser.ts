import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { taskHandler } from '../services/TaskHandler';

const redis = new Redis();
const worker = new Worker('tasks', async (job) => {
  await taskHandler.handleTask(job.data);
}, { connection: redis });
