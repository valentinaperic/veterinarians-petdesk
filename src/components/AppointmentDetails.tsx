import React from 'react';
import { Appointment } from './../types/appointments';
import { ReactComponent as PawIcon } from './../assets/paw.svg';

interface AppointmentDetailsProps {
  appointment: Appointment;
  selectedDate: Date | null;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  selectedDate,
}) => {

  /**
   * format the datetime to make it more readable 
   * @param datetime 
   * @returns readable date
   */
  function formatDatetime(datetime: string) {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  /**
   * format animal details to fit the animal details box
   * @param firstName 
   * @param species 
   * @param breed 
   * @returns a string that shows `name - species - breed`
   */
  function formatAnimalDetails(firstName: string, species: string | null, breed: string | null) {
    let animalDetails = `${firstName}`;

    if (species) {
      animalDetails += ` - ${species}`;

      if (breed) {
        animalDetails += ` - ${breed}`;
      }
    }

    return animalDetails;
  }

  return (
    <div className="info">
      <PawIcon />
      <p>
        <strong>Appointment Type:</strong> {appointment.appointmentType}
      </p>
      <strong>Requested Date Time:</strong>{' '}
      {selectedDate
        ? formatDatetime(selectedDate.toISOString())
        : formatDatetime(appointment.requestedDateTimeOffset)}

      <p>
        <strong>Client:</strong> {appointment.user.firstName} {appointment.user.lastName}
      </p>
      <p>
        <strong>Animal:</strong>{' '}
        {formatAnimalDetails(appointment.animal.firstName, appointment.animal.species, appointment.animal.breed)}
      </p>
    </div>
  );
};

export default AppointmentDetails;