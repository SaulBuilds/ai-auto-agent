// src/middleware/authenticateJWT.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    (req as any).user = user; 
    next();
  });
};


