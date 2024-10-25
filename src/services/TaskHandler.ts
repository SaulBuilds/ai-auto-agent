import { tweetService } from './twitterService';

interface Task {
    type: string;
    content: string;
  }
  
  export const taskHandler = {
    async handleTask(task: any) {
      if (task.type === 'tweet') {
        await tweetService.sendTweet(task.userId, task.content); // Ensure both userId and message are provided
      }
    },
  };
  