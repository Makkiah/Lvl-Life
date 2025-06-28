import './calendar.scss';
import {React, useState, useEffect} from 'react';

const CalendarView = ({ calendarLog, onSelectDate }) => {
  const dates = Object.keys(calendarLog).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="calendar">
      <h3>Workout History</h3>
      <ul className="calendar-list">
        {dates.map((date) => (
          <li key={date} onClick={() => onSelectDate(date)} className="calendar-item">
            {date} ✅
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
