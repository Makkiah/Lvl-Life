import { useState, useEffect } from 'react';

const LOCAL_CALENDAR_KEY = 'calendarLog';

export const useCalendarLog = () => {
  const [calendarLog, setCalendarLog] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_CALENDAR_KEY);
    if (stored) {
      setCalendarLog(JSON.parse(stored));
    }
  }, []);

  const updateLogForDate = (date, workoutsForDate) => {
    const updated = {
      ...calendarLog,
      [date]: {
        ...(calendarLog[date] || {}),
        workouts: workoutsForDate
      }
    };
    localStorage.setItem(LOCAL_CALENDAR_KEY, JSON.stringify(updated));
    setCalendarLog(updated);
  };

  return { calendarLog, updateLogForDate };
};
