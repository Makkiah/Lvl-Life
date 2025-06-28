import { useEffect } from 'react';

// Custom hook to detect if the date has changed since last app usage
export const useDailyReset = (onDateChangeCallback) => {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const lastDate = localStorage.getItem('lastActiveDate'); // Get the last saved active date from localStorage

    if (lastDate !== today) { // Check if the stored date is different from today
      onDateChangeCallback(today); // Trigger the callback function with the current date
      localStorage.setItem('lastActiveDate', today); // Save today's date as the new last active date
    }
  }, [onDateChangeCallback]); // Dependency array ensures the effect runs when the callback changes
};
