import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface AppointmentTimePickerProps {
  selectedDate: Date | null;
  isConfirmed: boolean;
  handleDateChange: (date: Date | null) => void;
}

const AppointmentTimePicker: React.FC<AppointmentTimePickerProps> = ({
  selectedDate,
  isConfirmed,
  handleDateChange,
}) => {
  const handleDatePickerChange = (date: Date | null) => {
    handleDateChange(date);
  };

  if (isConfirmed) {
    return null;
  }

  return (
    <div>
      <p>Request a new appointment time</p>

      <DatePicker
        selected={selectedDate}
        onChange={handleDatePickerChange}
        dateFormat="MM/dd/yyyy"
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={30}
        placeholderText="Select a date and time"
        popperPlacement="bottom-start"
      />
    </div>
  );
};

export default AppointmentTimePicker;