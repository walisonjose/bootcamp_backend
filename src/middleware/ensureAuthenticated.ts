import { Request,  Response, NextFunction } from 'express';

import { decode, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';



interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}






export default function ensureAuthenticated(
    request: Request,
    Response: Response,
    next: NextFunction, 
): void {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new Error("JWT token is missing!!");
    }

    //a virgula indica que eu não irei utilizar o primeiro parâmetro ou valor
    const [, token] = authHeader.split(' ');


    const { secret, expiresIn } = authConfig.jwt;
    try {
        const decoded = verify(token, secret);
        const { sub } = decoded as TokenPayload;
       
        request.user = { 
            id: sub,
        }
       



        return next();
    } catch {
        throw new Error('Invalid JWT Token');
    }


}