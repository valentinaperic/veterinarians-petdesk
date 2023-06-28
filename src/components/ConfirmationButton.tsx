import React from 'react';

interface ConfirmationButtonProps {
  isConfirmed: boolean;
  appointmentId: number;
  setSelectedDates: React.Dispatch<React.SetStateAction<{ [key: number]: Date | null }>>;
  setConfirmedAppointments: React.Dispatch<React.SetStateAction<number[]>>;
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  isConfirmed,
  appointmentId,
  setSelectedDates,
  setConfirmedAppointments
}) => {

  /**
   * window popup asking to confirm the appointment
   * if confirmed, set the selected dates and confirmed appointment
   */
  const handleConfirmAppointment = () => {
    if (window.confirm('Are you sure you want to confirm this appointment?')) {
      setSelectedDates((prevSelectedDates) => ({
        ...prevSelectedDates,
        [appointmentId]: prevSelectedDates[appointmentId] || null,
      }));

      setConfirmedAppointments((prevConfirmedAppointments) => [...prevConfirmedAppointments, appointmentId]);
    }
  };

  if (isConfirmed) {
    return <p className="confirmed-message">Appointment confirmed!</p>;
  }

  return (
    <button onClick={handleConfirmAppointment}>
      Confirm Appointment
    </button>
  );
};

export default ConfirmationButton;
