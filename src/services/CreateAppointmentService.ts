import Appointment from '../models/Appointment';
import { startOfHour, parseISO } from 'date-fns';
import { getCustomRepository} from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    date: Date;
    provider: string;
}

class CreateAppointmentService {

    public async execute({ date, provider }: Request): Promise<Appointment> {

const appointmentsRepository = getCustomRepository(AppointmentsRepository);


        const appointmentDate = startOfHour(date);

        const findAppointmenInSameDate = appointmentsRepository.findByDate(
            appointmentDate);

        if (findAppointmenInSameDate) {
            throw Error('This appointment is already booked')

        }

        const appointment = appointmentsRepository.create(
            { provider, date: appointmentDate });

            await appointmentsRepository.save(appointment);

        return appointment;
    }


}
export default CreateAppointmentService;