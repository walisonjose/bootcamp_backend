import User from '../models/User';

import { getRepository } from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';




interface Request {

    email: string;
    password: string;
}


interface Response {

    user: User, 
    token: string,
}

class AutenticateUserService {

    public async execute({ email, password }: Request): Promise<Response> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });


        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);


        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

  const token = sign({}, '653a7b5504882ee9a847223fb32fa5b1', {
      subject: user.id,
      expiresIn: '1d',

  });
        return {
            user,
            token,
        };



    }


}
export default AutenticateUserService;