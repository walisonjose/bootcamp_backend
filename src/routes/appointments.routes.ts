import { Router} from 'express';
const { uuid, isUuid } = require('uuidv4');
import { startOfHour, parseISO, isEqual} from 'date-fns';

const appointmentsRouter = Router();

import Appointment from '../models/Appointment';

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response)=>{
const { provider, date} = request.body;

const parseDate = startOfHour(parseISO(date));
const findAppointmenInSameDate = appointments.find(
    appointment =>isEqual(parseDate, appointment.date),
);

if(findAppointmenInSameDate){
return response
.status(400)
.json({ message: 'This appointment is already booked'});
}

const appointment = new Appointment(provider, parseDate);



appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentsRouter;