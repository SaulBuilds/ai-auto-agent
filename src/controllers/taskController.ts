import { Request, Response } from 'express';
import { taskModel } from '../models/taskModel';
import { enqueueTask } from '../jobs/taskQueue';

export const taskController = {
  async createTask(req: Request, res: Response) {
    const { content, type } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const task = await taskModel.createTask({
        type, content, userId,
        status: ''
    });
    await enqueueTask(task);

    return res.status(200).json({ success: true, task });
  },

  async getTaskHistory(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }

    const tasks = await taskModel.getTasksByUserId(userId);
    return res.status(200).json(tasks);
  },
};
