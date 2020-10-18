import { Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
      }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            res.sendStatus(401);
            return;
        }
        req.body.user = user;
        next();
    })
}