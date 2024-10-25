import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { tweetService } from './services/twitterService';
import { gptService } from './services/gptServices';
import { enqueueTask } from './jobs/taskQueue';
import session from 'express-session';
import cors from 'cors';

declare module 'express-session' {
    interface SessionData {
      oauthState?: string;
      codeVerifier?: string;
    }
  }

  
dotenv.config();

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the Next.js frontend
    credentials: true,
  }));

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  }));

  

const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  app.post('/tweet', asyncHandler(async (req: Request, res: Response) => {
    const { message } = req.body;
    const userId = (req as any).user?.id;  // Extract userId from authenticated session
  
    if (!userId) {
      return res.status(401).send('Unauthorized');
    }
  
    const response = await tweetService.sendTweet(userId, message); // Pass both userId and message
    res.status(200).json({ success: true, response });
  }));
  
  app.post('/process', asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;
    const action = await gptService.parseAction(text);
    
    if (!action || !action.type || !action.content) {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }
  
    if (action.type === 'tweet') {
      await enqueueTask({ type: 'tweet', content: action.content });
    }
  
    res.status(200).json({ success: true, action });
  }));
  
  app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World');
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
