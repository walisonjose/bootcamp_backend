import { Router } from 'express';

import { parseISO } from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';

import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import ensureAuthenticated from '../middleware/ensureAuthenticated';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);



appointmentsRouter.get('/', async (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();
    return response.json(appointments);

});















appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parseDate = parseISO(date);

        const CreateAppointment = new CreateAppointmentService();

        const appointment = await CreateAppointment.execute({
            date: parseDate,
            provider_id,
        });

        return response.json(appointment);

    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message });
    }

});






export default appointmentsRouter;