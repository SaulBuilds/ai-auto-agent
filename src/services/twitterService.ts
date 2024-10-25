import { TwitterApi } from 'twitter-api-v2';
import { userModel } from '../models/userModel';

export const tweetService = {
  async sendTweet(userId: string, message: string) {
    const user = await userModel.findUserById(userId);

    if (!user || !user.accessToken) {
      throw new Error('User does not exist or accessToken is missing.');
    }

    const twitterClient = new TwitterApi(user.accessToken);
    return await twitterClient.v2.tweet(message);
  },
};