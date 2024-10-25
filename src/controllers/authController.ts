import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
// src/controllers/authController.ts
import { TwitterUserData } from '../types/api';
import { userModel } from '../models/userModel';



dotenv.config();

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET!,
});
export const authController = {
    async handleTwitterCallback(twitterData: TwitterUserData) {
      return await userModel.upsertTwitterUser(twitterData);
    },



  async twitterCallback(req: Request, res: Response) {
    const { code, state } = req.query;

    if (state !== req.session.oauthState) {
      return res.status(403).send('Invalid state');
    }

    try {
      const { client: loggedClient, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
        code: code as string,
        codeVerifier: req.session.codeVerifier!,
        redirectUri: process.env.TWITTER_CALLBACK_URL!,
      });

      const user = await loggedClient.currentUser();
      const dbUser = await userModel.upsertTwitterUser({
          twitterId: user.id_str,
          accessToken,
          refreshToken,
          username: '',
          email: ''
      });

      const token = jwt.sign({ userId: dbUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.cookie('token', token);

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).send('Twitter OAuth failed');
    }
  },
};
