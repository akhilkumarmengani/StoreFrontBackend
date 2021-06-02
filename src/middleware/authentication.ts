import express from 'express';
import jwt from 'jsonwebtoken';


const verifyAuthToken = (req: express.Request, res: express.Response, next : Function) => {
    try {
        const authorizationHeader : string = req.headers.authorization as string;
        const token : string = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(401);
    }
}

export default verifyAuthToken;