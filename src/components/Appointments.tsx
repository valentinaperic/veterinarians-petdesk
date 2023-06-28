import React, { useEffect, useState } from 'react';
import './../App.css';
import { Appointment } from './../types/appointments';
import AppointmentDetails from './AppointmentDetails';
import ConfirmationButton from './ConfirmationButton';
import AppointmentTimePicker from './AppointmentTimePicker';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [confirmedAppointments, setConfirmedAppointments] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date | null }>({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://localhost:7101/appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          setError(`Error: ${response.status}`);
        }
      } catch (error: any) {
        setError(`Error: ${error.message}`);
      }
    };

    fetchAppointments();
  }, []);

  //if there is an error with the appointments data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Appointments</h1>
      <div className="appointment-grid">
        {appointments.map((appointment) => {
          const selectedDate = selectedDates[appointment.appointmentId] || null;
          const isConfirmed = confirmedAppointments.includes(appointment.appointmentId);

          return (
            <div className="appointment-details" key={appointment.appointmentId}>
              <AppointmentDetails appointment={appointment} selectedDate={selectedDate} />

              <ConfirmationButton
                isConfirmed={isConfirmed}
                appointmentId={appointment.appointmentId}
                setSelectedDates={setSelectedDates}
                setConfirmedAppointments={setConfirmedAppointments}
              />

              <AppointmentTimePicker
                selectedDate={selectedDate}
                isConfirmed={isConfirmed}
                handleDateChange={(date: Date | null) => {
                  setSelectedDates((prevSelectedDates) => ({
                    ...prevSelectedDates,
                    [appointment.appointmentId]: date,
                  }));

                  setConfirmedAppointments((prevConfirmedAppointments) =>
                    prevConfirmedAppointments.filter((id) => id !== appointment.appointmentId)
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Appointments;