import { Router, RouterOptions} from 'express';
import appointmentsRouter from './appointments.routes';


const routes = Router();

routes.use('/appointments', appointmentsRouter);


export default routes;