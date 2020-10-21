import { Router } from 'express';
import AutenticateUserService from '../services/AutenticateUserService';

const sessionsRouter = Router();



sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AutenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        


        return response.json({ user, token });
    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message });
    }

});






export default sessionsRouter;