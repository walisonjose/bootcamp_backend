import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import uploadConfig from '../config/upload';

import multer from 'multer';

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', upload.single('file'), async (request, response) => {
    try {
       const { name, email, password } = request.body;

       const createUser = new CreateUserService();

       const user = await createUser.execute({
           name,
           email,
           password,
       });
 
 //delete user.password;

        return response.json(user);
    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message });
    }

});

usersRouter.patch(
    '/avatar',
     ensureAuthenticated, 
     upload.single('avatar'), 
     async (request, response) => {
    try {

        const updateUserAvatar = new UpdateUserAvatarService();
        await  updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json({ ok: true});
       

        return response.json({ ok: true});
    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message });
    }

});




export default usersRouter;