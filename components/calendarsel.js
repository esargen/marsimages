import React from 'react';
import Calendar from 'react-calendar';

const Calendarsel = (props) => {

  return (
    <div className="calendar">
      <Calendar
        value={props.value}
        onChange={props.onChange}
        />
    </div>
  )
}

export default Calendarsel;
